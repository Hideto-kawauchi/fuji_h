import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <div className="container">
      <div className="object">過去の診断情報 ＞カルテ選択</div>
      <div style={{ height: '5rem' }}></div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="subject">来院歴一覧 カルテを選択してください</div>
        <div className="subject">日付/病院/カルテID</div>
        <div style={{ height: '1rem' }}></div>
        <Link href="sindanreki\ID1">
          <button>2019.7 / OO病院 / ID:1</button>
        </Link>
        <Link href="sindanreki\ID2">
          <button>2020.7 / OO病院 / ID:2</button>
        </Link>
        <Link href="sindanreki\ID3">
          <button>2021.1 / OO病院 / ID:3</button>
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
