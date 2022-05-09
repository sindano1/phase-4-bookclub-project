class User < ApplicationRecord
    has_many :reads
    has_many :books, through: :reads
    has_secure_password
end
