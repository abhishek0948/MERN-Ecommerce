import React from 'react';

const Loading = () => {
  return (
    <div className="animate-pulse flex flex-col items-center mx-auto gap-4 w-full h-26">
      <div>
        <div className="w-40 h-4 bg-slate-400 rounded-md" />
        <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md" />
      </div>
      <div className="h-4 bg-slate-400 w-full rounded-md" />
      <div className="h-4 bg-slate-400 w-full rounded-md" />
      <div className="h-4 bg-slate-400 w-full rounded-md" />
      <div className="h-4 bg-slate-400 w-1/2 rounded-md" />
    </div>
  );
}

export default Loading;
