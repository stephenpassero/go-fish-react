require 'sinatra'
require 'sinatra/reloader'
require 'pry'
require 'json'
require 'sinatra/json'
require './lib/game'
require './lib/request'
require './lib/response'

$player_name = ""
$responses = []
class Server < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  def self.run_bot_turn(bot_name)
    bot = $game.find_player(bot_name)
    bot_cards = bot.deck.cards()
    if bot.cards_left < 1
      $game.increment_player_turn()
    else
      card_to_ask = bot_cards[rand(bot_cards.length) - 1].rank
      names = $game.names.reject{|key| key == bot_name}
      player_to_ask = names[rand(names.length) - 1]
      request = Request.new(bot_name, card_to_ask, player_to_ask)
      response = $game.run_round(request.to_json)
      correct_response = Response.from_json(response)
      if correct_response.card == false
        $responses.push("#{correct_response.fisher.capitalize} asked #{correct_response.target.capitalize} for all his #{correct_response.rank} and went fishing...")
      else
        $responses.push("#{correct_response.fisher.capitalize} took all #{correct_response.rank} from #{correct_response.target.capitalize}.")
      end
      if $responses.length > 10
        $responses.shift()
      end
    end
  end

  post('/join') do
    json_obj = JSON.parse(request.body.read)
    $player_name = json_obj["name"]
  end

  get('/app') do
    if $game
      hash = {game: true}
    else
      hash = {game: false}
    end
    json hash
  end

  post('/players') do
    json_obj = JSON.parse(request.body.read)
    $game = Game.new()
    num_of_players = json_obj["number"].to_i
    num_of_players.times do |index|
      if index == 0
        $game.create_new_player($player_name)
      else
        $game.create_new_player("Player#{index + 1}")
      end
    end
    $game.start_game()
    json json_obj
  end

  post('/request_card') do
    json_obj = JSON.parse(request.body.read)
    card_rank = json_obj['card_rank']
    card_rank.capitalize!()
    if card_rank == ''
      $game.increment_player_turn()
      until $game.player_turn == 1 # Do this until it is the human player's turn
        self.class.run_bot_turn($game.names[$game.player_turn - 1])
      end
    else
      if card_rank.to_i != 0 # Checks if the card isn't a face card
        card_rank = card_rank.to_i
      end
      target_name = json_obj['player']
      request = Request.new($player.name, card_rank, target_name)
      response = $game.run_round(request.to_json)
      correct_response = Response.from_json(response)
      if correct_response.card == false
        $responses.push("#{correct_response.fisher.capitalize} asked #{correct_response.target.capitalize} for all his #{correct_response.rank} and went fishing...")
      else
        $responses.push("#{correct_response.fisher.capitalize} took all #{correct_response.rank} from #{correct_response.target.capitalize}.")
      end
      if $responses.length > 10
        $responses.shift()
      end
      until $game.player_turn == 1 # Do this until it is the human player's turn
        self.class.run_bot_turn($game.names[$game.player_turn - 1])
      end
    end
    if $game.cards_left_in_play?() == true
      hash = {page: 'Game_is_ready'}
    elsif $game.cards_left_in_play?() == false
      hash = {page: 'EndGame'}
    end
    json hash
  end

  get('/end_game') do
    hash = {}
    topPlayers = []
    highestScore = 0
    result = ""
    $game.players.values.each do |player|
      if player.score > highestScore
        topPlayers.clear()
        topPlayers.push(player.name)
        highestScore = player.score
      elsif player.score === highestScore
        topPlayers.push(player.name)
      end
    end
    if topPlayers.length == 1
      result = "#{topPlayers[0]} won with #{highestScore} points!"
    else
      topPlayers.each_with_index do |player_name, index|
        if index === topPlayers.length - 2
          result += "#{player_name} and "
        elsif index === topPlayers.length - 1
          result += "#{player_name} tied with #{highestScore} points..."
        else
          result += "#{player_name} "
        end
      end
    end
    hash = {result: result}
    $game = nil
    $responses = []
    json hash
  end

  get('/game') do
    # Fix broken encapsulation
    $player = $game.players.values[0]
    robot_books = []
    robots = $game.players.reject{|key| key == $player}
    $game.players.values.each do |robot_player|
      if robot_player != $player
        robot_books.push(robot_player.convert_hand(robot_player.pairs))
      end
    end
    hash = {names: $game.names,
            player_turn: $game.player_turn,
            player_cards: $player.convert_hand, # Gets the first player's cards and converts them into s7 and d2 format.
            player_books: $player.convert_hand($player.pairs),
            robot_books: robot_books,
            cards_left_in_deck: $game.cards_in_deck(),
            responses: $responses}
    json hash
  end
end
