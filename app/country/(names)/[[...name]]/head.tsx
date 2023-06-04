import React, { FC, Fragment } from 'react';

interface PageProps {
  params: { name: string[]; };
}

const head: FC<PageProps> = ({ params }) => {
  const [name] = params.name;

  return (
    <Fragment>
      <title>{name}</title>
    </Fragment>
  );
};
export default head;
