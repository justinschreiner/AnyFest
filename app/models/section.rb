class Section < ApplicationRecord
    belongs_to :day
    has_one :section_act

    validates :name, :max_act_count, presence: true, if: :active_or_settings?

    def active_or_settings?
        (day.template.status == "section_settings") || day.template.active?
    end
end
