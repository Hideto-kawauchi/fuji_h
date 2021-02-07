import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { HospitalUser } from '@/types/hospitalUser';
import { firestore } from '@/lib/firebase';
import { formatYMD } from '@/utils/dateUtils';

const Index = () => {
  // state
  const [HospitalUserList, setHospitalUserList] = useState<HospitalUser[]>([]);

  // init
  useEffect(() => {
    firestore.collection('hospitalUser').onSnapshot((collection) => {
      const data = collection.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        tel: doc.data().tel,
      }));
      setHospitalUserList(data);
    });
  }, []);

  const addHospital = () => {
    firestore.collection('hospitalUser').add({
      name: 'hoge太郎',
      tel: '0473333333',
    } as HospitalUser);
  };

  return (
    <div className="container">
      <h1>基本情報</h1>
      <div style={{ height: '5rem' }}></div>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <div style={{ height: '5rem' }}></div>
      <div className="list">
        {HospitalUserList.map((hospitalUser) => (
          <Link
            key={hospitalUser.id}
            href={`/interview/${encodeURIComponent(hospitalUser.id)}}`}
          >
            <a>{`${hospitalUser.id}_${hospitalUser.name}_${hospitalUser.tel}`}</a>
          </Link>
        ))}
      </div>
      <div style={{ height: '5rem' }}></div>
      <div>
        <button onClick={addHospital}>demo値登録</button>
      </div>
      <style jsx>{`
        .list {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default Index;
