class Template < ApplicationRecord
    belongs_to :festival, required: false # A festival will be required, but setting this as false to be able to pass a template without a festival to Wicked form
    belongs_to :user
    has_many :days
    has_one_attached :background_image
    accepts_nested_attributes_for :days

    validates :name, presence: true, if: :active?

    def active?
        status == 'active'
    end
end
