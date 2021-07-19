/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { JKObject } from "data/interface/common"
import { Message } from '@line/bot-sdk';

const lineDailyNoti = ({
  content,
  date,
  type,
}): Message => {

  const bubbles = content.map((c) => {
    return createBubble({
      url: c?.imgUrl,
      type,
      content: c?.content,
      date
    })
  })
  return {
    type: 'flex',
    altText: "每日營養日誌",
    contents: {
      "type": "carousel",
      "contents": bubbles
    }
  }
}

const createBubble = ({ url, type, content, date }): JKObject => {
  return {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": url,
      "size": "full",
      "aspectRatio": "4:3",
      "aspectMode": "cover",
      "action": {
        "type": "uri",
        "uri": url
      }
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": type,
          "weight": "bold",
          "size": "md"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "lg",
          "spacing": "sm",
          "contents": [
            {
              "type": "text",
              "text": content || '-',
              "size": "lg",
              "color": "#8c8c8c"
            }
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "spacing": "sm",
      "contents": [
        {
          "type": "spacer",
          "size": "sm"
        },
        {
          "type": "separator"
        },
        {
          "type": "text",
          "text": date,
          "size": "xs",
          "color": "#b3b3b3",
          "align": "end"
        }
      ],
      "flex": 0
    }
  }
}
export default lineDailyNoti;
