Rails.application.routes.draw do
  resources :festivals, :templates
  root "template#index"
end