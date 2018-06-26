require 'rspec'
require 'pry'
require_relative './server'
require 'capybara'
require 'capybara/rspec'
require 'selenium/webdriver'
require 'pry'
require 'rack/test'

ENV['RACK_ENV'] = 'test'

Capybara.configure do |config|
  config.run_server = false
  config.app_host = 'http://localhost:3000'
  config.default_driver = :selenium_chrome_headless
end

RSpec.describe Server, type: :feature do
  it 'can go to the game page' do
    visit '/'
    fill_in('name', :with => "Player1")
    click_on('Submit')
    expect(page).to have_content("Player1")
  end
  # describe "POST /join" do
  #   it 'returns a dealt game' do
  #     post '/join', {name: 'Stephen', player_count: 3}.to_json, {"Content-Type" => 'application/json'}
  #     json = JSON.parse(last_response.body)
  #     expect(json['players'].count).to eq 3
  #   end
  # end
end
