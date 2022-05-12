class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :author, :genre, :key, :created_at, :updated_at
end
