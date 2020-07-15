class Section < ApplicationRecord
    belongs_to :day
    has_one :section_act
end
