class UsersController < ApplicationController
    before_action :authenticate_user!
    
    def show
      @user = User.find(params[:id])
      @lineups = current_user.lineups
      @templates = current_user.templates.where(status: 'active')
    end

  end