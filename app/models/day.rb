class Day < ApplicationRecord
    belongs_to :template
    has_many :sections
    accepts_nested_attributes_for :sections,  allow_destroy: true

    validates_associated :sections, presence: true, if: :active_position_or_settings?
    validates :name, presence: true, if: :active_or_settings?

    def active_position_or_settings?
        (template.status == "section_settings") || (template.status == "position_sections") || template.active?
    end

    def active_or_settings?
        (template.status == "section_settings") || template.active?
    end
end
