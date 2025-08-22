import { Stomp } from "@stomp/stompjs";
import { useEffect } from "react";
import SockJS from "sockjs-client";

export function WebSocketSpecificUser() {
  useEffect(() => {
    var socket = new SockJS("http://localhost:8080/secured/room");
    var stompClient = Stomp.over(() => socket);
    var sessionId = "";

    stompClient.connect({}, function (frame) {
      var url = stompClient.ws._transport.url;
      url = url.replace("ws://localhost:8080/secured/room/", "");
      url = url.replace("/websocket", "");
      url = url.replace(/^[0-9]+\//, "");
      console.log(
        "Your current session is: " + url,
      );
      sessionId = url;

      stompClient.subscribe(
        "secured/user/queue/specific-user" + "-user" + that.sessionId,
        function (msgOut) {
          console.log(msgOut);
        },
      );
      setTimeout(()=>{
      stompClient.publish({ destination:"", body: JSON.stringify(body) });
      });
    });
  });
  return <div className="grow-1">hellow</div>;
}
