class Club < ApplicationRecord
    has_many :club_members
    has_many :users, through: :club_members

    has_many :club_books
    has_many :books, through: :club_books
end
