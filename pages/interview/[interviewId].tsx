import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { firestore } from '@/lib/firebase';
import { InterView } from '@/types/interview';

const Index = () => {
  // router
  const { query } = useRouter();
  const interviewId = decodeURIComponent(query.interviewId as string).slice(
    0,
    -1
  );

  // state
  const [interview, setInterview] = useState<InterView>();

  // init
  useEffect(() => {
    firestore.collection('interview').onSnapshot((collection) => {
      const data = collection.docs
        .filter((doc) => doc.id === interviewId)
        .map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          age: doc.data().age,
          temperature: doc.data().temperature,
          date: doc.data().date ? doc.data().date : '',
        }));
      setInterview(data[0]);
    });
  }, [interviewId]);

  return (
    <div className="container">
      <h1>Interview</h1>
      <div style={{ height: '5rem' }}></div>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <div style={{ height: '5rem' }}></div>
      <div>
        <form>
          <input
            type="text"
            name="name"
            disabled
            value={interview?.name || ''}
          />
          <br />
          <input type="text" name="age" disabled value={interview?.age || ''} />
          <br />
          <input
            type="text"
            name="temperature"
            disabled
            value={interview?.temperature || ''}
          />
          <input
            type="text"
            name="date"
            disabled
            value={interview?.date || ''}
          />
        </form>
      </div>
      <style jsx>{``}</style>
    </div>
  );
};

export default Index;
