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
    @template = current_user.templates.create
    redirect_to template_build_path(template_id: @template, id: :create_template, action: 'create')
  end

  def edit
    @template = Template.find(params[:id])
    redirect_to template_build_path(template_id: @template, id: :create_template, action: 'update')
  end
end
