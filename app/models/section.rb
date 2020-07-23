class Section < ApplicationRecord
    belongs_to :day
    has_one :section_act

    validates :name, :max_act_count, presence: true, if: :active_or_settings?
    validates :height, presence: true, if: :active_or_position?

    def active_or_settings?
        day.template.active_or_settings?
    end

    def active_or_position?
        day.template.active_or_position?
    end
end
