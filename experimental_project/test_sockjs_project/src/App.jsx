import React from "react";
import { WebSocketEndPointSuit } from "./suits/websocket-endpoint-suit";

/**
 * @param {React.PropsWithChildren}
 */
function Container({ children }) {
  return (
    <div className="w-[90%] h-max min-h-[100vh] flex justify-center items-center">
      {children}
    </div>
  );
}

function App() {
  // const url = "http://localhost:8080/ps/ws/v1";
  // useEffect(, []);
  return (
    <div className="w-full h-max flex justify-center bg-bg ">
      <Container>
        <WebSocketEndPointSuit />
      </Container>
    </div>
  );
}

export default App;
