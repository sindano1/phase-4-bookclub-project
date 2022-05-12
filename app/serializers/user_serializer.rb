class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :birthday, :default_club_id

  has_many :clubs
end
