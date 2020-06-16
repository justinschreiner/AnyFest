class CreateTemplates < ActiveRecord::Migration[6.0]
  def change
    create_table :templates do |t|
      t.column :name, :string
      t.column :background_img, :string
      t.column :background_color, :string
      t.column :festival_id, :integer
      t.column :user_id, :integer
    end
  end
end
