import React from 'react';
import ProfileHero from '../components/ProfileHero';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const TestProfileHero: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ProfileHero />
      </main>
      <Footer />
    </div>
  );
};

export default TestProfileHero; 