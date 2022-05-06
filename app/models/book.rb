class Book < ApplicationRecord
    has_many :reads
    has_many :users, through: :reads

    validates :title, :author, presence: true
end
