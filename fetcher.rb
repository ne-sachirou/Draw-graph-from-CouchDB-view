# encoding = utf-8

require 'open-uri'
require 'json'


module Fetcher
  URI = 'http://49.212.91.84:5984/twitter/_design/manage/_view/count_words'
  PATH = 'views/data.csv'
  
  def self.update
    open URI do |json|
      data = (JSON.parse json.read)['rows'][0]['value']
      open PATH, 'a' do |file|
        file.write "#{Time.now.to_i},#{data['suki']},#{data['kirai']},#{data['chiga']}\n"
      end
    end
  end
end