class CreateActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.string :name
      t.string :category
      t.float :hours_spent
      t.date :date
      t.references :user, foreign_key: true
      t.references :goal, foreign_key: true

      t.timestamps
    end
  end
end
