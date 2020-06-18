class Template < ApplicationRecord
    belongs_to :festival
    belongs_to :user
    has_many :days
end
