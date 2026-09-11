import React from 'react'; export default function ScoreBar({score}){return <div className="score"><strong>{score}/100</strong><div className="bar"><i style={{width:`${score}%`}}/></div></div>}
