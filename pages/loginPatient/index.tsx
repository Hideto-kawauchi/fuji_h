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
      <h1>loginPatient</h1>
      <div style={{ height: '5rem' }}></div>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <div>
        <button onClick={handleLogin}>login</button>
      </div>
      <div>
        <button onClick={handleLogout}>logout</button>
      </div>
      <style jsx>{``}</style>
    </div>
  );
};

export default Index;
