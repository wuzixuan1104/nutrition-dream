import React from 'react';
import stylesheet from 'antd/dist/antd.min.css'
import { Layout } from 'antd';

const InitialWrap: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Layout>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        {children}
      </Layout>
    </>
  );
};
 
export default InitialWrap;
 