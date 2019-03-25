import React, { useState } from 'react';
import styled from 'styled-components';
import {useFetchCurrencyData} from '../hooks/useCurrencyApi';


const DEFAULT_CURRENCIES = [
  'IDR',
  'JPY',
  'GBP',
];

function CalculateCurrency() {
  const [baseValue, setBaseValue] = useState(10);
  const [activeCurrencies, setActiveCurrencies] = useState(DEFAULT_CURRENCIES);
  const [isActive, setIsActive] = useState(false);
  const { currencies } = useFetchCurrencyData();
  const NumberFormat = require('react-number-format'); 

  return (  
    <Container>
      <BaseCurrency>
        <div className='column1'>
          <h1><i>USD - United State Dollars</i></h1>
          <h1> USD </h1>
        </div>
        <div className='column2'>
          <input type='text' value={baseValue} onChange={event => setBaseValue(event.target.value)}/>
        </div>
       </BaseCurrency>
        {currencies.filter(currency => activeCurrencies.indexOf(currency.currency) > -1).map(currency => (
          <Wrapper>
            <div className='column1'> 
              <h1><NumberFormat style={{float: 'right', fontSize: '2rem'}} value={currency.value * baseValue} thousandSeparator={true} displayType={'text'}/></h1>
              <h1> {currency.currency} </h1>
              <h2> {currency.currency} - {currency.fullNameCurrency}</h2>
              <h2>1 USD = {currency.currency} <NumberFormat value={currency.value} thousandSeparator={true} displayType={'text'}></NumberFormat></h2>
            </div>
            <div className='column2'> 
              <Button onClick={() => {
                setActiveCurrencies([
                  ...activeCurrencies.slice(0, activeCurrencies.indexOf(currency.currency)),
                  ...activeCurrencies.slice(activeCurrencies.indexOf(currency.currency) + 1),
                ]);
              }}> (-) </Button>
            </div>
          </Wrapper>
        ))}
        <div className="content">
        <button className ="addMoreCurrencies" onClick={() => setIsActive(true)}> (+) Add More Currencies </button>
          <Dropdown className="overlay" isActive={isActive}>
            {currencies.filter(currency => activeCurrencies.indexOf(currency.currency) === -1).map(currency => (
              <button className="overlayItem" onClick={() => {setActiveCurrencies([...activeCurrencies, currency.currency]); setIsActive(false)}}>{currency.currency}</button>
            ))}
          </Dropdown>
        </div>
    </Container>
  )
}


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
  align-items: center;
  align-content: center;
  border: 0.25rem solid #000000;

  .content {
    width: 100%;
    display: flex;
    flex-flow: wrap row;
    justify-content: center;
    align-items: center;
    align-content: center;
    .addMoreCurrencies {
      width: 70%;
      display: flex;
      flex-flow: wrap row;
      justify-content: center;
      align-items: center;
      align-content: center;
      border: 0.25rem solid #000000;
      font-size: 2rem;

      &:hover {
        cursor: pointer;
        background-color: #cccccc ;
      }
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: wrap row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin: 1rem 1rem 1rem 1rem;
  border: 0.25rem solid #000000;
  
  .column1 {
    width: calc(92% - 1rem)
  }

  .column2 {
    width: calc(8% - 1rem)
  }
`;

const BaseCurrency = styled.div`
  width: 100%;
  display: flex;
  flex-flow: wrap row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  border-bottom: 0.2rem solid #000000;

  .column1 {
    width: calc(40%-1rem);
    margin: 0 0 0 1rem;
  }

  .column2 {
    width: calc(60%-1rem);
    margin: 4rem 5rem 0 3rem;

    input {
      font-size: 1.5rem;
      width: 7rem;
      border: 0.2rem solid #000000;
  }
`;

const Button = styled.button `
  background-color: #ffffff
  border: 0.2rem solid #000000;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 2rem;
  padding: 4.25rem 1rem 4.25rem 1rem;
`;

const Dropdown = styled.div`
  position: relative;
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 0 0 0 0;
  padding: 0 3rem 0 3rem;
  transition: visibility 0.5s;
  visibility: ${props => props.isActive === true ? 'visible' : 'hidden'};
    
  .overlayItem {
    font-size: 2rem;
    font-color: #000000;
    line-height: 1rem;
    width: 81%;
    background: transparent;
    display: flex;
    flex-flow: wrap row;
    justify-content: center;
    align-items: center;
    align-content: center;
    cursor: pointer;
    margin: 0.2rem 0 0.25rem 0;
    padding: 0.5rem 1rem;
    border: 0.25rem solid #000000;
    
    &:hover {
      background: #cccccc;
    }
  }
`;



export default CalculateCurrency;