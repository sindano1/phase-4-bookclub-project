class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :author, :genre, :number_of_pages, :key, :created_at, :updated_at
end
