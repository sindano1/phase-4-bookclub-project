class CreateClubs < ActiveRecord::Migration[6.1]
  def change
    create_table :clubs do |t|
      t.string :name
      t.integer :admin_id
      t.string :description

      t.timestamps
    end
  end
end
