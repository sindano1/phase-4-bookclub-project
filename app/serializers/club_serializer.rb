class ClubSerializer < ActiveModel::Serializer
  attributes :id, :name, :admin_id, :description
end
