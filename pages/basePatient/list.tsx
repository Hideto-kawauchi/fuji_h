import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Base } from '@/types/base';
import { firestore } from '@/lib/firebase';
import { formatYMD } from '@/utils/dateUtils';

const Index = () => {
  // state
  const [baseList, setBaseList] = useState<Base[]>([]);

  // init
  useEffect(() => {
    firestore.collection('base').onSnapshot((collection) => {
      const data = collection.docs.map(
        (doc) =>
          ({
            id: doc.id,
            name: doc.data().name,
            gender: doc.data().gender,
            age: doc.data().age,
            tel: doc.data().tel,
            birthDate: doc.data().date ? doc.data().date : '',
          } as Base)
      );
      setBaseList(data);
    });
  }, []);

  const addBase = () => {
    firestore.collection('base').add({
      name: 'src',
      gender: '男',
      age: 12,
      tel: '09000000001',
      date: formatYMD(new Date()),
    });
  };

  return (
    <div className="contain">
      <div className="container">
        <h1>基本情報</h1>
        <div style={{ height: '5rem' }}></div>
        <div className="top">
          <Link href="/">
            <a>main</a>
          </Link>
        </div>
        <div style={{ height: '5rem' }}></div>
        <div className="lists">
          {baseList.map((base, i) => (
            <div key={i} className="base">
              <div className="element_wrap">
                <label>ID</label>
                <p className="element">{`${base.id}`}</p>
              </div>
              <div className="element_wrap">
                <label>名前</label>
                <p className="element">{`${base.name}`}</p>
              </div>
              <div className="element_wrap">
                <label>性別</label>
                <p className="element">{`${base.gender}`}</p>
              </div>
              <div className="element_wrap">
                <label>生年月日</label>
                <p className="element">{`${base.birthDate}`}</p>
              </div>
              <div className="element_wrap">
                <label>電話番号</label>
                <p className="element">{`${base.tel}`}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: '5rem' }}></div>
        <div>
          <button onClick={addBase}>demo値登録</button>
        </div>
        <style jsx>{`
          .list {
            display: flex;
            flex-direction: column;
          }

          .element-wrap {
            float: left;
          }

          .element {
            display: inline-block;
          }

          /*.element{
                  float: left;
                }*/
        `}</style>
        <div className="editer">
          <a href="/basePatient/edit">編集</a>
        </div>
      </div>
    </div>
  );
};

export default Index;
