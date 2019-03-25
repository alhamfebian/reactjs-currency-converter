import {useState,useEffect} from 'react';
import axios from 'axios';

const BASE_URL = 'https://api.exchangeratesapi.io/latest?base=USD';

const SUPPORTED_CURRENCIES = [
  'CAD',
  'CHF',
  'IDR',
  'GBP',
  'USD',
  'SGD',
  'INR',
  'MYR',
  'JPY',
  'KRW'
]

  
export function useFetchCurrencyData() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(
    async () => {
      const result = await axios.get(`${BASE_URL}`);
      const stateCurrency = result.data.rates;
      const currencyFullName = [
      'Canada Dollar', 
      'United State Dollar',
      'Switzerland Franc',
      'Japan Yen',
      'Malaysia Ringgit',
      'Indonesian Rupiah',
      'Great Britain Pound',
      'Singapore Dollar',
      'India Rupee',
      'South Korea Won'
    ];
      setCurrencies(
        Object.keys(stateCurrency)
          .filter(currencyResult => SUPPORTED_CURRENCIES.indexOf(currencyResult) > -1)
          .map((currencyResult, currencyIndex) => ({ currency: currencyResult, value: stateCurrency[currencyResult], fullNameCurrency: currencyFullName[currencyIndex]}))
      );

    },
    []
  );

  return {
    currencies,
  }
}