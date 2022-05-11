class RemoveNumberOfPagesFromBooks < ActiveRecord::Migration[6.1]
  def change
    remove_column :books, :number_of_pages, :integer
  end
end
