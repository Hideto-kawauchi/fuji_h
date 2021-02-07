import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { auth, firestore } from '@/lib/firebase';
import { HospitalUser } from '@/types/hospitalUser';

const Index = () => {
  // router
  const { query } = useRouter();
  const hospitaluserId = decodeURIComponent(query.hospitaluserId as string).slice(0, -1);

  // state
  const [hospitalUser, setHospital] = useState<HospitalUser>();

  // init
  useEffect(() => {
    firestore.collection('hospitalUser').onSnapshot((collection) => {
      const data = collection.docs
        .filter((doc) => doc.id === hospitaluserId)
        .map((doc) => ({
          id: doc.id,
        }));
      setHospital({
        ...data[0],
        name: auth.currentUser?.displayName || '',
        tel: auth.currentUser?.phoneNumber || '',
      });
    });
  }, [hospitaluserId]);

  const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value != "string") return
    const value = event.target.value;
    setHospital((oldValue) => {
      return {
        ...oldValue,
        tel: value,
      }
    })
  }

  const addHospital = () => {
    console.log("更新が完了しました");
    firestore.collection('hospitalUser').add({
      id: hospitaluserId,
      name: auth.currentUser?.displayName || '',
      tel: hospitalUser?.tel || '',
    } as HospitalUser);
  };

  return (
    <div className="container">
      <div className="title">
        <h1>基本情報</h1>
      </div>
      <div style={{ height: '5rem' }}></div>
      <div className="button">
        <Link href="/hospital">
          <a className="top_button">topへ</a>
        </Link>
      </div>
      <div style={{ height: '5rem' }}></div>
      <div className="base">
        <div className="element_wrap">
          <label>ID</label>
          <input
            type="text"
            className="element"
            value={hospitaluserId}
          ></input>
        </div>
        <div className="element_wrap">
          <label>名前</label>
          <input
            type="text"
            className="element"
            value={hospitalUser?.name || ''}
          ></input>
        </div>
        <div className="element_wrap">
          <label>電話番号</label>
          <input
            name = "tel"
            type="text"
            className="element"
            value={hospitalUser?.tel || ''}
            onChange={handleTelChange}
          ></input>
        </div>
      </div>
      <div style={{ height: '5rem' }}></div>
            <div className="button">
                <a className="sub_button" onClick={addHospital}>登録</a>
            </div>
      <style jsx>{`
        .title{
          padding: 10px 0px 10px 0px;
          text-align: center;
          background-color: yellowgreen;
        }

        .base {
          display: flex;
          flex-direction: column;
        }

        .element_wrap{
          text-align: center;
        }

        .element_wrap input {
          margin: 20px;
        }

        .element {
          display: inline-block;
          padding: 10px;
        }

        .button{
          text-align: center;
        }

        .top_button{
          padding: 15px 40px;
          margin : 10px;
          background-color: #5dca88;
          cursor: pointer;
          border-radius: 4px;
        }

        .sub_button{
          padding: 15px 40px;
          margin : 10px;
          background-color: yellowgreen;
          cursor: pointer;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Index;
