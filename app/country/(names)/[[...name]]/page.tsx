import React, { FC } from 'react';
import Link from 'next/link';
import Description from '../../../components/Description';
import Button from '../../../components/Button';

interface PageProps {
  params: { name: string; };
}

const page: FC<PageProps> = ({ params }) => {
  const description = (
    <Description params={params} />
  );
  return (
    <div>
      <div className="px-0 py-7 p-lg-7">
        <div className="container mx-auto">
          <div className="flex justify-start w-10/12 md:w-10/12 lg:w-full mx-auto  justify-between">
            <Link href="/"><Button arrow arrowDown={false} arrowLeft>Back</Button></Link>
          </div>
        </div>
      </div>
      {description}
    </div>
  );
};
export default page;
