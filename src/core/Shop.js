import React, {useEffect, useState} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';
import {getCategories} from '../admin/apiAdmin';
import CheckBox from './CheckBox';
import RadioBox from './RadioBox';
import {prices} from './fixedPrices';

const Shop = () => {
  const [myFilters, setMyFilters] = useState ({
    filters: {category: [], price: []},
  });
  const [categories, setCategories] = useState ([]);
  const [error, setError] = useState (false);

  const init = () => {
    getCategories ().then (data => {
      if (data.error) {
        setError (data.error);
      } else {
        setCategories (data);
      }
    });
  };

  useEffect (() => {
    init ();
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = {...myFilters};
    newFilters.filters[filterBy] = filters;
    if (filterBy === 'price') {
      let priceValues = handlePrice (filters);
      newFilters.filters[filterBy] = priceValues;
    }
    setMyFilters (newFilters);
  };

  const handlePrice = value => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt (value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Shop Page"
      description="Search and find Product of your choice"
      className="container-fluid"
    >

      <div className="row">
        <div className="col-4">
          <h4>Filter by Categories</h4>
          <ul>
            <CheckBox
              categories={categories}
              handleFilters={filters => handleFilters (filters, 'category')}
            />
          </ul>
          <h4>Filter by Price Range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={filters => handleFilters (filters, 'price')}
            />
          </div>
        </div>
        <div className="col-8">{JSON.stringify (myFilters)}</div>
      </div>

    </Layout>
  );
};

export default Shop;
