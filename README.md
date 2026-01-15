# 5 Letter Words - Word Finder Website

A professional, SEO-optimized static website for browsing English words by length (3-7 letters) with advanced filtering capabilities.

## 🚀 Features

- **Multiple Word Lists**: Separate pages for 3, 4, 5, 6, and 7 letter words
- **Advanced Filtering**: Filter by starting letter, ending letter, pattern matching, and excluded letters
- **Pattern Matching**: Use wildcards (_) to find words matching specific patterns (e.g., `_a_e_`)
- **Instant Search**: Client-side filtering with no page reloads
- **Dark Mode**: Toggle between light and dark themes
- **SEO Optimized**: Proper meta tags, semantic HTML, and keyword optimization
- **Mobile First**: Responsive design that works on all devices
- **Fast Performance**: No frameworks, pure vanilla JavaScript
- **Static**: No backend, database, or API dependencies

## 📁 Project Structure

```
5-letter/
├── index.html                 # Landing page
├── 3-letter-words.html       # 3-letter words page
├── 4-letter-words.html       # 4-letter words page
├── 5-letter-words.html       # 5-letter words page (primary)
├── 6-letter-words.html       # 6-letter words page
├── 7-letter-words.html       # 7-letter words page
├── assets/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   └── js/
│       ├── main.js           # Theme toggle & utilities
│       └── filters.js        # Word filtering logic
├── data/
│   ├── 3-letter-words.json   # 100 words
│   ├── 4-letter-words.json   # 150 words
│   ├── 5-letter-words.json   # 250 words
│   ├── 6-letter-words.json   # 150 words
│   └── 7-letter-words.json   # 100 words
└── generate_words.py         # Script to generate word lists
```

## 🎯 Use Cases

- **Wordle Helper**: Find 5-letter words matching specific patterns
- **Scrabble/Word Games**: Browse valid words by length
- **Crossword Puzzles**: Filter words by starting/ending letters
- **Vocabulary Building**: Explore words organized by length
- **Educational**: Learning resource for students

## 🛠️ Technology Stack

- **HTML5**: Semantic markup for SEO
- **CSS3**: Modern design with CSS variables
- **Vanilla JavaScript**: No frameworks or dependencies
- **JSON**: Static data storage

## 🚀 Deployment

This website is deployment-ready for:

### GitHub Pages

1. Push code to GitHub repository
2. Go to repository Settings → Pages
3. Select branch: `main`, folder: `/ (root)`
4. Site will be live at `https://username.github.io/repo-name`

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts to deploy

### Any Static Host

Simply upload all files to your web hosting via FTP/SFTP. No server-side configuration needed.

## 🎨 Features Breakdown

### Filtering System

The word filter supports multiple criteria:

1. **Starts With**: Enter letters the word must start with
2. **Ends With**: Enter letters the word must end with
3. **Contains Pattern**: Use underscores for wildcards
   - Example: `_a_e_` finds words like "baker", "cakes", "paper"
4. **Exclude Letters**: Enter letters the word must NOT contain

### Theme Toggle

- Automatically saves preference to localStorage
- Smooth transitions between themes
- System-friendly color schemes

### Performance

- Lazy loading: Only loads required JSON file per page
- Client-side filtering: No server requests
- Minimal CSS/JS: Fast page loads
- Optimized images: SVG favicon only

## 📊 SEO Optimization

- ✅ Semantic HTML structure
- ✅ Keyword-optimized titles and meta descriptions
- ✅ Proper heading hierarchy (H1, H2, H3)
- ✅ Internal linking between pages
- ✅ Mobile-friendly responsive design
- ✅ Fast loading times
- ✅ Clean URLs
- ✅ Rich content sections

## 🔧 Customization

### Adding More Words

1. Edit `generate_words.py`
2. Add words to the appropriate array
3. Run: `python generate_words.py`
4. JSON files will be updated automatically

### Changing Colors

Edit CSS variables in `assets/css/style.css`:

```css
:root {
    --accent-primary: #6366f1;    /* Primary color */
    --accent-secondary: #8b5cf6;  /* Secondary color */
    /* ... more variables ... */
}
```

### Adding Word Lengths

1. Create new HTML page (e.g., `8-letter-words.html`)
2. Copy structure from existing page
3. Update title and content
4. Add JSON file to `data/` folder
5. Update navigation links

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📝 License

This project is free to use and modify.

## 🤝 Contributing

To add more words:
1. Edit word arrays in `generate_words.py`
2. Run script to regenerate JSON files
3. Test locally before deployment

## 📈 Future Enhancements (Optional)

- Word game integration (as mentioned in requirements)
- Word definitions via API
- Sound pronunciation
- Save favorite words
- Share word lists
- More advanced patterns (regex support)

## 🎓 Educational Value

This project demonstrates:
- Clean, semantic HTML
- Modern CSS with variables and responsive design
- Vanilla JavaScript without frameworks
- Client-side data management
- SEO best practices
- Performance optimization
- Static site architecture

## 📞 Support

For issues or questions, please refer to the inline code comments or standard web development documentation.

---

**Built with ❤️ for word enthusiasts**
