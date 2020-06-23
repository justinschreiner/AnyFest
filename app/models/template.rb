class Template < ApplicationRecord
    belongs_to :festival, required: false
    belongs_to :user
    has_many :days
    has_one_attached :background_image

    validates :name, presence: true, if: :active?

    def active?
        status == 'active'
    end
end
