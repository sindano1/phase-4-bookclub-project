class AddSummaryToBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :summary, :string
  end
end
