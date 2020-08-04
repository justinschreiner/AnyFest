Rails.application.routes.draw do
  devise_for :users
  resources :festivals
  resources :users, :only => [:show]
  resources :templates do
    resources :build, controller: 'templates/build'
    resources :lineups
  end
  root "templates#index"
end