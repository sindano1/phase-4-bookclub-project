class AddIsAdminToClubMembers < ActiveRecord::Migration[6.1]
  def change
    add_column :club_members, :is_admin, :boolean
  end
end
