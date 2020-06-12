# frozen_string_literal: true

Rails.application.routes.draw do
  resources :festivals
  root 'festivals#show'
end
