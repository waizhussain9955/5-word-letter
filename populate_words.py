import urllib.request
import json
import os

def populate_words():
    print("Fetching master word list (this might take a few seconds)...")
    url = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json'
    try:
        response = urllib.request.urlopen(url)
        data = json.loads(response.read().decode())
        words = [w.lower() for w in data.keys() if w.isalpha()]
        print(f"Total words found: {len(words)}")
        
        data_dir = 'public/data'
        if not os.path.exists(data_dir):
            os.makedirs(data_dir)
            
        for i in range(3, 8):
            length_words = sorted(list(set([w for w in words if len(w) == i])))
            # Limit to 2000 words but ensure it's at least 1000 if available
            final_list = length_words[:2000]
            
            file_path = os.path.join(data_dir, f'{i}-letter-words.json')
            with open(file_path, 'w') as f:
                json.dump(final_list, f, indent=2)
            print(f"Saved {len(final_list)} {i}-letter words to {file_path}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    populate_words()
