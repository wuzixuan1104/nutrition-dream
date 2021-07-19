import fetcher from 'util/fetcher';
import { JKObject } from 'data/interface/common';
import { DAILY_TYPES } from 'data/interface/daily';
import uploadToS3 from 'util/uploadToS3';
import client from 'util/line';
import lineDailyNoti from 'data/template/lineDailyNoti';
import uuid from 'util/uuid';

/** 
 * s3 config
 * url: /nutrition/1/2021-07-21
 * 
 * {
 *    id: 1,
 *    date: 2021-07-21,
 *    categories: {
 *        breakfast: [
 *          {
 *            url: '',
 *            content: ''
 *          }
 *        ],
 *    },
 * }
 */
export default async function uploadDaily(req, res): Promise<void> {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: true, message: '沒有這個 method' })
  } 

  const body = req?.body && JSON.parse(req.body);
  const date = body?.date.slice(0, 10).replace(/\//g, '-');
  
  const overwrite = body?.overwrite;
  const type = body?.type;
  const content = body?.content;
  const id = body?.id;

  const path = `nutrition/${id}/${date}.json`
  const newContent = [];
  const payload: JKObject = await getOldConfig({
    id, date, path, type, overwrite
  })
  
  // 上傳 s3 image & 存 config & 推播機器人
  if (content?.length > 0) {
    try {
      for (const data of content) {
        const imgUrl = await uploadImage(data?.img?.file);
        newContent.push({
          imgUrl,
          content: data?.explan
        });
      }

      payload?.categories?.[type].concat(newContent);
      
      // send bot
      const template = lineDailyNoti({ content: newContent, date, type: DAILY_TYPES?.[type] })
      client.pushMessage(id, template);

      const updateConfig = await uploadConfig(path, payload);
      if (updateConfig)
        return res.status(200).json({ error: false, message: 'success' })
    } catch (e) {}

    return res.status(400).json({ error: false, message: 'fail' })
  }
  return res.status(200).json({ error: false, message: 'nothing update' })
}

async function getOldConfig({
  id, date, path, type, overwrite
}): Promise<JKObject> {
  let payload: JKObject = {
    id,
    date,
    categories: {
      [type]: []
    }
  };

  try {
    const result: JKObject = await fetcher.get(`${process?.env?.S3_URL}${path}`);
    if (result) {
      payload = {
        ...result,
        categories: {
          ...result?.categories,
          [type]: overwrite ? [] : result?.categories?.[type],
        }
      }
    }
  } catch (e) {}

  return payload;
}

/**
 * Upload Image
 * @param file 
 * @returns 
 */
async function uploadImage(file: JKObject): Promise<string> {
  const ext = file?.name.split('.').pop();
  const key = `nutrition/img/${uuid()}-${new Date().getTime()}.${ext}`.replace(/\s/g, '_');
  const base64Url = file?.thumbUrl?.replace(`data:${file?.type};base64,`, '');
  const url = `${process?.env?.S3_URL}${key}`;
  
  const res = await uploadToS3({
    key: key, 
    body: Buffer.from(base64Url, 'base64'), 
    mimeType: file?.type,
  })

  return res ? url : '';
}

/**
 * Upload config
 * @param path 
 * @param payload 
 * @returns 
 */
async function uploadConfig(path: string, payload: JKObject): Promise<string> {
  const res = await uploadToS3({
    key: path, 
    body: JSON.stringify(payload), 
    mimeType: 'application/json',
  })
  
  return res;
}