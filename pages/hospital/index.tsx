import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <div className="container">
      <div className = "object">oo病院様用　メニュー</div>
      <div style={{ height: '5rem' }}></div>
      <div style={{ display: "flex", flexDirection: "column"}}>
       <Link href="/kihon">
          <button>基本情報</button>
        </Link>
        <Link href="/patient/reserve">
          <button>本日の予約一覧</button>
        </Link>
        <Link href="/kako">
          <button>過去の予約歴</button>
        </Link>
      </div>
　　　<style jsx>{`
       .object{
        background-color:#C4DFE6;color:white;
       }
       button {
          background-color: #66A5AD;color:white;
        }
       `}
      </style>
    </div>
  );
};

export default Index;
