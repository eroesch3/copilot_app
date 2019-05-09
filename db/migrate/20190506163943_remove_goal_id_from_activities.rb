class RemoveGoalIdFromActivities < ActiveRecord::Migration[5.2]
  def change
    remove_column :activities, :goal_id, :bigint
  end
end
