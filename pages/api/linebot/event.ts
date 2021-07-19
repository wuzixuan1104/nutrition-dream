import client from 'util/line';

const groupId = [];

export default function event(req, res) {
  // 1. 小惡魔：加入就取得群組 ID

  for(const event of req.body.events) {
    const source = event?.source;
    const type = source?.type;
    const id = source?.groupId;
    
    if (groupId.indexOf(id) === -1 && type === 'group') {
      // 有人加群組就推播到這邊 -> 'C362922564826576842de61e0c9e426f2'
      client.pushMessage('C362922564826576842de61e0c9e426f2', {
        type: 'text',
        text: `營養小惡魔被加進群組了，快點告知你好友，秘密連結吧！${process?.env?.APP_HOST}?id=${id}`
      });
      groupId.push(id);
    }
  }

  return res.status(200).json({ error: false, message: 'nothing update' })
}
