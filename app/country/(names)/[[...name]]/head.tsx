import React, { FC } from 'react';

interface PageProps {
  params: { name: string[]; };
}

const head: FC<PageProps> = ({ params }) => {
  const [name] = params.name;

  return (
    <head>
      <title>{name}</title>
    </head>
  );
};
export default head;
