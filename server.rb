require 'sinatra'
require 'sinatra/reloader'
require 'pry'
require 'json'
require 'sinatra/json'
require './lib/game'
$player_name = ""
class Server < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  post('/join') do
    json_obj = JSON.parse(request.body.read)
    $player_name = json_obj["name"]
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

  get('/game') do
    # Fix broken encapsulation
    player = $game.players.values[0]
    robot_books = []
    $game.players.values.delete(player)
    $game.players.values.each do |robot_player|
      robot_books.push(robot_player.pairs)
    end
    hash = {names: $game.names,
            player_turn: $game.player_turn,
            player_cards: player.convert_hand, # Gets the first player's cards and converts them into s7 and d2 format.
            player_books: player.pairs,
            robot_books: robot_books}
    json hash
  end
end
