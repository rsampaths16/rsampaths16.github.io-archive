module Jekyll
    module ListFilter
        def unordered_html_list_joined_with_and(input)
            if !input.kind_of?(Array)
                raise ArgumentError, 'Input to filter unordered_html_list_joined_with_and is not a list'
            end

            input_length = input.length
            output = "<ul>\n"

            input.each_with_index do |value, index|
                if index == 0
                    output += "<li>" + value + "</li>\n"
                elsif index == (input_length-1)
                    output += " and " + "<li>" + value + "</li>\n"
                else
                    output += " " + "<li>" + value + "</li>\n"
                end
            end

            return output
        end
    end
end

Liquid::Template.register_filter(Jekyll::ListFilter)
