class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :image
      t.string :title
      t.string :description

      t.timestamps null: false
    end
  end
end
