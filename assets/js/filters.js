/**
 * Word Filter Logic - Client-side filtering for word lists
 */

class WordFilter {
    constructor(dataUrl, wordLength) {
        this.dataUrl = dataUrl;
        this.wordLength = wordLength;
        this.allWords = [];
        this.filteredWords = [];

        // Filter controls
        this.startsWithInput = document.getElementById('startsWith');
        this.endsWithInput = document.getElementById('endsWith');
        this.containsInput = document.getElementById('contains');
        this.excludeInput = document.getElementById('exclude');

        // Display elements
        this.wordGrid = document.getElementById('wordGrid');
        this.wordCount = document.getElementById('wordCount');
        this.totalCount = document.getElementById('totalCount');

        // Buttons
        this.applyBtn = document.getElementById('applyFilters');
        this.resetBtn = document.getElementById('resetFilters');

        this.init();
    }

    async init() {
        try {
            await this.loadWords();
            this.attachEventListeners();
            this.applyFilters();
        } catch (error) {
            console.error('Failed to initialize word filter:', error);
            if (typeof utils !== 'undefined') {
                utils.showError(this.wordGrid, 'Failed to load word list. Please refresh the page.');
            }
        }
    }

    async loadWords() {
        if (typeof utils !== 'undefined') {
            utils.showLoading(this.wordGrid);
        }

        try {
            const response = await fetch(this.dataUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch word list');
            }

            const data = await response.json();
            this.allWords = data.sort();
            this.filteredWords = [...this.allWords];

            // Update total count
            if (this.totalCount) {
                this.totalCount.textContent = this.allWords.length.toLocaleString();
            }
        } catch (error) {
            console.error('Error loading words:', error);
            throw error;
        }
    }

    attachEventListeners() {
        // Apply filters on button click
        if (this.applyBtn) {
            this.applyBtn.addEventListener('click', () => this.applyFilters());
        }

        // Reset filters
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.resetFilters());
        }

        // Apply filters on Enter key
        const inputs = [
            this.startsWithInput,
            this.endsWithInput,
            this.containsInput,
            this.excludeInput
        ];

        inputs.forEach(input => {
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.applyFilters();
                    }
                });
            }
        });
    }

    applyFilters() {
        // Get filter values
        const startsWith = this.getInputValue(this.startsWithInput);
        const endsWith = this.getInputValue(this.endsWithInput);
        const contains = this.getInputValue(this.containsInput);
        const exclude = this.getInputValue(this.excludeInput);

        // Filter words
        this.filteredWords = this.allWords.filter(word => {
            // Starts with filter
            if (startsWith && !word.startsWith(startsWith)) {
                return false;
            }

            // Ends with filter
            if (endsWith && !word.endsWith(endsWith)) {
                return false;
            }

            // Contains filter (pattern matching)
            if (contains) {
                if (!this.matchesPattern(word, contains)) {
                    return false;
                }
            }

            // Exclude letters filter
            if (exclude) {
                const excludeLetters = exclude.split('').filter(c => c.match(/[a-z]/));
                for (const letter of excludeLetters) {
                    if (word.includes(letter)) {
                        return false;
                    }
                }
            }

            return true;
        });

        this.displayWords();
    }

    matchesPattern(word, pattern) {
        // Pattern can be like "a_e" or "_a_e_" where _ is wildcard
        pattern = pattern.toLowerCase().trim();

        // If pattern doesn't contain underscore, treat as simple contains
        if (!pattern.includes('_')) {
            return word.includes(pattern);
        }

        // Convert pattern to regex
        // Example: "a_e" becomes /^a.e$/
        const regexPattern = '^' + pattern.split('').map(c => {
            if (c === '_') return '.';
            if (c.match(/[a-z]/)) return c;
            return '';
        }).join('') + '$';

        const regex = new RegExp(regexPattern);
        return regex.test(word);
    }

    displayWords() {
        // Update count
        if (this.wordCount) {
            this.wordCount.textContent = this.filteredWords.length.toLocaleString();
        }

        // Display words
        if (this.wordGrid) {
            if (this.filteredWords.length === 0) {
                if (typeof utils !== 'undefined') {
                    utils.showEmptyState(this.wordGrid);
                } else {
                    this.wordGrid.innerHTML = '<div class="empty-state"><p>No words found</p></div>';
                }
                return;
            }

            this.wordGrid.innerHTML = this.filteredWords
                .map(word => `<div class="word-item">${word}</div>`)
                .join('');
        }
    }

    resetFilters() {
        // Clear all inputs
        if (this.startsWithInput) this.startsWithInput.value = '';
        if (this.endsWithInput) this.endsWithInput.value = '';
        if (this.containsInput) this.containsInput.value = '';
        if (this.excludeInput) this.excludeInput.value = '';

        // Reset to all words
        this.filteredWords = [...this.allWords];
        this.displayWords();
    }

    getInputValue(input) {
        if (!input) return '';
        return input.value.toLowerCase().trim();
    }
}

// Auto-initialize if word list page
document.addEventListener('DOMContentLoaded', () => {
    const wordGrid = document.getElementById('wordGrid');
    if (wordGrid) {
        // Determine word length from page
        const pageTitle = document.title.toLowerCase();
        let wordLength = 5;
        let dataUrl = './data/5-letter-words.json';

        if (pageTitle.includes('3 letter')) {
            wordLength = 3;
            dataUrl = './data/3-letter-words.json';
        } else if (pageTitle.includes('4 letter')) {
            wordLength = 4;
            dataUrl = './data/4-letter-words.json';
        } else if (pageTitle.includes('5 letter')) {
            wordLength = 5;
            dataUrl = './data/5-letter-words.json';
        } else if (pageTitle.includes('6 letter')) {
            wordLength = 6;
            dataUrl = './data/6-letter-words.json';
        } else if (pageTitle.includes('7 letter')) {
            wordLength = 7;
            dataUrl = './data/7-letter-words.json';
        }

        // Initialize filter
        new WordFilter(dataUrl, wordLength);
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WordFilter };
}
