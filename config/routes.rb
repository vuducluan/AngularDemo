Rails.application.routes.draw do
  resources :visitors, defaults: {format: :json}
  root to: "visitors#index"
end
