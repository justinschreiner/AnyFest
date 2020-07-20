class CreateSectionActs < ActiveRecord::Migration[6.0]
  def change
    create_table :section_acts do |t|
      t.column :acts, :string, array: true, default: [] #taking in multiple names

      t.belongs_to :lineup, foreign_key: true
      t.belongs_to :section, foreign_key: true
    end
  end
end
