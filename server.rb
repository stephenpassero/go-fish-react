require 'sinatra'
require 'sinatra/reloader'
require 'pry'
require 'json'
require 'sinatra/json'
require './lib/game'
require './lib/request'

$player_name = ""
class Server < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  post('/join') do
    json_obj = JSON.parse(request.body.read)
    $player_name = json_obj["name"]
  end

  get('/app') do
    hash = ''
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

  post('/human_player') do
    json_obj = JSON.parse(request.body.read)
    card_rank = json_obj['card_rank']
    if card_rank.to_i != 0 # Checks if the card isn't a face card
      card_rank = card_rank.to_i
    end
    target_name = json_obj['player']
    request = Request.new($player.name, card_rank, target_name)
    response = $game.run_round(request.to_json)
    # Will eventually need to make a game log and use the response to put text in there
    response
  end

  get('/game') do
    # Fix broken encapsulation
    $player = $game.players.values[0]
    robot_books = []
    $game.players.values.delete($player)
    $game.players.values.each do |robot_player|
      robot_books.push(robot_player.pairs)
    end
    hash = {names: $game.names,
            player_turn: $game.player_turn,
            player_cards: $player.convert_hand, # Gets the first player's cards and converts them into s7 and d2 format.
            player_books: $player.pairs,
            robot_books: robot_books}
    json hash
  end
end
