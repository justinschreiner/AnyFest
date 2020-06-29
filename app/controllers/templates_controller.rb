class TemplatesController < ApplicationController
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
    @template = current_user.templates.new
    @template.festival_id = 1
    @template.save
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
      days_attributes: [:x_offset, :y_offset, :width, :height])
  end

end

# {templates{days_attributes{x_offset=402.347412109375,
#  y_offset=263.132568359375,
#  width=260.578125,
#  height=411.453125}},
#  commit=Create,
#  id=57}
