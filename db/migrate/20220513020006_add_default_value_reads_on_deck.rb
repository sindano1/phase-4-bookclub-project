class AddDefaultValueReadsOnDeck < ActiveRecord::Migration[6.1]
  def change
    change_column :reads, :on_deck, :boolean, default: false 
  end
end
