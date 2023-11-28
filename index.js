// Function to fetch quotes data from "quotes.json"
function getQuotes() {
    // Assuming "quotes.json" is in the same directory
    const jsonPath = 'quotes.json';
  
    // Fetch quotes data using AJAX
    return fetch(jsonPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Assuming the JSON structure has a "quotes" key
        if (data && data.quotes) {
          return data.quotes;
        } else {
          throw new Error('Invalid JSON structure');
        }
      })
      .catch(error => {
        console.error('Error fetching quotes:', error);
      });
  }
  
  const projectName = 'random-quote-machine';
  let quotesData;

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

  
