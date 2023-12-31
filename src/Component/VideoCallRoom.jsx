/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import * as React from 'react';

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCallRoom() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SECRET_KEY;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));


    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Copy link',
          url:
            window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      }
    });


  };
  const listStyle = {
    listStyleType: 'none', // Quita los puntos de la lista
    padding: 0, // Quita el relleno predeterminado
  };

  const linkStyle = {
    textDecoration: 'none', // Quita la subrayado del enlace
    color: 'inherit', // Hereda el color del texto del elemento padre
  };
  return (
    <div style={{ display: 'flex' }}>
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{
        flex: 1,
        height: '100vh',
        marginRight: '10px',
      }}
    ></div>
    
  </div>
  
  
  );
}