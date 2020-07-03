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
    
      # updating the status to the wizard step, will help for knowing what validations should have taken place to this point
      params[:template][:status] = step.to_s
      params[:template][:status] = "active" if step == steps.last
      @template.update_attributes(template_params)
      render_wizard @template
    end
    

    def create
      @template = Template.find(params[:template_id])
      redirect_to wizard_path(steps.first, template: @template.id)
    end

    private
    def template_params
      params.require(:template).permit(:name, :background_color, :festival_id, :background_image, :status, 
        days_attributes: [:x_offset, :y_offset, :width, :height, 
          sections_attributes: [:x_offset, :y_offset, :width, :height]])
    end
end