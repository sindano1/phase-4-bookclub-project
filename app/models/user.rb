class User < ApplicationRecord
    has_many :reads, dependent: :destroy
    has_many :books, through: :reads

    has_many :club_members
    has_many :clubs, through: :club_members

    has_secure_password

    alias_attribute :new_username, :username
    alias_attribute :new_password, :password

    # validates :username, :password, presence: true
    # # need password validations
    # validates :username, :uniqueness, true
end
