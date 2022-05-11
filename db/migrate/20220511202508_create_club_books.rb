class CreateClubBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :club_books do |t|
      t.integer :club_id
      t.integer :book_id

      t.timestamps
    end
  end
end
