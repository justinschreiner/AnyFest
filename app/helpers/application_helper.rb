module ApplicationHelper
    def error_messages(form, field)
        errors = form.object.errors[field]
        if errors.any?
            tag.div(class: "errors text-danger") do
                safe_join(errors.map { |error| tag.p("*#{error}") })
            end
        end
    end
end
