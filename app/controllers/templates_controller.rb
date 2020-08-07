class TemplatesController < ApplicationController
  before_action :authenticate_user!
  FONTS = { "Sora" => '"Sora", sans-serif', "Oswald" => '"Oswald", sans-serif', "Signika" => '"Signika", sans-serif', "Nunito" => '"Nunito", sans-serif', "Work Sans" => '"Work Sans", sans-serif', "Heebo" => '"Heebo", sans-serif', "Roboto Slab" => '"Roboto Slab"', "Rokkitt" => '"Rokkitt"' }
  FONT_WEIGHTS = { "Regular" => "400", "Bold" => "700", "Extra Bold" => "900"}
  
  def index
    @q = Festival.ransack(params[:q])
    @q.sorts = 'name asc' if @q.sorts.empty?
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
