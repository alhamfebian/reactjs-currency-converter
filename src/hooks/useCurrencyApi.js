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
      'Japan Yen', 
      'Switzerland Franc',
      'United State Dollar',
      'Canada Dollar',
      'South Korean Won',
      'Singapore Dollar',
      'Malaysia Ringgit',
      'Great Britain Pound',
      'Indonesian Rupiah',
      'India Rupee'
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