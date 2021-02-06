import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <div className="container">
      <h1>Home</h1>
      <div style={{ height: '5rem' }}></div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link href="/patient">
          <a>トップページ 患者</a>
        </Link>
        <Link href="/hospital">
          <a>トップページ 病院</a>
        </Link>
        <Link href="/interview/list">
          <a>Interview</a>
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column' }}></div>
        <Link href="/signupDoctor">
          <a>signupDoctor</a>
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column' }}></div>
        <Link href="/loginDoctor">
          <a>loginDoctor</a>
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column' }}></div>
        <Link href="/loginPatient">
          <a>loginPatient</a>
        </Link>
      </div>
      <style jsx>{``}</style>
    </div>
  );
};

export default Index;
