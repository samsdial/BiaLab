import React, { FC } from 'react';

interface PageProps {
  params: { name: string[]; };
}

const head: FC<PageProps> = ({ params }) => {
  conts [ name ] = params.name;

  return (
    <>
      <title>{name}</title>
    </>
  )
};
export default head;
