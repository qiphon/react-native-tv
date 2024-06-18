import {Platform} from 'react-native';

/**
 * @file app 反馈相关
 */
export const feedback = async (text: string) => {
  return fetch(
    'https://open.feishu.cn/open-apis/bot/v2/hook/fab38087-8005-40ac-ae8f-c6efe5cb6173',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msg_type: 'interactive',
        card: {
          header: {
            title: {
              content: '「TV 反馈」',
              tag: 'plain_text',
            },
          },
          elements: [
            {
              tag: 'div',
              text: {
                content: `**feedbackText：** ${text} \n *platform*: ${
                  Platform.OS
                } \n *Version*: ${
                  Platform.Version
                } \n **OriginMsg: ** ${JSON.stringify(Platform)}`,
                tag: 'lark_md',
              },
            },
          ],
        },
      }),
    },
  ).then(res => res.json());
};
