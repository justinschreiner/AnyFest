Rails.application.routes.draw do
  devise_for :users
  resources :festivals, :lineups
  resources :templates do
    resources :build, controller: 'templates/build'
  end
  root "templates#index"
end