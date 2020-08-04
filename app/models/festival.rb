class Festival < ApplicationRecord
    has_many :templates
    validates :location, :name, presence: {message: "can't be blank"}
    has_many :lineups, through: :templates
end
