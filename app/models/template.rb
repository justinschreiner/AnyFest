class Template < ApplicationRecord
    belongs_to :festival, required: false # A festival will be required, but setting this as false to be able to pass a template without a festival to Wicked form
    belongs_to :user
    has_many :days
    has_one_attached :background_image
    accepts_nested_attributes_for :days, allow_destroy: true

    validates :festival_id, :name, :background_image, presence: true, if: :active_or_create?
    validates :days,                                  presence: true, if: :active_or_position?
    validate :nested_validations,                                     if: :active_or_settings?

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

    def nested_validations
        self.days.each do |day|
            unless day.name.present?
                self.errors.add(:base, "Day name field can't be blank.")
            end
            day.sections.each do |section|
                unless section.name.present?
                    self.errors.add(:base, "Section name field can't be blank.")
                end
                unless section.text_colors.present?
                    self.errors.add(:base, "Text color field can't be blank.")
                end
                unless section.delineator.present?
                    self.errors.add(:base, "Delineator field can't be blank.")
                end
                unless section.delineator_color.present?
                    self.errors.add(:base, "Delineator color field can't be blank.")
                end
                unless section.max_act_count.present?
                    self.errors.add(:base, "Maximum acts field can't be blank.")
                end
            end
        end
    end
end
