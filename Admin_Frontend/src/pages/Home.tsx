// src/Home.tsx
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="home-container flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to the Home Page</h1>
      <p className="text-lg text-gray-600 mt-4">
        This is the home page of your application. Navigate using the links above to explore other pages.
      </p>
    </div>
  );
};

export default Home;
