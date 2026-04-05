import UpdateServices from '@/app/components/DashBoard/UpdateServices';
import React from 'react';

const Update = async({params}) => {

  const { id} = await params;
  console.log(id);

  return <UpdateServices id={id} />;
};

export default Update;