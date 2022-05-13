class Read < ApplicationRecord
    belongs_to :book
    belongs_to :user

    validates :review, length: { maximum: 500 }
    validates :rating, numericality: { in: 0..10 }
end
