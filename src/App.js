import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';

function App() {
  const [creditCards, setCreditCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreditCards = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('https://api.wefin.in/getcreditdarddetails');
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); 
        setCreditCards(data.data.cardDetails || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreditCards();
  }, []);

  return (
    
    <div className="App">
      <Header />
    <div className='head'><h1>18 Credit Cards for You</h1>
    <button className="login-button2">Compare Credit Cards</button></div>
    {isLoading && <p>Loading credit card details...</p>}
    {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    {!isLoading && !error && creditCards.length > 0 && (
      <div className="card-box">
        {creditCards.map((card, index) => (
          <div key={index} className="card">
             <div className="card-container">
      <div className="card-image">
        <img src={card.card_image__c} alt="SBI Card PULSE" />
      </div>
      <div className="card-details">
        <h3>{card.card_name__c}</h3>
        <p>{card.card_description__c}</p>
        <div className="card-info">
          <div className="info-item">
            <span className="info-label">1st year Fees</span>
            <span className="info-value">{card.joining_fee_amount__c}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Best Suited for</span>
            <div className="info-icons">
              <i className="icon rewards"></i>
              <i className="icon shopping"></i>
              <i className="icon lifestyle"></i>
            </div>
          </div>
          <div className="info-item">
            <span className="info-label">Qualifying Criteria</span>
            <span className="info-value">Age: {card.age__c} Y min | Monthly income: ₹ {card.monthly_income__c} above</span>
          </div>
        </div>
        <div className="card-buttons">
          <button className="btn-secondary">Know More</button>
          <button className="btn-primary">Apply Now</button>
        </div>
      </div>
    </div>
          </div>
        ))}
      </div>
    )}
    {!isLoading && !error && creditCards.length === 0 && <p>No credit cards found.</p>}
  </div>
  );
}

export default App;
