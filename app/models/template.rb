class Template < ApplicationRecord
    belongs_to :festival, required: false # A festival will be required, but setting this as false to be able to pass a template without a festival to Wicked form
    belongs_to :user
    has_many :days
    has_one_attached :background_image
    accepts_nested_attributes_for :days, allow_destroy: true
    has_many :lineups

    validates :festival_id,      presence: {message: "select one"},      if: :active_or_create?
    validates :name,             presence: {message: "can't be blank"},  if: :active_or_create?
    validates :background_image, presence: {message: "upload an image"}, if: :active_or_create?
    validates_associated :days,                                          if: :active_or_position?
    validate :has_one_day_minimum,                                       if: :active_or_position?
    validate :has_one_section_minimum,                                       if: :active_or_position?
    validates_associated :days,                                          if: :active_or_settings?

    def active?
        status == 'active'
    end

    def active_or_create?
        (status == "create_template") || active?
    end

    def active_or_position?
        (status == "position_sections") || active?
    end

    def active_or_settings?
        (status == "section_settings") || active?
    end

    def has_one_day_minimum
        self.errors.add(:days, "include at least one day") unless self.days.present?
    end

    def has_one_section_minimum
        self.days.each do |day|
            self.errors.add(:days, "days must include at least one section") unless day.sections.present?
        end
    end
end
