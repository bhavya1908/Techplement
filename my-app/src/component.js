import { useState } from 'react';
import axios from 'axios';
import './component.css';

function QuoteGenerator() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const generateRandomQuote = async () => {
    try {
      const response = await axios.get('http://localhost:3000/quote');
      console.log(response.data)
      setQuote(response.data.content); // Update to match the response structure
      setSearchResults([]);
    } catch (error) {
      console.error('Error generating random quote:', error);
    }
  };

  const searchQuotesByAuthor = async () => {
    
    if (!author) {
      return; 
    }

    try {
      const response = await axios.get(`http://localhost:3000/quote/${author}`);
      console.log(response.data)
      setSearchResults([response.data]); // Update to match the response structure
      setQuote('');
    } catch (error) {
      console.error(`Error searching quotes by ${author}:`, error);
    }
  };

  return (
    <div className="maindiv">
      <h3 className="text-heading">Quote Of The Day</h3>

      <button className="button1" onClick={generateRandomQuote}>Generate Random Quote</button>

      <div >
    <div >
        {quote && <h2 className='quote-box'>{quote} </h2>}
    </div>
    {searchResults.length > 0 && (
        <div >
            {searchResults.map((quote, index) => (
                <div key={index}>
                    
                    <h2 className='quote-box' id='quotebox2'>
  <div>{quote.content}</div>
  <div>-{quote.author}</div>
</h2>

                </div>
            ))}
        </div>
        
    )}
</div>
 <div>
        <input 
          type="text"
          className='input-box'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter Author's Name"
        />
        <button className="search-button" onClick={searchQuotesByAuthor}>Search</button>
      </div>
    </div>
  );
}

export default QuoteGenerator;

