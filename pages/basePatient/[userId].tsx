import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { auth, firestore } from '@/lib/firebase';
import { PatientUser } from '@/types/patientUser';

const Index = () => {
  // router
  const { query } = useRouter();
  const userId = decodeURIComponent(query.userId as string).slice(0, -1);

  // state
  const [patientUser, setPatient] = useState<PatientUser>();

  // init
  useEffect(() => {
    firestore.collection('base').onSnapshot((collection) => {
      const data = collection.docs
        .filter((doc) => doc.id === userId)
        .map((doc) => ({
          id: doc.id,
          gender: doc.data().gender,
          birthDate: doc.data().birthDate ? doc.data().birthDate : '',
        }));
      setPatient({
        ...data[0],
        name: auth.currentUser?.displayName || '',
        tel: auth.currentUser?.phoneNumber || '',
      });
    });
  }, [userId]);

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value != "string") return
    const value = event.target.value;
    setPatient((oldValue) => {
      return {
        ...oldValue,
        gender: value,
      }
    })
  }

  const handlebirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value != "string") return
    const value = event.target.value;
    setPatient((oldValue) => {
      return {
        ...oldValue,
        birthDate: value,
      }
    })
  }

  const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value != "string") return
    const value = event.target.value;
    setPatient((oldValue) => {
      return {
        ...oldValue,
        tel: value,
      }
    })
  }

  const addBase = () => {
    firestore.collection('base').add({
      id: userId,
      name: auth.currentUser?.displayName || '',
      gender: patientUser?.gender || '',
      tel: patientUser?.tel || '',
      birthDate: patientUser?.birthDate || '',
    } as PatientUser);
    console.log("更新が完了しました");
  };

  return (
    <div className="container">
      <div className="title">
        <h1>基本情報入力画面</h1>
      </div>
      <div style={{ height: '2.5rem' }}></div>
      <div className="button">
        <Link href="/">
          <a className="top_button">topへ</a>
        </Link>
      </div>
      <div style={{ height: '2.5rem' }}></div>
      <div className="base">
        <div className="element_wrap">
          <label>ID</label>
          <input
            type="text"
            className="element"
            value={userId}
          ></input>
        </div>
        <div className="element_wrap">
          <label>名前</label>
          <input
            type="text"
            className="element"
            value={patientUser?.name || ''}
          ></input>
        </div>
        <div className="element_wrap">
          <label>性別</label>
          <input
            name = "gender"
            type="text"
            className="element"
            value={patientUser?.gender || ''}
            onChange={handleGenderChange}
          ></input>
        </div>
        <div className="element_wrap">
          <label>誕生日</label>
          <input
            name = "birthdate"
            type="date"
            className="element"
            value={patientUser?.birthDate || ''}
            onChange={handlebirthDateChange}
          ></input>
        </div>
        <div className="element_wrap">
          <label>電話番号</label>
          <input
            name = "tel"
            type="text"
            className="element"
            value={patientUser?.tel || ''}
            onChange={handleTelChange}
          ></input>
        </div>
      </div>
      <div style={{ height: '2.5rem' }}></div>
            <div className="button">
                <a className="sub_button" onClick={addBase}>登録</a>
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


        .element {
          display: inline-block;
          padding: 10px;
        }

        .element_wrap input {
          margin: 20px;
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
