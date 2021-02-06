import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { InterView } from '@/types/interview';
import { firestore } from '@/lib/firebase';
import { formatYMD } from '@/utils/dateUtils';

const Index = () => {
  // state
  const [interviewList, setInterviewList] = useState<InterView[]>([]);

  // init
  useEffect(() => {
    firestore.collection('interview').onSnapshot((collection) => {
      const data = collection.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        age: doc.data().age,
        temperature: doc.data().temperature,
        date: doc.data().date ? doc.data().date : '',
      }));
      setInterviewList(data);
    });
  }, []);

  const addInterview = () => {
    firestore.collection('interview').add({
      name: 'hoge太郎',
      age: 10,
      temperature: '36.1',
      date: formatYMD(new Date()),
    } as InterView);
  };

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
      <div className="list">
        {interviewList.map((interview) => (
          <Link
            key={interview.id}
            href={`/interview/${encodeURIComponent(interview.id)}}`}
          >
            <a>{`${interview.id}_${interview.name}_${interview.date}`}</a>
          </Link>
        ))}
      </div>
      <div style={{ height: '5rem' }}></div>
      <div>
        <button onClick={addInterview}>demo値登録</button>
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
