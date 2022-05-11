class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :genre, :number_of_pages, :key
end
