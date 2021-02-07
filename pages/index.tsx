import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <div className="container">
      <h1>Home</h1>
      <div style={{ height: '5rem' }}></div>
      <div style={{ display: "flex", flexDirection: "column"}}>
        <Link href="/patient">
          <a>マイページ　患者</a>
        </Link>
        <Link href="/hospital">
          <a>マイページ　病院</a>
        </Link>
        <Link href="/interview/list">
          <a>Interview</a>
        </Link>
      </div>
      <style jsx>{``}</style>
    </div>
  );
};

export default Index;
