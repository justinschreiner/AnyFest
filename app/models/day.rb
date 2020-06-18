class Day < ApplicationRecord
    belongs_to :template
    has_many :sections
end
