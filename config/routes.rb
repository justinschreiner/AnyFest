Rails.application.routes.draw do
  resources :festivals, :templates
  root "templates#index"
end