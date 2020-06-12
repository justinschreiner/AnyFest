class CreateFestivals < ActiveRecord::Migration[6.0]
  def change
    create_table :festivals do |t|

      t.timestamps
    end
  end
end
