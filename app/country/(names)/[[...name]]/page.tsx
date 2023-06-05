'use client';

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
// import { useRouter } from "next/navigation";
import Link from 'next/link';
import Description from '../../../components/Description';
import Button from '../../../components/Button';
import { Country } from '../../../typings/types';

interface PageProps {
  params: { name: string; };
}

const page: FC<PageProps> = ({ params }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [country, setCountry] = useState<Country[] | []>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const router = useRouter();
  // const { name } = router.query || {};

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
  return (
    <div>
      <div className="px-0 py-7 p-lg-7">
        <div className="container mx-auto">
          <div className="flex justify-start w-10/12 md:w-10/12 lg:w-full mx-auto  justify-between">
            <Link href="/"><Button onClick={() => ('')} arrow arrowDown={false} arrowLeft>Back</Button></Link>
          </div>
        </div>
      </div>
      <Description country={country} />
    </div>
  );
};
export default page;
