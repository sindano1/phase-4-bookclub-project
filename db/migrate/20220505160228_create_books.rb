class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :genre
      t.integer :number_of_pages
      t.string :image

      t.timestamps
    end
  end
end
