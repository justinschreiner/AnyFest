class TemplatesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @templates = Template.all
  end

  def show
    @template = Template.find(params[:id])
  end

  def new
    @template = Template.new
    @festivals = Festival.all
  end

  def create
    @template = Template.new(template_params)

    if @template.save
      redirect_to action: 'index'
    else
      @festivals = Festival.all
      render action: 'new'
    end
  end

  def edit
    @template = Template.find(params[:id])
  end

  def update
    @template = Template.find(params[:id])

    if @template.update_attributes(template_params)
      redirect_to action: 'show', id: @template
    else
      render action: 'edit'
    end
  end

  def destroy
    Template.find(params[:id]).destroy
    redirect_to action: 'list'
  end

  private
  def template_params
    params.require(:template).permit(:name, :background_color, :festival_id)
  end
end
