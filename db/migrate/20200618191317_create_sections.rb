class CreateSections < ActiveRecord::Migration[6.0]
  def change
    create_table :sections do |t|
      t.column :name, :string
      t.column :act_type, :string
      t.column :text_colors, :string, array: true, default: [] #want this to be an array in case of multiple alternating colors
      t.column :alternating_colors, :boolean
      t.column :delineator, :string
      t.column :delineator_color, :string
      t.column :max_act_count, :integer
      
      t.column :x_offset, :integer
      t.column :y_offset, :integer
      t.column :width, :integer
      t.column :height, :integer

      t.belongs_to :template, foreign_key: true
    end
  end
end
