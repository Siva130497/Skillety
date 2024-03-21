import json

def text_to_json(text):
    # Extract cities from text
    city_list = text.strip()[1:-1].split('\n')
    city_list = [city.strip() for city in city_list if city.strip()]

    # Convert list to JSON
    json_data = json.dumps(city_list, indent=4)
    return json_data

# Example text
example_text = """
[
Mumbai
Delhi
]
"""

# Convert text to JSON
json_output = text_to_json(example_text)
print(json_output)

#Vithu
