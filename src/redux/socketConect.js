import { fetchDeviceAtributes } from "./FetchDeviceAtributes";

let webSocket = "";

export function WebSocketAPIExample(id, dispatch,startDateTimestamp , endDateTimestamp) {
  const jwtToken = localStorage.getItem("jwt_token");
  let token = jwtToken;
  webSocket = new WebSocket(`wss://iotlogiq.com/api/ws/plugins/telemetry?token=${token}`);

  let entityId = id;

  if (!jwtToken) {
    console.error("JWT token not found in localStorage.");
    return;
  }

  if (entityId === "YOUR_DEVICE_ID") {
    alert("Invalid device id!");
    webSocket.close();
  }

  if (token === "YOUR_JWT_TOKEN") {
    alert("Invalid JWT token!");
    webSocket.close();
  }

  webSocket.onopen = function () {
    let object = {
      tsSubCmds: [
        {
          entityType: "DEVICE",
          entityId: entityId,
          scope: "LATEST_TELEMETRY",
          cmdId: 10,
        },
      ],
      historyCmds: [],
      attrSubCmds: [],
    };
    let data = JSON.stringify(object);
    webSocket.send(data);
    /* alert("Message is sent: " + data); */
  };

  webSocket.onmessage = function (event) {
    let received_msg = event.data;
    /* console.log(received_msg); */

    dispatch(
      fetchDeviceAtributes({
        id: entityId,
        startDateTimestamp: startDateTimestamp,
        endDateTimestamp: endDateTimestamp,
      })
    );
  };

  webSocket.onclose = function (event) {
/*     console.log(event);
     alert("Connection is closed!");  */
  };
}

export function disconnectWebSocket() {
  const jwtToken = localStorage.getItem("jwt_token");
  let token = jwtToken;
  if (token === jwtToken) {
    webSocket.close();
  }
}