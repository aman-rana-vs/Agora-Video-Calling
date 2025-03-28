import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import Basics from "./Basics";

export const VideoClient = () => {
  const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
  return (
    <AgoraRTCProvider client={client}>
      <Basics />
    </AgoraRTCProvider>
  );
};

export default VideoClient;
