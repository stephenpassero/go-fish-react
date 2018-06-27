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
    hash = {names: $game.names,
            player_turn: $game.player_turn,
            player_cards: [$game.players.values[0].deck.cards]}
    json hash
  end
end
