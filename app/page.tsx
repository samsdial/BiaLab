'use client';

import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Country } from './typings/types';
import Card from './components/Card';
import Input from './components/Input';
import Select from './components/Select';
import Button from './components/Button';

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

  const handleSeeMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };
  const lengthCountries = filteredCountries.length >= 8;
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-content-between align-items-center w-10/12 md:w-10/12 lg:w-full mx-auto py-9 xl:px-0">
        <div className="block w-full md:w-6/12">
          <Input onChange={handleSearch} />
        </div>
        <div className="block w-6/12">
          <Select value={regionFilter} onChange={handleFilter} />
        </div>
      </div>
      <div className="w-8/12 md:w-10/12 lg:w-full mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 sm:gap-4 md:gap-8 lg:gap-12">
          {filteredCountries.slice(0, visibleItems)
            .map((country) => (
              <li className="relative" key={country.name.official}>
                <Card country={country} />
                <button type="button" className="btn-ghost w-full" onClick={() => handleCountryClick(country)}>card</button>
              </li>
            ))}
        </ul>
        {lengthCountries && (
          <div className="flex justify-center my-12">
            <Button onClick={handleSeeMore} arrow arrowDown arrowLeft={false}>See more</Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
