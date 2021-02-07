import React from 'react';
import Link from 'next/link';

import { auth } from '@/lib/firebase';

const Index = () => {
  if (!auth.currentUser) return null
  return (
    <div className="container">
      <div className="object">oo病院様用 メニュー</div>
      <div style={{ height: '5rem' }}></div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link href={`/baseHospital/${auth.currentUser?.uid}`}>
          <button>基本情報</button>
        </Link>
        <Link href="/patient/reserve">
          <button>本日の予約一覧</button>
        </Link>
        <Link href="/kako">
          <button>過去の予約歴</button>
        </Link>
      </div>

      <style jsx>
        {`
          button {
            background-color: #66a5ad;
            color: white;
          }

          .object {
            background-color: #c4dfe6;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default Index;
