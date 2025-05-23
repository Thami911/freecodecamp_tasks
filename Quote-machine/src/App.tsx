import { useState } from 'react';
import './App.css';
import quotes from './assets/quotes.json';
import { FaTwitter, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

interface Quotes {
  quote: string;
  author: string;
}

const getRandomQuotes = (): Quotes => {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

const getRandomColors = (): string => {
  const red = Math.floor(Math.random() * 128);
  const green = Math.floor(Math.random() * 128);
  const blue = Math.floor(Math.random() * 128);

  return `rgb(${red}, ${green}, ${blue})`;
}

const transition = "all 1s";

function App() {
  const [quote, setQuote] = useState<Quotes>(getRandomQuotes())
  const [randomColor, setRandomColor] = useState<string>(getRandomColors());

  const changeQoute = () => {
    setQuote(getRandomQuotes());
    setRandomColor(getRandomColors());
  }
  
  return (
    <div className="background" style={{ backgroundColor: randomColor, transition }}>
      <div id="quote-box">
        <div className="quote-content" style={{ color: randomColor, transition }}>
        <h2 id="text">
          <FaQuoteLeft size="30" style={{ marginRight: "10px" }} />
          {quote.quote}
          <FaQuoteRight size="30" style={{ marginLeft: "10px" }} />
        </h2>
          <h4 id="author">- {quote.author}</h4>
        </div>
        <div className="buttons">
          <a 
          href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote.quote}`}
          id="tweet-quote" style={{ backgroundColor: randomColor, marginRight: "10px", transition }}>
            <FaTwitter color="white" />
          </a>
          <button id="new-quote" onClick={changeQoute} style={{ backgroundColor: randomColor, transition }}>Change Quote</button>
        </div>
      </div>
    </div>
  )
}

export default App
