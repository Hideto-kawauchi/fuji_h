import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { firestore } from '@/lib/firebase';

type InterView = {
  id: string;
  name: string;
  age: number;
  temperature: string;
  date: string;
};

const Index = () => {
  // state
  const [interview, setInterview] = useState<InterView>();

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [temperature, setTemperature] = useState('');

  // init
  useEffect(() => {
    firestore.collection('interview').onSnapshot((collection) => {
      const data = collection.docs
        .filter((doc) => doc.id === '')
        .map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          age: doc.data().age,
          temperature: doc.data().temperature,
          date: doc.data().date.toDate(),
        }));
      setInterview(data[0]);
    });
  }, []);

  const onSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      name,
      age,
      temperature,
    });
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
      <div>
        <form onSubmit={onSave}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="number"
            name="age"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value, 10))}
          />
          <br />
          <input
            type="text"
            name="temperature"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
          <br />
          <div style={{ height: '2.5rem' }}></div>
          <button type="submit">送信</button>
        </form>
      </div>
      <style jsx>{``}</style>
    </div>
  );
};

export default Index;
