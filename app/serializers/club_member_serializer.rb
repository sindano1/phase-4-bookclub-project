class ClubMemberSerializer < ActiveModel::Serializer
  attributes :id, :club_id, :user_id
end
