class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
      t.string :first_name
      t.string :last_name
      t.date :birthday
      t.string :default_club_id

      t.timestamps
    end
  end
end
