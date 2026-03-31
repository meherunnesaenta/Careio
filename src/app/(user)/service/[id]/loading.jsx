import React from 'react';

const loading = () => {
    return (
        <div className="container-custom py-10 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                {/* 🔹 Image Skeleton */}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                    <div className="w-full h-[350px] bg-base-300"></div>
                </div>

                {/* 🔹 Content Skeleton */}
                <div>
                    {/* Category */}
                    <div className="h-5 w-20 bg-base-300 rounded mb-3"></div>

                    {/* Title */}
                    <div className="h-8 w-3/4 bg-base-300 rounded mb-3"></div>

                    {/* Short Description */}
                    <div className="h-4 w-full bg-base-300 rounded mb-2"></div>
                    <div className="h-4 w-5/6 bg-base-300 rounded mb-4"></div>

                    {/* Price */}
                    <div className="h-6 w-24 bg-base-300 rounded mb-6"></div>

                    {/* Features Box */}
                    <div className="bg-base-200 p-5 rounded-xl mb-6 space-y-3">
                        <div className="h-5 w-40 bg-base-300 rounded"></div>

                        <div className="space-y-2">
                            <div className="h-4 w-5/6 bg-base-300 rounded"></div>
                            <div className="h-4 w-4/6 bg-base-300 rounded"></div>
                            <div className="h-4 w-3/6 bg-base-300 rounded"></div>
                            <div className="h-4 w-4/6 bg-base-300 rounded"></div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2 mb-6">
                        <div className="h-4 w-full bg-base-300 rounded"></div>
                        <div className="h-4 w-5/6 bg-base-300 rounded"></div>
                        <div className="h-4 w-4/6 bg-base-300 rounded"></div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <div className="h-10 w-28 bg-base-300 rounded"></div>
                        <div className="h-10 w-28 bg-base-300 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default loading;