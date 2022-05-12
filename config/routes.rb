Rails.application.routes.draw do
  
  resources :club_books
  resources :club_members
  resources :clubs
  resources :books
  resources :reads
  resources :users

  # Custom routes for login/logout
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Custom route to stay logged in
  get "/auth", to: "sessions#show"

  # Custom route to store a book and a read through a user
  post "/store-books", to: "users#store_books"

  get "/your-clubs", to: "users#your_clubs"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
