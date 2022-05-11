class CreateClubMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :club_members do |t|
      t.integer :club_id
      t.integer :user_id

      t.timestamps
    end
  end
end
