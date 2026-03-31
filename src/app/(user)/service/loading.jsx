import { getService } from '@/actions/server/service';
import ServiceCardSkeleton from '@/app/components/skeleton/ServiceCardSkeleton';
import React from 'react';


const loading = async() => {
    const services=await getService()
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {
            services.map(service=><ServiceCardSkeleton key={service._id} service={service}></ServiceCardSkeleton >)
        }
    </div>
  );
};

export default loading;