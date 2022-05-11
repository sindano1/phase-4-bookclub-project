class AddKeyToBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :key, :string
  end
end
