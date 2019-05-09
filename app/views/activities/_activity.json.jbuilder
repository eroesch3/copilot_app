json.extract! activity, :id, :name, :category, :hours_spent, :date, :user_id, :goal_id, :created_at, :updated_at
json.url activity_url(activity, format: :json)
