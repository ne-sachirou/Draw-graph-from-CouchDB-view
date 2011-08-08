# encoding = utf-8

require 'rubygems'
require 'sinatra'
require './fetcher'


not_found do
  status 404
  '404 Not Found'
end


get '/' do
  send_file 'views/index.html'
end


get %r{/(.+?)\.(png|jpg|jpeg|webp|csv|js)} do
  send_file "views/#{params[:captures][0]}.#{params[:captures][1]}"
end


get '/update' do
  Fetcher::update
  send_file 'views/data.csv'
end