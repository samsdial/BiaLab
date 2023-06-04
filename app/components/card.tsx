import React, { FC } from 'react';
import { Country } from '../typings/typesgit ';

interface PageProps {
  // eslint-disable-next-line react/no-unused-prop-types
  country: Country;
}

const Card: FC<PageProps> = ({ country }) => {
  const name = country?.name?.common || '';
  const population = country?.population || '';
  const region = country?.region || '';
  const capital = country?.capital || '';
  const flags = country?.flags || {};
  const { png, svg, alt } = flags;
  const imageUrl = png || svg || '';
  return (

      <div className="max-w-sm rounded overflow-hidden h-full shadow-lg">
        <img className="w-fluid" src={imageUrl} alt={alt} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">
            Population:
            {' '}
            {population}
          </p>
          <p className="text-gray-700 text-base">
            Region:
            {' '}
            {region}
          </p>
          <p className="text-gray-700 text-base">
            Capital:
            {' '}
            {capital}
          </p>
        </div>
      </div>
  );
};
export default Card;
