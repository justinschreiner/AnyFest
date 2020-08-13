class Day < ApplicationRecord
    belongs_to :template
    has_many :sections, dependent: :destroy
    accepts_nested_attributes_for :sections

    validates_associated :sections, if: :active_position_or_settings?
    validates :height, presence: true, if: :active_or_position?
    validates :name, presence: true, if: :active_or_settings?

    def active_position_or_settings?
        template.active_or_settings?  || template.active_or_position?
    end

    def active_or_settings?
        template.active_or_settings?
    end

    def active_or_position?
        template.active_or_position?
    end
end
