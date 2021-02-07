import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <div className="container">
      <div className = "object">過去の診断情報＞カルテ選択＞ID:3</div>
      <div style={{ height: '5rem' }}></div>
      <div style={{ display: "flex", flexDirection: "column"}}>
      <a>カルテ内容</a>
    　　<table>
        <tr>
        <td>患者の名前</td>　 <td>ooXX</td>
        </tr>
        <tr>
        <td>日付</td>　 <td>2020.7</td>
        </tr>
        <tr>
        <td>症状</td>　 <td>頭痛</td>
        </tr>
        <tr>
        <td>診察所見</td>　 <td>花粉症</td>
        </tr>
        <tr>
        <td>医療行為</td> 　<td>投薬治療</td>
        </tr>
        <tr>
        <td>投薬</td> 　<td>バファリン</td>
        </tr>
       </table>
      　<Link href="/patient/sindanreki">
          <a>カルテ一覧に戻る</a>
        </Link>
       <Link href="/patient">
          <a>メニューに戻る</a>
        </Link>
      </div>
      <style jsx>{`
      table{
      border:solid;
      }
       .object{
        background-color:#C4DFE6;color:white;
       }
       button {
          background-color: #66A5AD;color:white;
        }
       `}
      </style>
    </div>
  );
};

export default Index;
