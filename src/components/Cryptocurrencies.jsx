import React, { useState, useEffect } from 'react'
// millify stands for Converts long numbers into pretty, human-readable strings.
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import Loader from './Loader';

import { useGetCryptosQuery } from '../services/cryptoApi';
// simplified props in home page
const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10: 100;
  // data: renamed to cryptosList
  const {data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
 
  useEffect(() => {
      const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

      setCryptos(filteredData);

  },[cryptosList, searchTerm]);

  if(isFetching) return <Loader />;

  return (
    <> 
      {!simplified && (
      <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      )}
       <Row gutter={[32, 32]} className="crypto-cards-container">
          {/* Add question mark in crypto in case fetched data is undefined for it to run */}
          {cryptos?.map((currency) => (
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
              <Link to={`/crypto/${currency.uuid}`}>
                  <Card 
                  title={`${currency.rank}.${currency.name}`}
                  extra={<img className="crypto-image" src={currency.iconUrl}/>}
                  hoverable
                  >
                    <p>Price: {millify(currency.price)}</p>
                    <p>Market Cap: {millify(currency.marketCap)}</p>
                    <p>Daily Change: {millify(currency.change)}</p>
                  </Card>
              </Link>
            </Col>
          ))}
        </Row>
    </>
  )
}

export default Cryptocurrencies