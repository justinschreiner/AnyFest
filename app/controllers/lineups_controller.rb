class LineupsController < ApplicationController
  before_action :find_template, only: [:show, :new, :create]
    def show
      @lineup = Lineup.find(params[:id])
    end
    
    def new
      @lineup = current_user.lineups.new
    end
    
    def create
      @lineup = current_user.lineups.new(lineup_params)
      if @lineup.save
        redirect_to action: 'show', id: @lineup
      else
        render action: 'new'
      end
    end
    
    def edit
        @lineup = Lineup.find(params[:id])
    end
    
    def update
        @lineup = Lineup.find(params[:id])
    
        if @lineup.update_attributes(lineup_params)
          redirect_to action: 'show', id: @lineup
        else
          render action: 'edit'
        end
    end
    
    def destroy
        Lineup.find(params[:id]).destroy
        redirect_to controller: 'templates', action: 'list'
    end
    
    private
    def lineup_params
        params.require(:lineup).permit(:name, :template_id, :user_id, 
          section_acts_attributes: [:id, :section_id, :lineup_id, :acts, acts: []])
    end

    def find_template
      @template = Template.find(params[:template_id])
    end
end
