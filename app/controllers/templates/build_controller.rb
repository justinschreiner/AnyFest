class Templates::BuildController < ApplicationController
    include Wicked::Wizard
  
    steps :create_template, :position_sections, :section_settings
  
    def show
      @template = Template.find(params[:template_id])
      @festivals = Festival.all
      @fonts = { "Sora" => '"Sora", sans-serif', "Oswald" => '"Oswald", sans-serif', "Signika" => '"Signika", sans-serif', "Nunito" => '"Nunito", sans-serif', "Work Sans" => '"Work Sans", sans-serif', "Heebo" => '"Heebo", sans-serif', "Roboto Slab" => '"Roboto Slab"', "Rokkitt" => '"Rokkitt"' }
      @weights = { "Regular" => "400", "Bold" => "700", "Extra Bold" => "900"}
      render_wizard
    end
  
    def update
      @template = Template.find(params[:template_id])
      @festivals = Festival.all

      # updating the status to the wizard step, will help for knowing what validations should have taken place to this point
      @template.status = step.to_s
      @template.status = "active" if step == steps.last
      
      @template.update(template_params)      
      render_wizard @template
    end  

    def create
      @template = Template.find(params[:template_id])
      redirect_to wizard_path(steps.first, template: @template.id)
    end

    private
    def template_params
      params.fetch(:template, {}).permit(:name, :background_color, :festival_id, :background_image, :status, 
        days_attributes: [:id, :x_offset, :y_offset, :width, :height, :name, 
          sections_attributes: [:id, :x_offset, :y_offset, :width, :height, :name, 
            :act_type, :alternating_colors, :text_colors, :delineator, :delineator_color, :max_act_count, :font, :weight, text_colors: []]])
    end
end