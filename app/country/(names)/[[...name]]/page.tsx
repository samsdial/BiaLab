'use client';

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { Country } from '../../../typings/types';

interface PageProps {
  params: { name: string; };
}

const page: FC<PageProps> = ({ params }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [country, setCountry] = useState<Country[] | []>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { name } = router.query || {};

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${params.name}?fullText=true`);
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
  const nativeName = Object.keys(nativeNameArray).map((key) => {
    const {
      common: common1,
      official: official1,
    } = nativeNameArray[key] || '';
    const official = official1 || '';
    const common = common1 || '';
    return `<span id="${key}">${official} - ${common}</span>`;
  });
  const lanArray = country[0]?.languages || {};
  const lang = Object.entries(lanArray)
    .map(([key, value]) => `<span id="${key}">${value}</span>`)
    .join(', ');
  const bordersArray = country[0]?.borders || [];
  const border = Object.entries(bordersArray)
    .map(([key, value]) => `<span id="${key}">${value}</span>`)
    .join(', ');
  const currenciesArray = country[0]?.currencies || {};
  const currencies = Object.keys(currenciesArray).map((key) => {
    const currency = currenciesArray[key];
    const { name, symbol } = currency;
    return `${key}: ${name} - ${symbol}`;
  });
  const topLevelDomain = country[0]?.tld[0] || '';
  const capitalArray = country[0]?.capital || {};
  const capital = Object.entries(capitalArray)
    .map(([key, value]) => `<span id="${key}">${value}</span>`)
    .join(', ');
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
    <div>
      <img src={imageUrl} alt={alt} />
      <h1>{countryName}</h1>
      <p dangerouslySetInnerHTML={{ __html: nativeName }} />
      <p>{formattedPopulation}</p>
      <p>{currencies}</p>
      <p>{region}</p>
      <p>{subRegion}</p>
      <p dangerouslySetInnerHTML={{ __html: capital }} />
      <p>{topLevelDomain}</p>
      <p dangerouslySetInnerHTML={{ __html: lang }} />
      <div dangerouslySetInnerHTML={{ __html: border }} />
    </div>
  );
};
export default page;
