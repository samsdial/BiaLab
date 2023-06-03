'use client';

import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

export type Country = {
  name: Name;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Currencies;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Languages;
  translations: { [key: string]: Translation };
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  gini: Gini;
  fifa: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
};

export type CapitalInfo = {
  latlng: number[];
};

export type Car = {
  signs: string[];
  side: string;
};

export type CoatOfArms = {
  png: string;
  svg: string;
};

export type Currencies = {
  JOD: Jod;
};

export type Jod = {
  name: string;
  symbol: string;
};

export type Demonyms = {
  eng: Eng;
  fra: Eng;
};

export type Eng = {
  f: string;
  m: string;
};

export type Flags = {
  png: string;
  svg: string;
  alt: string;
};

export type Gini = {
  '2010': number;
};

export type Idd = {
  root: string;
  suffixes: string[];
};

export type Languages = {
  ara: string;
};

export type Maps = {
  googleMaps: string;
  openStreetMaps: string;
};

export type Name = {
  common: string;
  official: string;
  nativeName: NativeName;
};

export type NativeName = {
  ara: Translation;
};

export type Translation = {
  official: string;
  common: string;
};

export type PostalCode = {
  format: string;
  regex: string;
};

const API_URL = 'https://restcountries.com/v3.1/all';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [regionFilter, setRegionFilter] = useState<string>('');

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    // eslint-disable-next-line max-len
    const filtered = countries.filter((country) => country.name.common.toLowerCase().includes(searchValue));
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

  console.log(filteredCountries);

  return (

    <div>
      <h1>Countries</h1>
      <div>
        <input type="text" placeholder="Search..." onChange={handleSearch} />
        <select value={regionFilter} onChange={handleFilter}>
          <option value="">All regions</option>
          <option value="Americas">Americas</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          {/* Add more regions as needed */}
        </select>
      </div>
      <ul>
        {filteredCountries.slice(0, 8).map((country) => (
          <li key={country.name.official}>

            <img src={country.flags.png} alt={country.name.common} />
            {country.name.common}
            {' '}
            -
            {' '}
            {country.region}
          </li>
        ))}
      </ul>
    </div>
  );
}
