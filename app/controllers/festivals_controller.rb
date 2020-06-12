# frozen_string_literal: true

class FestivalsController < ApplicationController
  def list
    @festivals = Festival.all
  end

  def show
    @festival = Festival.find(params[:id])
  end

  def new
    @festival = Festival.new
  end

  def festival_params
    params.require(:festivals).permit(:title, :price, :subject_id, :description)
  end

  def create
    @festival = Festival.new(festival_params)

    if @festival.save
      redirect_to action: 'list'
    else
      render action: 'new'
    end
  end

  def edit
    @festival = Festival.find(params[:id])
  end

  def festival_param
    params.require(:festival).permit(:title, :price, :subject_id, :description)
  end

  def update
    @festival = Festival.find(params[:id])

    if @festival.update_attributes(festival_param)
      redirect_to action: 'show', id: @festival
    else
      render action: 'edit'
    end
  end

  def delete
    Festival.find(params[:id]).destroy
    redirect_to action: 'list'
  end
end
