class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :author, :genre, :key, :summary, :created_at, :updated_at

  has_many :reads
end
