import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <div className="container">
      <div className="object">病院予約&gt;病院選択</div>
      <div style={{ height: '5rem' }}></div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="subject">病院一覧 病院を選択してください</div>
        <div style={{ height: '1rem' }}></div>
        <Link href="/ahospital">
          <button>A病院</button>
        </Link>
        <Link href="/bhospital">
          <button>B病院</button>
        </Link>
        <Link href="/chospital">
          <button>C病院</button>
        </Link>
        <div style={{ height: '10rem' }}></div>
        <Link href="/patient">
          <a>メニューに戻る</a>
        </Link>
      </div>
      <style jsx>{`
        .object {
          background-color: #c4dfe6;
          color: white;
        }
        .subject {
          background-color: #66a5ad;
          color: white;
          text-align: center;
        }
        button {
          background-color: #b1d9d3;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Index;
