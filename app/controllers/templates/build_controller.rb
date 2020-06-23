class Templates::BuildController < ApplicationController
    include Wicked::Wizard
  
    steps :create_template, :position_sections, :section_settings
  
    def show
      @template = Template.find(params[:template_id])
      @festivals = Festival.all
      render_wizard
    end
  
  
    def update
      @template = Template.find(params[:template_id])
      params[:template][:status] = 'active' if step == steps.last
      if @template.update_attributes(params[:template])
        redirect_to next_wizard_step
      end
      render_wizard @template
    end
  
  
    def create
      @template = Template.find(params[:template_id])
      redirect_to wizard_path(steps.first, template: @template.id)
    end
end