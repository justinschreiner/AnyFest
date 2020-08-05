class FestivalsController < ApplicationController
  def index
    @q = Festival.ransack(params[:q])
    @festivals = @q.result(distinct: true)
  end

  def show
    @festival = Festival.find(params[:id])
    @query = params[:q]
    if @query.nil?
      @lineups = @festival.lineups
      @templates = @festival.templates
    else
      @lineups = @festival.lineups.search_by_name(@query)
      @templates = @festival.templates.search_by_name(@query)
    end
  end

  def new
    @festival = Festival.new
  end

  def create
    @festival = Festival.new(festival_params)

    if @festival.save
      redirect_to action: 'index'
    else
      render action: 'new'
    end
  end

  def edit
    @festival = Festival.find(params[:id])
  end

  def update
    @festival = Festival.find(params[:id])

    if @festival.update_attributes(festival_params)
      redirect_to action: 'show', id: @festival
    else
      render action: 'edit'
    end
  end

  def destroy
    Festival.find(params[:id]).destroy
    redirect_to action: 'list'
  end

  private
  def festival_params
    params.require(:festival).permit(:name, :location)
  end
end
