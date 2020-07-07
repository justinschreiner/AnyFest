Rails.application.routes.draw do
  devise_for :users
  resources :festivals
  resources :templates do
    resources :build, controller: 'templates/build'
  end
  root "templates#index"
end