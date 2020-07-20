class AddFontsSections < ActiveRecord::Migration[6.0]
  def change
    add_column :sections, :font, :string
    add_column :sections, :weight, :integer
  end
end
