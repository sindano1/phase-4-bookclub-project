# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

puts 'seeding books'
50.times do
    Book.create!(
        title: Faker::Book.title, 
        author: Faker::Book.author, 
        genre: Faker::Book.genre, 
        number_of_pages: rand(50..300),
        image: "https://edit.org/images/cat/book-covers-big-2019101610.jpg"
    )
end
puts 'books seeded'


puts 'Seeding users'
10.times do
    User.create!(
        username: Faker::Name.name ,
        password: "password",
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name ,
        birthday: Faker::Date.between(from: '1930-01-01', to: '2009-05-05'),
        default_club_id: rand(10)
    )
end
puts 'users Seeded'


puts "Making people read books..."
User.all.each do |user|
  rand(2..10).times do
    # get a random book
    book = Book.find(Book.pluck(:id).sample)

    Read.create!(
        user_id: user.id, 
        book_id: book.id, 
        has_been_read: [true, false].sample, 
        is_favorite: [true, false].sample,
        review: ""
    )
  end
end
puts "Read seeded!"