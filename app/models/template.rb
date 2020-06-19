class Template < ApplicationRecord
    belongs_to :festival
    belongs_to :user
    has_many :days
    has_one_attached :background_image
end
