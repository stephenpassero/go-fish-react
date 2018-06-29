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
  it 'can run a round of the game' do
    visit '/'
    fill_in('name', :with => "Stephen")
    click_on('Submit')
    fill_in('numOfPlayers', :with => "5")
    click_on('Submit')
    find(".your_cards", match: :first).click
    find(".player_div", match: :first).click
    click_on('Request Card')
    sleep(0.1)
    expect(page.text).to match(/Stephen \w/)
  end
end
