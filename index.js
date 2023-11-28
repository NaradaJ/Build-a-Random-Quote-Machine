// Declare variables
let currentQuote = '';
let currentAuthor = '';


// Initialize quotesData
let quotesData;

// Function to fetch quotes data from "quotes.json"
function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/NaradaJ/e5570723a7b60302d5a1cb11748bd37e/raw/fb259e797688f170a43c1a239280d24674a9b612/quotes.json', // Adjust the path based on your file structure
    success: function (jsonQuotes) {
      try {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData:', quotesData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    },
    error: function (xhr, status, error) {
      console.error('AJAX request failed:', status, error);
    }
  });
}

let colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

// Function to get a random quote from quotesData
function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

// Function to display a new quote
function getQuote() {
  // Check if quotesData is defined
  if (!quotesData) {
    // If not defined, fetch quotesData first
    getQuotes().then(() => {
      // Then call getQuote
      getQuote();
    });
    return; // Exit the function to avoid further execution
  }

  let randomQuote = getRandomQuote();

  // Update currentQuote and currentAuthor
  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  // Update tweet quote link
  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  // Update Tumblr quote link
  $('#tumblr-quote').attr(
    'href',
    'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
      encodeURIComponent(currentAuthor) +
      '&content=' +
      encodeURIComponent(currentQuote) +
      '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
  );

  // Animate the quote text
  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.quote);
  });

  // Animate the quote author
  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.author);
  });

  // Change background color and button color with animation
  var color = Math.floor(Math.random() * colors.length);
  $('html body').animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $('.button').animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
}

// Document ready function
$(document).ready(function () {
  // Fetch quotes data and get initial quote
  getQuotes().then(() => {
    getQuote();
  });

  // Event handler for the new quote button
  $('#new-quote').on('click', getQuote);
});
