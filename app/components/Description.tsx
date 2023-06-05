'use client';

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Country } from '../typings/types';

interface DesciptionProps {
  // eslint-disable-next-line react/no-unused-prop-types
  params: {
    name: string;
  }[];
}

const Description: FC<DesciptionProps> = ({ params }) => {
  const [country, setCountry] = useState<Country[] | []>([]);

  const Name = params?.name || '';
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${Name}?fullText=true`);
        const { data } = response;
        setCountry(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (params.name) {
      fetchData();
    }
  }, [params.name]);

  if (!country) {
    return <div>loading...</div>;
  }
  const countryName = country[0]?.name?.common || '';
  const nativeNameArray = country[0]?.name?.nativeName || {};
  const nativeName = Object.entries(nativeNameArray).map(([key, value]) => {
    const { common, official } = value;
    return `<span id="${key}">${official} - ${common}</span>`;
  });
  const lanArray = country[0]?.languages || {};
  const lang = Object.entries(lanArray)
    .map(([key, value]) => `<span id="${key}">${value}</span>`)
    .join('<span class="none">,</span> ');
  const bordersArray = country[0]?.borders || [];
  const border = Object.entries(bordersArray)
    .map(([key, value]) => `<span class="shadow inline-block px-3 py-1" id="${key}">${value}</span>`)
    .join('<span class="hidden">,</span> ');
  const currenciesArray = country[0]?.currencies || {};
  const currencies = Object.entries(currenciesArray).map(([key, value]) => {
    const { name, symbol } = value;
    return `${key}: ${name} - ${symbol}`;
  });
  const topLevelDomain = country[0]?.tld[0] || '';
  const capitalArray = country[0]?.capital || {};
  const capital = Object.entries(capitalArray)
    .map(([key, value]) => `<span id="${key}">${value}</span>`)
    .join('<span class="none">,</span> ');
  const subRegion = country[0]?.subregion || '';
  const region = country[0]?.region || '';
  const population = country[0]?.population || '';
  const formattedPopulation = population.toLocaleString('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  const flags = country[0]?.flags || {};
  const { png, svg, alt } = flags;
  const imageUrl = png || svg || '';
  return (
    <div className="country flex flex-col md:flex-row w-10/12 md:w-full gap-8 md:gap-9 lg:gap-20 mx-auto my-9">
      <figure className="w-full md:w-6/12">
        <img className="w-full" src={imageUrl} alt={alt} />
      </figure>
      <div className="w-full md:w-6/12">
        <h1 className="text-2xl font-bold mb-3">{countryName}</h1>
        <div className="flex flex-col lg:flex-row gap-0 md:gap-8">
          <div>
            <p className="mb-2">
              <span className="font-medium">Native name:</span>
              <span className="font-light ml-2" dangerouslySetInnerHTML={{ __html: nativeName }} />
            </p>
            <p className="mb-2">
              <span className="font-medium">Population:</span>
              <span className="font-light ml-2">{formattedPopulation}</span>
            </p>
            <p className="mb-2">
              <span className="font-medium">Currencies:</span>
              <span className="font-light ml-2">{currencies}</span>
            </p>
            <p className="mb-2">
              <span className="font-medium">Region:</span>
              <span className="font-light ml-2">{region}</span>
            </p>
            <p className="mb-2">
              <span className="font-medium">Subregion:</span>
              <span className="font-light ml-2">{subRegion}</span>
            </p>
            <p className="mb-2">
              <span className="font-medium">Capital:</span>
              <span className="font-light ml-2" dangerouslySetInnerHTML={{ __html: capital }} />
            </p>
          </div>
          <div>
            <p className="mb-2">
              <span className="font-medium">Top level domain:</span>
              <span className="font-light ml-2">{topLevelDomain}</span>
            </p>
            <p className="mb-2">
              <span className="font-medium">Languages:</span>
              <span className="font-light ml-2" dangerouslySetInnerHTML={{ __html: lang }} />
            </p>
          </div>
        </div>
        {bordersArray.length > 0 && (
          <div className="flex flex-col md:flex-row mt-4 mb-3">
            <h1 className="text-sm font-bold mr-2 mb-3">Border Countries:</h1>
            <div className="box-span w-full md:w-9/12" dangerouslySetInnerHTML={{ __html: border }} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Description;
