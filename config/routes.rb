Rails.application.routes.draw do

  post '/auth/login', to: 'authentication#login'
  resources :users do
    resources :activities
  end

  resources :users do
    resources :goals
  end

  # resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
end



# XXXXXXX   ORIGINAL CODE BEFORE ADAPTING TO BE LIKE PLANETS

# Rails.application.routes.draw do

#   resources :activities
#   resources :goals
#   post '/auth/login', to: 'authentication#login'
#   resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
# end

