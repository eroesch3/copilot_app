# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Activity.create!(name: 'run', category: 'fitness', user_id: 1)
Activity.create!(name: 'lift', category: 'fitness', user_id: 1)
Activity.create(name: 'shop', category: 'errand', user_id: 1)
Activity.create!(name: 'laundry', category: 'household', user_id: 1)
Activity.create!(name: 'dishes', category: 'household', user_id: 1)

puts "#{Activity.count} activities created!"