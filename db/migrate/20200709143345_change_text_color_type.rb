class ChangeTextColorType < ActiveRecord::Migration[6.0]
  def change
    change_column(:sections, :text_colors, :string)
  end
end
