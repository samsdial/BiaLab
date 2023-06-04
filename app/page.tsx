'use client';

import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Country } from './typings/types';
import Card from './components/card';

const API_URL = 'https://restcountries.com/v3.1/all';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [regionFilter, setRegionFilter] = useState<string>('');
  const [visibleItems, setVisibleItems] = useState(8);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const {data} = response;

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
        <input type="text" placeholder="Search..." onChange={handleSearch}/>
        <select value={regionFilter} onChange={handleFilter}>
          <option value="">All regions</option>
          <option value="Americas">Americas</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          {/* Add more regions as needed */}
        </select>
      </div>
      <div onScroll={handleScroll} style={{
        maxHeight: '70vh',
        overflow: 'auto',
      }}>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-11">
          {filteredCountries.slice(0, visibleItems)
            .map((country) => (
              <li key={country.name.official}>
                <a onClick={() => handleCountryClick(country)}>
                  <Card country={country} />
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
