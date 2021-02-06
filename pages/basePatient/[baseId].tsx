import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { firestore } from '@/lib/firebase';
import { BASE } from '@/types/base';

const Index = () => {
  // router
  const { query } = useRouter();
  const baseId = decodeURIComponent(query.baseId as string).slice(
    0,
    -1
  );

  // state
  const [base, setBase] = useState<BASE>();

  // init
  useEffect(() => {
    firestore.collection('base').onSnapshot((collection) => {
      const data = collection.docs
        .filter((doc) => doc.id === baseId)
        .map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          gender: doc.data().gender,
          age: doc.data().age,
          tel: doc.data().tel,
          date: doc.data().date ? doc.data().date : '',
        }));
      setBase(data[0]);
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
      <div className="lists">
                {baseList.map((base) => (

                    <div className="base">
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
                            <label>年齢</label>
                            <p className="element">{`${base.age}`}</p>
                        </div>
                        <div className="element_wrap">
                            <label>電話番号</label>
                            <p className="element">{`${base.tel}`}</p>
                        </div>
                    </div>
                ))}
        </div>
      <style jsx>{`
        .list {
            display: flex;
            flex-direction: column;
        }

        .element-wrap{
            float: left;
            padding: 20px;
        }

        .element{
            display: inline-block;
            padding: 10px;
        }

        `}</style>
    </div>
  );
};

export default Index;
