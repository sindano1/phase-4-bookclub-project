class AddRatingToReads < ActiveRecord::Migration[6.1]
  def change
    add_column :reads, :rating, :integer
  end
end
