# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_20_143410) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "days", force: :cascade do |t|
    t.string "name"
    t.integer "x_offset"
    t.integer "y_offset"
    t.integer "width"
    t.integer "height"
    t.bigint "template_id"
    t.index ["template_id"], name: "index_days_on_template_id"
  end

  create_table "festivals", force: :cascade do |t|
    t.string "name"
    t.string "location"
  end

  create_table "lineups", force: :cascade do |t|
    t.string "name"
    t.bigint "template_id"
    t.bigint "user_id"
    t.index ["template_id"], name: "index_lineups_on_template_id"
    t.index ["user_id"], name: "index_lineups_on_user_id"
  end

  create_table "section_acts", force: :cascade do |t|
    t.string "acts", default: [], array: true
    t.bigint "lineup_id"
    t.bigint "section_id"
    t.index ["lineup_id"], name: "index_section_acts_on_lineup_id"
    t.index ["section_id"], name: "index_section_acts_on_section_id"
  end

  create_table "sections", force: :cascade do |t|
    t.string "name"
    t.string "act_type"
    t.string "text_colors", default: "{}"
    t.boolean "alternating_colors"
    t.string "delineator"
    t.string "delineator_color"
    t.integer "max_act_count"
    t.integer "x_offset"
    t.integer "y_offset"
    t.integer "width"
    t.integer "height"
    t.bigint "day_id"
    t.string "font"
    t.integer "weight"
    t.index ["day_id"], name: "index_sections_on_day_id"
  end

  create_table "templates", force: :cascade do |t|
    t.string "name"
    t.string "background_color"
    t.bigint "festival_id"
    t.bigint "user_id", null: false
    t.string "status"
    t.index ["festival_id"], name: "index_templates_on_festival_id"
    t.index ["user_id"], name: "index_templates_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.boolean "is_admin", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "days", "templates"
  add_foreign_key "lineups", "templates"
  add_foreign_key "lineups", "users"
  add_foreign_key "section_acts", "lineups"
  add_foreign_key "section_acts", "sections"
  add_foreign_key "sections", "days"
  add_foreign_key "templates", "festivals"
  add_foreign_key "templates", "users"
end
