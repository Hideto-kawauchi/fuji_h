import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <div className="container">
      <h1>トップページ 患者</h1>
      <div style={{ height: '5rem' }}></div>
      <div>
        <Link href="/interview/list">
          <a>Interview</a>
        </Link>
      </div>
      <style jsx>{``}</style>
    </div>
  );
};

export default Index;
