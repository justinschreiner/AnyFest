class Lineup < ApplicationRecord
    include PgSearch::Model
    pg_search_scope :search_by_name, against: :name

    belongs_to :template
    belongs_to :user
    has_many :section_acts, dependent: :destroy

    accepts_nested_attributes_for :section_acts
end
