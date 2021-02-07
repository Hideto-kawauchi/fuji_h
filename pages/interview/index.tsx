import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { InterView, initialInterView } from '@/types/interview';
import { firestore } from '@/lib/firebase';
import { formatYMD } from '@/utils/dateUtils';

const Index = () => {
  // state
  const [interviewList, setInterviewList] = useState<InterView[]>([]);
  const [interview, setInterview] = useState<InterView>(initialInterView);

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

  const handleTemperatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value != "string") return
    const value = event.target.value;

    setInterview((oldValue) => {
      return {
        ...oldValue,
        temperature: value,
      }
    })
  }
  
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.checked)
    // console.log(event.target.name)

    if(typeof event.target.name != "string") return
    const name = event.target.name

    // console.log(typeof name)
    
    if (event.target.checked == true) {
        setInterview((oldValue) => {
            return {
                ...oldValue,
                cold: [...oldValue.cold, name]
            }
        })
    } else {
        setInterview((oldValue) => {
            return {
                ...oldValue,
                cold: oldValue.cold.filter(v => v != name)
            }
        })
    }
    // console.log(interview)
}

  return (
    <div className="container">
        <h1 align="center">
            <font size="10"face="ヒラギノ明朝 ProN">問診票</font>
        </h1>
        <div style={{ display: "flex", justifyContent: "center"}}>
        <div style={{ width: "53%"}}>
        <div className="pad">Q1. 体温を記入してください<br />
        {/* TODO: debug用 */}
        <div>{interview.temperature}</div>

        <input
          name="temperature"
          type="text"
          value={interview.temperature}
          onChange={handleTemperatureChange}
        ></input><br /><br /><br /></div>
        
        <p className="pad">Q2. 症状を教えてください<br />
        ＜かぜ症状＞<br />
        {/* TODO: debug用 */}
        {interview.cold.map(x => <div  key={x}>{x}</div>)}

        ・熱がある<input name="fever" type="checkbox" onChange={handleCheckChange}></input>
        ・喉が痛い<input name="throatache" type="checkbox" onChange={handleCheckChange}></input>
        ・鼻水/鼻詰まり<input name="snivel" type="checkbox" onChange={handleCheckChange}></input>
        ・咳<input name="cough" type="checkbox" onChange={handleCheckChange}></input>
        ・痰（たん）<input name="phlegm" type="checkbox" onChange={handleCheckChange}></input>
        ・頭痛<input name="headache" type="checkbox" onChange={handleCheckChange}></input>
        ・関節が痛い<input name="joint" type="checkbox" onChange={handleCheckChange}></input><br /><br />
        ＜頭・目＞<br />
        ・頭痛が続く<input name="infheadache" type="checkbox" onChange={handleCheckChange}></input>
        ・目が痛い<input name="eye" type="checkbox" onChange={handleCheckChange}></input>
        ・めまいがする<input name="dizziness" type="checkbox" onChange={handleCheckChange}></input><br /><br />
        ＜胸・体＞<br />
        ・胸痛<input name="chest" type="checkbox" onChange={handleCheckChange}></input>
        ・動悸<input name="pulsation" type="checkbox" onChange={handleCheckChange}></input>
        ・息切れがする<input name="breath" type="checkbox" onChange={handleCheckChange}></input>
        ・胸の圧迫感がある<input name="chestpress" type="checkbox" onChange={handleCheckChange}></input>
        ・顔や体のむくみが気になる<input name="swell" type="checkbox" onChange={handleCheckChange}></input><br /><br />
        ＜お腹＞<br />
        ・腹痛<input name="stomach" type="checkbox" onChange={handleCheckChange}></input>
        ・お腹がはる<input name="haru" type="checkbox" onChange={handleCheckChange}></input>
        ・下痢<input name="diarrhea" type="checkbox" onChange={handleCheckChange}></input>
        ・吐き気<input name="nausea" type="checkbox" onChange={handleCheckChange}></input>
        ・食欲がない<input name="appetite" type="checkbox" onChange={handleCheckChange}></input>
        ・血便が出た<input name="bloodystool" type="checkbox" onChange={handleCheckChange}></input>
        ・便秘<input name="constipation" type="checkbox" onChange={handleCheckChange}></input><br /><br />
        ＜慢性的な疾患＞<br />
        ・高血圧<input name="highblood" type="checkbox" onChange={handleCheckChange}></input>
        ・高脂血症<input name="hyperlipidemia" type="checkbox" onChange={handleCheckChange}></input>
        ・糖尿病<input name="diabetes" type="checkbox" onChange={handleCheckChange}></input><br /><br />
        ＜その他＞<br />
        ・健診で異常を指摘された<input name="abnormal" type="checkbox" onChange={handleCheckChange}></input>
        ・健康診断<input name="diagnosis" type="checkbox" onChange={handleCheckChange}></input>
        ・予防接種の希望<input name="preventseed" type="checkbox" onChange={handleCheckChange}></input><br /><br /><br />
        </p>

        <p className="pad">Q3. 症状が出たのはいつ頃からでしょうか<br />
        <input type="date"></input><br /><br /><br /></p>

        <p className="pad">Q4. 現在飲まれているお薬はありますか<br />
        <textarea 
          rows="5" 
          cols="50"
        ></textarea><br /><br /><br /></p>

        <p className="pad">Q5. アレルギーはありますか<br />
        <textarea rows="5" cols="50"></textarea></p>

        </div>
        </div>
        <style jsx>{`
            .pad{
                padding-left: 20px;
            }
        `}
        </style>
    </div>
  );
};

export default Index;
