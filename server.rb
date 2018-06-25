require 'sinatra'
require 'sinatra/reloader'
require 'pry'
require './lib/game'
require 'json'

@@game = Game.new()
@@players = []
@@names = []
@@responses = []

class Server < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  post('/') do
    push = JSON.parse(request.body.read)
    binding.pry
  end
end
