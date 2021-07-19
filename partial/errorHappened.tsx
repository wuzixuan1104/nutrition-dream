import React from 'react';
import { ICode } from '../data/interface/error';

const ErrorHappened = ({ code = null }: { code: ICode }): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col items-center px-50 bg-gray-200">
      <img className="mt-12vh h-180 w-180" src="/images/error.png" alt="error" />
      <h1 className="mt-24 text-xxxl leading-tight text-1000 font-medium">系統異常，請稍後再試</h1>
      <span className="mt-12 text-xl leading-tight text-center text-gray-800" >
        好像出了點錯，工程師正在努力處理中，請稍後再試。{code && `(error: ${code})`}
      </span>
    </div>
  );
};
 
export default ErrorHappened;
 