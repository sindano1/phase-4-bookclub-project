class User < ApplicationRecord
    has_many :reads
    has_many :books, through: :reads
end
