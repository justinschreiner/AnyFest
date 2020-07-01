class TemplatesController < ApplicationController
  include ActionView::Helpers::UrlHelper
  before_action :authenticate_user!
  
  def index
    @q = Festival.ransack(params[:q])
    @festivals = @q.result(distinct: true)
    @templates = Template.all
  end

  def show
    @template = Template.find(params[:id])
  end

  def new
    @template = current_user.templates.create
    redirect_to template_build_path(template_id: @template, id: :create_template, action: 'create')
  end

  def create
    @template = current_user.templates.new(template_params)

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
      # if (template_params['days_attributes'].blank?)
      #   redirect_to template_build_path(template_id: @template, id: :position_sections)
      # else
      #   redirect_to template_build_path(template_id: @template, id: :section_settings)
      # end
      redirect_to template_build_path(template_id: @template, id: :position_sections)
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
    params.require(:template).permit(:name, :background_color, :festival_id, :background_image, 
      days_attributes: [:x_offset, :y_offset, :width, :height, 
        sections_attributes:[:x_offset, :y_offset, :width, :height] ])
  end

end
