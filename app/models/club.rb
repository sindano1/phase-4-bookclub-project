class Club < ApplicationRecord
    has_many :club_members, dependent: :destroy
    has_many :users, through: :club_members

    has_many :club_books, dependent: :destroy
    has_many :books, through: :club_books
end
