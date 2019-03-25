import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CalculateCurrency from './containers/CalculateCurrency';

const App = () => {
  return(
    <PageWrapper>
      <CalculateCurrencyWrapper>
        <CalculateCurrency/>
      </CalculateCurrencyWrapper>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const CalculateCurrencyWrapper = styled.div`
  width: 60%;
  z-index: 1000;
`;

ReactDOM.render(<App />, document.querySelector('#root'));