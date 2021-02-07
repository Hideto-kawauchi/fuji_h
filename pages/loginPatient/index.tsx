import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { provider, auth } from '@/lib/firebase';

const Index = () => {
  // router
  const { push } = useRouter();

  const handleLogin = async () => {
    try {
      await auth.signInWithPopup(provider);
      const user = auth.currentUser;
      if (user) await push(`/basePatient/${user.uid}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('logout');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="title">
        <h1>ログインページ(患者さん用)</h1>
      </div>
      <div style={{ height: '5rem' }}></div>
      <div className="button">
        <button className="login" onClick={handleLogin}>ログイン</button>
        <p>※ログインはGoogleアカウントのみです</p>
      </div>
      <style jsx>{`
        .title{
          padding: 10px 0px 10px 0px;
          text-align: center;
          background-color: yellowgreen;
        }

        .button{
          text-align: center;
        }

        .login{
          padding: 15px 40px;
          margin : 10px;
          background-color: #5dca88;
          cursor: pointer;
          border-radius: 4px;
        }
        `}</style>
    </div>
  );
};

export default Index;
