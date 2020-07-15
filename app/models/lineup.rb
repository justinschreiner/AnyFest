class Lineup < ApplicationRecord
    belongs_to :template
    belongs_to :user
    has_many :section_acts

    accepts_nested_attributes_for :section_acts
end
