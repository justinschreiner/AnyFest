class FestivalsController < ApplicationController
  def index
    @festivals = Festival.all
  end

  def show
    @festival = Festival.find(params[:id])
  end

  def new
    @festival = Festival.new
  end

  def festival_params
    params.require(:festivals).permit(:name, :location)
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
end
