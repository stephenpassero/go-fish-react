require 'sinatra'
require 'sinatra/reloader'
require 'pry'
require 'json'
require 'sinatra/json'

class Server < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  post('/join') do
    json_obj = JSON.parse(request.body.read)
    json json_obj
  end
end
