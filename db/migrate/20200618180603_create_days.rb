class CreateDays < ActiveRecord::Migration[6.0]
  def change
    create_table :days do |t|
      t.column :name, :string
      t.column :x_offset, :integer
      t.column :y_offset, :integer
      t.column :width, :integer
      t.column :height, :integer

      t.belongs_to :template, foreign_key: true
    end
  end
end
