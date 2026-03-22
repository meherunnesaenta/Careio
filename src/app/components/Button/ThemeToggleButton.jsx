import React from 'react';
import ThemeToggle from '../ThemeToggle';

const ThemeToggleButton = () => {
    return (
        <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-bold">Care.xyz</h1>
            <ThemeToggle />
        </div>
    );
};

export default ThemeToggleButton;