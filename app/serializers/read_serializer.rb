class ReadSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :book_id, :has_been_read, :is_favorite, :review, :currently_reading, :has_been_reviewed, :on_deck
  
  belongs_to :book
end
