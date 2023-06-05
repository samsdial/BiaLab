import React, { FC } from 'react';
import { Country } from '../typings/types';

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
    <article className="card w-full rounded overflow-hidden h-full shadow-lg">
      <figure className="overflow-hidden h-[170px] position-relative">
        <img className="position-absolute w-full" src={imageUrl} alt={alt} />
      </figure>
      <div className="flex items-stretch px-6 pt-7 pb-12">
        <div>
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-base">
            <span className="font-medium">Population:</span>
            <span className="font-extralight ml-2">{population}</span>
          </p>
          <p className="text-base">
            <span className="font-medium">Region:</span>
            <span className="font-extralight ml-2">{region}</span>
          </p>
          <p className="text-base">
            <span className="font-medium">Capital:</span>
            <span className="font-extralight ml-2">{capital}</span>
          </p>
        </div>
      </div>
    </article>
  );
};
export default Card;
