let booksData = [];
let authorsData = [];

// Function to fetch books and authors data
async function fetchBooksAndAuthors() {
    try {
        const booksResponse = await fetch('json/books.json'); // Updated path
        booksData = await booksResponse.json();

        const authorsResponse = await fetch('json/author.json'); // Updated path
        authorsData = await authorsResponse.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to search for books and authors
function search() {
    const query = document.getElementById('search-box').value.toLowerCase();
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    // Search books
    const bookResults = booksData.filter(book => book.title.toLowerCase().includes(query));
    bookResults.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('result');
        bookDiv.innerHTML = `
            <h2><a href="../pages/books.html?title=${encodeURIComponent(book.title)}">${book.title}</a></h2>
            <p>Author: <a href="../pages/author.html?name=${encodeURIComponent(book.author)}">${book.author}</a></p>
        `;
        resultsContainer.appendChild(bookDiv);
    });

    // Search authors
    const authorResults = authorsData.filter(author => author.name.toLowerCase().includes(query));
    authorResults.forEach(author => {
        const authorDiv = document.createElement('div');
        authorDiv.classList.add('result');
        authorDiv.innerHTML = `
            <h2><a href="pages/author.html?name=${encodeURIComponent(author.name)}">${author.name}</a></h2>
            <p>${author.summary}</p>
        `;
        resultsContainer.appendChild(authorDiv);
    });
}

// Fetch and display books and authors when the page loads
document.addEventListener('DOMContentLoaded', fetchBooksAndAuthors);

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed.');
    if (window.ZugaIME) {
        console.log('ZugaIME object is available.');
        if (typeof window.ZugaIME.init === 'function') {
            console.log('ZugaIME init function is available.');
            window.ZugaIME.init();
        } else {
            console.error('ZugaIME init function is not available.');
        }
    } else {
        console.error('ZugaIME object is not available.');
    }
});
