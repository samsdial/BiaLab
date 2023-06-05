'use client';

import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Country } from './typings/types';
import Card from './components/Card';
import Input from './components/Input';
import Select from './components/Select';

const API_URL = 'https://restcountries.com/v3.1/all';

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [regionFilter, setRegionFilter] = useState<string>('');
  const [visibleItems, setVisibleItems] = useState(8);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const { data } = response;
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCountryClick = (country: Country) => {
    router.push(`/country/${country.name.common}`);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    // eslint-disable-next-line max-len
    const filtered = countries.filter((country) => country.name.common.toLowerCase()
      .includes(searchValue));
    setFilteredCountries(filtered);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = event.target.value;
    const filtered = selectedRegion
      ? countries.filter((country) => country.region === selectedRegion)
      : countries;
    setFilteredCountries(filtered);
    setRegionFilter(selectedRegion);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const {
      scrollTop,
      clientHeight,
      scrollHeight,
    } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      // El usuario ha llegado al final del contenedor, aumenta el número de elementos visibles
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
    }
  };

  return (

    <div>
      <h1>Countries</h1>
      <div>
        <Input onChange={handleSearch} />
        <Select value={regionFilter} onChange={handleFilter} />
      </div>
      <div onScroll={handleScroll} className="box-scroll">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-11">
          {filteredCountries.slice(0, visibleItems)
            .map((country) => (
              <li key={country.name.official}>
                <button type="button" onClick={() => handleCountryClick(country)}>
                  <Card country={country} />
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default Home;
