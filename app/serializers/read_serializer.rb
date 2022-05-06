class ReadSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :book_id, :has_been_read, :is_favorite, :review
  
  belongs_to :book
  belongs_to :user
end
