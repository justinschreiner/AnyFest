class TemplatesController < ApplicationController
  def index
    @templates = Template.all
  end

  def show
    @template = Template.find(params[:id])
  end

  def new
    @template = Template.new
  end

  def template_params
    params.require(:templates).permit(:name, :background_img, :background_color)
  end

  def create
    @template = Template.new(template_params)

    if @template.save
      redirect_to action: 'index'
    else
      render action: 'new'
    end
  end

  # def edit
  #   @template = Template.find(params[:id])
  # end

  # def update
  #   @template = Template.find(params[:id])

  #   if @template.update_attributes(template_params)
  #     redirect_to action: 'show', id: @template
  #   else
  #     render action: 'edit'
  #   end
  # end

  # def destroy
  #   Template.find(params[:id]).destroy
  #   redirect_to action: 'list'
  # end
end
