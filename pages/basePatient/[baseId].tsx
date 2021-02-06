import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { auth, firestore } from '@/lib/firebase';
import { Base } from '@/types/base';

const Index = () => {
  // router
  const { query } = useRouter();
  const baseId = decodeURIComponent(query.baseId as string).slice(0, -1);

  // state
  const [base, setBase] = useState<Base>();

  // init
  useEffect(() => {
    firestore.collection('base').onSnapshot((collection) => {
      const data = collection.docs
        .filter((doc) => doc.id === baseId)
        .map((doc) => ({
          id: doc.id,
          gender: doc.data().gender,
          birthDate: doc.data().birthDate ? doc.data().birthDate : '',
        }));
      setBase({
        ...data[0],
        name: auth.currentUser?.displayName || '',
        tel: auth.currentUser?.phoneNumber || '',
      });
    });
  }, [baseId]);

  return (
    <div className="container">
      <h1>基本情報</h1>
      <div style={{ height: '5rem' }}></div>
      <div>
        <Link href="/">
          <a>topへ</a>
        </Link>
      </div>
      <div style={{ height: '5rem' }}></div>
      <div className="base">
        <div className="element_wrap">
          <label>ID</label>
          <input
            type="text"
            disabled
            className="element"
            value={baseId}
          ></input>
        </div>
        <div className="element_wrap">
          <label>名前</label>
          <input
            type="text"
            disabled
            className="element"
            value={base?.name || ''}
          ></input>
        </div>
        <div className="element_wrap">
          <label>性別</label>
          <input
            type="text"
            disabled
            className="element"
            value={base?.gender || ''}
          ></input>
        </div>
        <div className="element_wrap">
          <label>年齢</label>
          <input
            type="text"
            disabled
            className="element"
            value={base?.birthDate || ''}
          ></input>
        </div>
        <div className="element_wrap">
          <label>電話番号</label>
          <input
            type="text"
            disabled
            className="element"
            value={base?.tel || ''}
          ></input>
        </div>
      </div>
      <style jsx>{`
        .base {
          display: flex;
          flex-direction: column;
        }

        .element_wrap input {
          margin: 20px;
        }

        .element {
          display: inline-block;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default Index;
