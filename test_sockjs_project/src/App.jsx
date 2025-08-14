import React, { useEffect } from "react";
import WebSocketEndPointSuit from "./suits/websocket-endpoint-suit";

/**
 * @param {React.PropsWithChildren}
 */
function Container({ children }) {
  return <div className="w-[90%] h-max">{children}</div>;
}

function App() {
  return (
    <div className="w-full h-max flex justify-center bg-bg ">
      <Container>
        <WebSocketEndPointSuit />
      </Container>
    </div>
  );
}

export default App;
