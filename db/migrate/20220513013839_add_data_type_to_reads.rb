class AddDataTypeToReads < ActiveRecord::Migration[6.1]
  def change
    change_column :reads, :currently_reading, :boolean
    change_column :reads, :has_been_reviewed, :boolean
    change_column :reads, :on_deck, :boolean
  end
end
