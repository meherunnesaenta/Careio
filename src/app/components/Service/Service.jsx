import { getService } from '@/actions/server/service';
import React from 'react';
import ServiceCard from '../Card/ServiceCard';

const Service = async() => {
    const services= await getService();
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {
            services.map(service=><ServiceCard key={service._id.toString()} service={service}></ServiceCard>)
        }
    </div>
  );
};

export default Service;