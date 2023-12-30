import csv
import json
 
 
# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):
     
    # create a dictionary
    lst = []
     
    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8-sig') as csvf:
        csvReader = csv.DictReader(csvf)
         
        # Convert each row into a dictionary
        # and add it to data
        for rows in csvReader:
             
            # Assuming a column named 'No' to
            # be the primary key
            key = rows['DISCOURSE_NAME']
            rows['TEXT'] = rows['TEXT'].replace('"', '\\"')
            rows['TEXT'] = rows['TEXT'].replace('\n', '\\n')
            rows['SPECIAL_OCCASION'] = rows['SPECIAL_OCCASION'].replace(" ", "_")
            lst.append(rows)
    data = {
    "data": lst
    }
    # Open a json writer, and use the json.dumps()
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
         
# Driver Code
 
# Decide the two file paths according to your
# computer system
csvFilePath = r'DISCOURSES_2014-2023.csv'
jsonFilePath = r'DISCOURSES.json'
 
# Call the make_json function
make_json(csvFilePath, jsonFilePath)