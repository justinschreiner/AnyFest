class Festival < ApplicationRecord
    has_many :templates
    has_many :lineups, through: :templates
end
