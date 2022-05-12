class AddImageToClubs < ActiveRecord::Migration[6.1]
  def change
    add_column :clubs, :image, :string
  end
end
