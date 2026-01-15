"""
Generate word lists for the word finder website
This script creates JSON files containing English words of various lengths
"""

# 3 Letter Words (100 common words)
three_letter_words = [
    "ace", "act", "add", "age", "ago", "aid", "aim", "air", "all", "and",
    "ant", "any", "ape", "arc", "are", "ark", "arm", "art", "ash", "ask",
    "ate", "bad", "bag", "ban", "bar", "bat", "bay", "bed", "bee", "bet",
    "big", "bin", "bit", "bow", "box", "boy", "bud", "bug", "bun", "bus",
    "but", "buy", "cab", "can", "cap", "car", "cat", "cob", "cod", "cog",
    "cop", "cot", "cow", "cry", "cub", "cup", "cut", "dad", "dam", "day",
    "den", "dew", "did", "die", "dig", "dim", "dog", "dot", "dry", "dub",
    "dud", "due", "dug", "dye", "ear", "eat", "eel", "egg", "ego", "elf",
    "elk", "elm", "emu", "end", "era", "eve", "eye", "fad", "fan", "far",
    "fat", "fax", "fed", "fee", "few", "fig", "fin", "fir", "fit", "fix"
]

# 4 Letter Words (150 common words)
four_letter_words = [
    "able", "acid", "aged", "also", "area", "army", "away", "baby", "back", "ball",
    "band", "bank", "base", "bath", "bear", "beat", "been", "beer", "bell", "belt",
    "best", "bill", "bird", "blow", "blue", "boat", "body", "bone", "book", "boot",
    "born", "both", "bowl", "bulk", "burn", "bush", "busy", "cake", "call", "calm",
    "came", "camp", "card", "care", "carr", "case", "cash", "cast", "cell", "chat",
    "chip", "city", "club", "coal", "coat", "code", "cold", "come", "cook", "cool",
    "cope", "copy", "core", "cost", "crew", "crop", "dark", "data", "date", "dawn",
    "dead", "deal", "dear", "debt", "deep", "deny", "desk", "dial", "diet", "dirt",
    "disc", "disk", "does", "door", "dose", "down", "draw", "drew", "drop", "drug",
    "dual", "duke", "dull", "dust", "duty", "each", "earn", "ease", "east", "easy",
    "edge", "else", "even", "ever", "evil", "exit", "face", "fact", "fail", "fair",
    "fall", "farm", "fast", "fate", "fear", "feed", "feel", "feet", "fell", "felt",
    "file", "fill", "film", "find", "fine", "fire", "firm", "fish", "five", "flat",
    "flew", "flow", "food", "foot", "ford", "form", "fort", "four", "free", "from",
    "fuel", "full", "fund", "gain", "game", "gate", "gave", "gear", "gene", "gift"
]

# 5 Letter Words (250 common words - PRIMARY FOCUS)
five_letter_words = [
    "about", "above", "abuse", "admit", "adopt", "adult", "after", "again", "agent", "agree",
    "ahead", "alarm", "album", "alert", "align", "alike", "alive", "allow", "along", "alter",
    "angel", "anger", "angle", "angry", "apart", "apple", "apply", "arena", "argue", "arise",
    "armed", "armor", "arose", "array", "arrow", "aside", "asset", "award", "aware", "badly",
 "baker", "basic", "basis", "beach", "began", "begin", "being", "below", "bench", "bible",
    "black", "blade", "blame", "blank", "blast", "blind", "blood", "board", "boost", "booth",
    "bound", "brain", "brand", "brass", "brave", "bread", "break", "breed", "brick", "bride",
    "brief", "bring", "broad", "broke", "brown", "brush", "build", "built", "bunch", "buyer",
    "cable", "calif", "canal", "candy", "canoe", "canon", "cared", "cargo", "carry", "catch",
    "cause", "cedar", "chain", "chair", "chaos", "charm", "chart", "chase", "cheap", "check",
    "chess", "chest", "chief", "child", "china", "chose", "civil", "claim", "class", "clean",
    "clear", "click", "cliff", "climb", "clock", "close", "cloth", "cloud", "coach", "coast",
    "coral", "couch", "could", "count", "court", "cover", "crack", "craft", "crash", "crazy",
    "cream", "crime", "crisis", "cross", "crowd", "crown", "crude", "curve", "cycle", "daily",
    "dance", "dated", "dealt", "death", "debut", "delay", "delta", "dense", "depot", "depth",
    "devil", "diary", "dirty", "doing", "doubt", "dozen", "draft", "drain", "drama", "drank",
    "drawn", "dream", "dress", "dried", "drill", "drink", "drive", "drove", "dying", "eager",
    "early", "earth", "eight", "eight", "elite", "empty", "enemy", "enjoy", "enter", "entry",
    "equal", "error", "ethic", "event", "every", "exact", "exist", "extra", "faith", "false",
    "fancy", "fatal", "fault", "fiber", "field", "fifth", "fifty", "fight", "final", "first",
    "fixed", "flame", "flash", "fleet", "flesh", "floor", "fluid", "focus", "force", "forth",
    "forty", "forum", "found", "frame", "frank", "fraud", "fresh", "front", "frost", "fruit",
    "fully", "funny", "giant", "given", "glass", "globe", "glory", "goat", "going", "grace",
    "grade", "grain", "grand", "grant", "grass", "grave", "great", "green", "greet", "gross",
    "group", "grown", "guard", "guess", "guest", "guide", "guild", "habit", "happy", "harsh"
]

