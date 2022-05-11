class Book < ApplicationRecord
    has_many :reads
    has_many :users, through: :reads

    has_many :club_books
    has_many :clubs, through: :club_books

    validates :title, :author, presence: true
end
