class CreateTemplates < ActiveRecord::Migration[6.0]
  def change
    create_table :templates do |t|
      t.column :name, :string
      t.column :background_color, :string

      t.belongs_to :festival, foreign_key: true
    end
  end
end