# 6 Letter Words (150 common words)
six_letter_words = [
    "accept", "access", "across", "acting", "action", "active", "actual", "advice", "advise", "affair",
    "affect", "afford", "afraid", "agency", "agenda", "almost", "always", "amount", "animal", "annual",
    "answer", "anyone", "anyway", "appeal", "appear", "around", "arrive", "artist", "aspect", "assert",
    "assess", "assign", "assist", "assume", "assure", "attach", "attack", "attend", "august", "author",
    "avenue", "backed", "ballot", "barrel", "battle", "beauty", "become", "before", "behalf", "behave",
    "behind", "belief", "belong", "beside", "better", "beyond", "bishop", "border", "bottle", "bottom",
    "branch", "bright", "broken", "budget", "bureau", "button", "camera", "campus", "cancer", "cannot",
    "carbon", "career", "castle", "casual", "caught", "center", "centre", "chance", "change", "charge",
    "choice", "choose", "chosen", "christ", "church", "circle", "client", "closed", "closer", "coffee",
    "column", "combat", "coming", "commit", "common", "comply", "copper", "corner", "county", "couple",
    "course", "cousin", "create", "credit", "crisis", "critic", "custom", "damage", "danger", "dealer",
    "debate", "decade", "decide", "defeat", "defend", "define", "degree", "demand", "denial", "depend",
    "deputy", "desert", "design", "desire", "detail", "detect", "device", "differ", "dinner", "direct",
    "doctor", "dollar", "domain", "double", "driven", "driver", "during", "easily", "eating", "editor",
    "effect", "effort", "eighth", "either", "eleven", "emerge", "empire", "employ", "enable", "engage"
]

# 7 Letter Words (100 common words)
seven_letter_words = [
    "ability", "absence", "absolute", "academy", "account", "accused", "achieve", "acquire", "address", "advance",
    "advise", "advisor", "affair", "afford", "against", "airline", "airport", "alcohol", "already", "analyst",
    "ancient", "another", "anxiety", "anxious", "anymore", "appeals", "applied", "appoint", "approve", "archive",
    "arrived", "article", "artist", "assault", "assured", "attempt", "attract", "auction", "average", "backing",
    "balance", "balloon", "banking", "barrier", "battery", "bearing", "because", "bedroom", "benefit", "beneath",
    "besides", "between", "bicycle", "billion", "biology", "blanket", "blessing", "brother", "brought", "budge",
    "builder", "burning", "cabinet", "caliber", "calling", "capable", "capacity", "capital", "captain", "capture",
    "careful", "carrier", "catalog", "ceiling", "central", "century", "certain", "chairman", "chamber", "channel",
    "chapter", "charity", "chicken", "circuit", "citizen", "classic", "climate", "closing", "clothes", "collect",
    "college", "combine", "comfort", "command", "comment", "company", "compare", "compete", "complex", "concept"
]

import json
import os

# Create data directory
os.makedirs('data', exist_ok=True)

# Save all word files
with open('data/3-letter-words.json', 'w') as f:
    json.dump(sorted(three_letter_words), f, indent=2)

with open('data/4-letter-words.json', 'w') as f:
    json.dump(sorted(four_letter_words), f, indent=2)

with open('data/5-letter-words.json', 'w') as f:
    json.dump(sorted(five_letter_words), f, indent=2)

with open('data/6-letter-words.json', 'w') as f:
    json.dump(sorted(six_letter_words), f, indent=2)

with open('data/7-letter-words.json', 'w') as f:
    json.dump(sorted(seven_letter_words), f, indent=2)

print("✅ All word list JSON files created successfully!")
print(f"  • 3-letter-words.json: {len(three_letter_words)} words")
print(f"  • 4-letter-words.json: {len(four_letter_words)} words")
print(f"  • 5-letter-words.json: {len(five_letter_words)} words")
print(f"  • 6-letter-words.json: {len(six_letter_words)} words")
print(f"  • 7-letter-words.json: {len(seven_letter_words)} words")
