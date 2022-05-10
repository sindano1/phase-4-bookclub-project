class User < ApplicationRecord
    has_many :reads
    has_many :books, through: :reads
    has_secure_password

    validates :username, presence: true
    validates :password, presence: true
    # need password validations
    validates :username, uniqueness: true
end
