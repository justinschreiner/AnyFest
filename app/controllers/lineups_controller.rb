class LineupsController < ApplicationController
    def show
        @lineup = Lineup.find(params[:id])
    end
    
    def new
        @lineup = Lineup.new
    end
    
    def create
        @lineup = Lineup.new(festival_params)
    
        if @festival.save
          redirect_to action: 'show'
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
    def festival_params
        params.require(:festival).permit(:name, :location)
    end
end
