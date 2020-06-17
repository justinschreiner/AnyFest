Rails.application.routes.draw do
  devise_for :users
  resources :festivals, :templates
  root "templates#index"
end