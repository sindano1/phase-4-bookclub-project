class AddColumnsToReads < ActiveRecord::Migration[6.1]
  def change
    add_column :reads, :currently_reading, :boolean
    add_column :reads, :has_been_reviewed, :boolean
    add_column :reads, :on_deck, :boolean
  end
end
