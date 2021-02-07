import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <div className="container">
      <div className="object">マイページ ooさん</div>
      <div style={{ height: '5rem' }}></div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link href="/kihon">
          <button>基本情報</button>
        </Link>
        <Link href="/patient/reserve">
          <button>病院予約</button>
        </Link>
        <Link href="/patient/sindanreki">
          <button>過去の診断情報・薬歴</button>
        </Link>
      </div>

      <style jsx>
        {`
          .object {
            background-color: #c4dfe6;
            color: white;
          }
          button {
            background-color: #66a5ad;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default Index;
