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
  it 'can go to the number of players page' do
    visit '/'
    fill_in('name', :with => "Player1")
    click_on('Submit')
    expect(page).to have_content("(Max of 8)")
  end

  it 'can go to the game page' do
    visit '/'
    fill_in('name', :with => "Player1")
    click_on('Submit')
    fill_in('numOfPlayers', :with => "7")
    click_on('Submit')
    expect(page).to have_content("Player7")
  end

end
