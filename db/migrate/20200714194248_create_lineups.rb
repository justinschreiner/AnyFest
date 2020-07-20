class CreateLineups < ActiveRecord::Migration[6.0]
  def change
    create_table :lineups do |t|
      t.column :name, :string

      t.belongs_to :template, foreign_key: true
      t.belongs_to :user, foreign_key: true
    end
  end
end
