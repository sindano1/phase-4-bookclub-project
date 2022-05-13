class OnDeckToTrue < ActiveRecord::Migration[6.1]
  def change
    change_column :reads, :on_deck, :boolean, default: true
  end
end
