import React from 'react';
export default function Layout({children,onHome,onHistory}){return <><header><div className="brand" onClick={onHome}>LLD<span>Coach</span></div><nav><button onClick={onHome}>Problems</button><button onClick={onHistory}>History</button></nav></header><main>{children}</main></>}
