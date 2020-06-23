class AddStatusToTemplates < ActiveRecord::Migration[6.0]
  def change
    add_column :templates, :status, :string
  end
end
