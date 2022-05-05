class CreateReads < ActiveRecord::Migration[6.1]
  def change
    create_table :reads do |t|
      t.integer :user_id
      t.integer :book_id
      t.boolean :has_been_read
      t.boolean :is_favorite
      t.string :review

      t.timestamps
    end
  end
end
