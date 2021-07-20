import { NextPage } from 'next';
import React, { useState } from 'react';
import { useRouter } from 'next/router'

import { Form, Input, Button, Space, Select, Upload, Checkbox, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { DAILY_TYPES } from 'data/interface/daily';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

const DailyRecord: NextPage = () => {
  const [overwrite, setOverwrite] = useState(false);
  const [fileList, setFileList] = useState({});

  const router = useRouter();

  const onFinish = async (values): Promise<void> => {
    console.log('Received values of form:', values, overwrite);

    const id = router?.query?.id;
    if (!id) {
      console.error('Cannot send form post, missing query id');
      return;
    }

    const result = await fetch(`/api/uploadDaily?id=${id}`, { 
      method: 'POST',
      // body: formData
      body: JSON.stringify({
        ...values,
        date: moment(values?.date, dateFormat),
        overwrite,
        id
      })
    })

    if (result.status === 200) {
      alert('新增成功！');
      location.reload();
    } else {
      alert('新增失敗！')
    }
    console.log('[fetch]', result.status);
  };

  const onFinishFailed = async (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
   
  };

  const onChangeUploadFiles = ({ fileList: newFileList }, name): void => {
    console.log(newFileList);
    
    if (newFileList.length < 1) {
      const tmpFiles = { ...fileList[name] };
      delete tmpFiles[name];
      setFileList(tmpFiles);
      console.log('empty', tmpFiles);
    } else {
      setFileList(prev => ({ ...prev, [name]: newFileList}))
    }
  };

  const onPreview = async (file): Promise<void> => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const changeOverwrite = (v): void => {
    setOverwrite(v?.target?.checked)
  }

  return (
    <div className="container-padding">
      <h1 className="text-l mb-15 text-center">
        每餐吃什麼？
      </h1>
      <Form 
        name="dynamic_form_nest_item" 
        onFinish={onFinish} 
        autoComplete="off" 
        layout="vertical" 
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 5 }}
        initialValues={{ 
          date: moment(moment(), dateFormat), 
          type: 'breakfast',
          content: [],
        }}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="日期" name="date" rules={[{ required: true, message: '請輸入日期!' }]}>
          <DatePicker 
            format={dateFormat} 
            style={{ width: '100%' }} 
          />
        </Form.Item>

        <Form.Item label="類型" name="type" rules={[{ required: true, message: '請選擇類型!' }]}>
          <Select placeholder="選擇類型" style={{ width: '100%' }}>
            {DAILY_TYPES && Object.keys(DAILY_TYPES).map((type: string, key: number) => 
              <Option key={key} value={type}>{DAILY_TYPES[type]}</Option>)}
          </Select>
        </Form.Item>
        
        <Form.Item label="內容" >
          <Form.List name="content">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key} className="dynamic-contain">
                    <Space direction="vertical" style={{ display: 'flex', width: '100%' }} align="end">
                      <MinusCircleOutlined className="form-delete" onClick={() => remove(name)} />

                      <Form.Item
                        {...restField}
                        name={[name, 'img']}
                        fieldKey={[fieldKey, 'img']}
                        style={{ width: '100%' }}
                        rules={[{ required: true, message: '請拍下你這餐的照片!' }]}
                      >
                        <Upload
                          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          listType="picture-card"
                          fileList={fileList[name]}
                          onChange={(v) => onChangeUploadFiles(v, name)}
                          onPreview={onPreview}
                        >
                          {(!fileList?.[name] || fileList?.[name]?.length < 1) && '+ 上傳圖片'}
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'explan']}
                        fieldKey={[fieldKey, 'explan']}
                        style={{ width: '100%' }}
                      >
                        <TextArea placeholder="補充說明" />
                      </Form.Item>
                    </Space>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    新增一筆
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item>
          <Checkbox onChange={changeOverwrite}>
            移除原有內容（將會刪除該日期類別中的舊資料）
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default DailyRecord;