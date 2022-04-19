setTimeout(() => {
    const addQuoteButton = document.getElementById('addQuote');
    const quoteContainer = document.getElementById('quoteContainer');

    let quotes = [];
    if (localStorage.getItem('quotes')) {
        quotes = JSON.parse(localStorage.getItem('quotes'));
    } else {
        localStorage.setItem('quotes', JSON.stringify(quotes));
        quotes = JSON.parse(localStorage.getItem('quotes'));
    }

    quotes.forEach(quote => {
        getQuotes(quote);
    });

    addQuoteButton.addEventListener('click', addQuote);

    function addQuote() {
        const quote = document.getElementById('quote').value;

        const author = document.getElementById('author').value;

        const newQuote = {
            quote: quote,
            author: author,
        }

        getQuotes(newQuote);

    }

    function getQuotes(newQuote) {
        const newQuoteElementDiv = document.createElement('div');
        const newQuoteElementQuote = document.createElement('p');
        const newQuoteElementDelete = document.createElement('button');

        newQuoteElementDiv.style.backgroundColor = '#525252';
        newQuoteElementDiv.style.height = '120px';

        newQuoteElementQuote.innerText = `"${newQuote.quote}" -${newQuote.author}`
        newQuoteElementDelete.innerText = 'Delete';

        newQuoteElementDelete.addEventListener('click', deleteQuote);
        newQuoteElementDelete.id = 'delete';

        newQuoteElementDiv.appendChild(newQuoteElementQuote);
        newQuoteElementDiv.appendChild(newQuoteElementDelete);

        quoteContainer.appendChild(newQuoteElementDiv);

        quotes.push(newQuote);

        localStorage.setItem('quotes', JSON.stringify(quotes));
        console.log(quotes);

        function deleteQuote() {
            newQuoteElementDelete.innerText = 'Are you sure?';
            newQuoteElementDelete.addEventListener('click', confirmDelete);
            newQuoteElementDelete.removeEventListener('click', deleteQuote);
            setTimeout(() => {
                newQuoteElementDelete.innerText = 'Delete';
                newQuoteElementDelete.removeEventListener('click', confirmDelete);
                newQuoteElementDelete.addEventListener('click', deleteQuote);
            }, 2000);
        }

        function confirmDelete() {
            newQuoteElementDiv.remove();
            quotes = quotes.filter(quote => quote.quote !== newQuote.quote);
            localStorage.setItem('quotes', JSON.stringify(quotes));
        }
    }

}, 0);