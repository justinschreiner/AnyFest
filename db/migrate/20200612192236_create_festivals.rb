# frozen_string_literal: true

class CreateFestivals < ActiveRecord::Migration[6.0]
  def change
    create_table :festivals do |t|
      t.column :name, :string
      t.column :location, :string
    end
  end
end
