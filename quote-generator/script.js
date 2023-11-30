const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

function loading() {
  loader.hidden = false
  quoteContainer.hidden = true
}

function complete() {
  quoteContainer.hidden = false
  loader.hidden = true
}

// Show New Quote
function newQuote() {
  loading()

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

  if (!quote.author) {
    authorText.textContent = 'Unknown'
  } else {
    authorText.textContent = quote.author
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text
  complete()
}

async function getQuotes() {
  loading()
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
  } catch (error) {}
}
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`
  window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

getQuotes()
