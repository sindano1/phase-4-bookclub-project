class ClubMemberSerializer < ActiveModel::Serializer
  attributes :id, :club_id, :user_id

  belongs_to :club
  belongs_to :user
end
