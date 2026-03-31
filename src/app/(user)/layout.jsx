import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const UserLayout = ({ children }) => {
    return (
        <div>
            <header className="w-11/12 mx-auto p-2">
                <Navbar></Navbar>
            </header>
            <main className="w-11/12 mx-auto p-2" >
                {children}
            </main>
            <footer >
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default UserLayout;