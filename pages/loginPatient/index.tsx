import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <div className="container">
      <h1>loginPatient</h1>
      <div style={{ height: '5rem' }}></div>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <style jsx>{``}</style>
    </div>
  );
};

export default Index;
