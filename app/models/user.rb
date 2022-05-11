class User < ApplicationRecord
    has_many :reads
    has_many :books, through: :reads
    has_secure_password

    # validates :username, :password, presence: true
    # # need password validations
    # validates :username, :uniqueness, true
end
