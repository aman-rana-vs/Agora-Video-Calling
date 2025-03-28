import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import { useState } from "react";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

export const VideoClient = () => {
  const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
  return (
    <AgoraRTCProvider client={client}>
      <Basics />
    </AgoraRTCProvider>
  );
};

const Basics = () => {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected(); // Store the user's connection status
  const [appId, setAppId] = useState("3b92f5e789ab408d9f8e4eb2e0636879");
  const [channel, setChannel] = useState("test");
  const [token, setToken] = useState(
    "007eJxTYDhx5Ni9KXIpc3Jz7xuoqTd0+N5da/6gmc/iiHAtn8ndnaUKDMZJlkZppqnmFpaJSSYGFimWaRapJqlJRqkGZsZmFuaWIn7P0hsCGRneK59lYmSAQBCfhaEktbiEgQEAUlMfZQ=="
  );
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  useJoin(
    { appid: appId, channel: channel, token: token ? token : null },
    calling
  );
  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();

  return (
    <>
      <div>
        {isConnected ? (
          <div>
            <div>
              <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                playAudio={false} // Plays the local user's audio track. You use this to test your mic before joining a channel.
                micOn={micOn}
                videoTrack={localCameraTrack}
                style={{ width: "90%", height: 300 }}
              >
                <samp>You</samp>
              </LocalUser>
            </div>
            {remoteUsers.map((user) => (
              <div key={user.uid}>
                <RemoteUser user={user} style={{ width: "90%", height: 300 }}>
                  <samp>{user.uid}</samp>
                </RemoteUser>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <input
              onChange={(e) => setAppId(e.target.value)}
              placeholder="<Your app ID>"
              value={appId}
            />
            <input
              onChange={(e) => setChannel(e.target.value)}
              placeholder="<Your channel Name>"
              value={channel}
            />
            <input
              onChange={(e) => setToken(e.target.value)}
              placeholder="<Your token>"
              value={token}
            />

            <button
              disabled={!appId || !channel}
              onClick={() => setCalling(true)}
            >
              <span>Join Channel</span>
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div style={{ padding: "20px" }}>
          <div>
            <button onClick={() => setMic((a) => !a)}>
              {micOn ? "Disable mic" : "Enable mic"}
            </button>
            <button onClick={() => setCamera((a) => !a)}>
              {cameraOn ? "Disable camera " : "Enable camera"}
            </button>
            <button onClick={() => setCalling((a) => !a)}>
              {calling ? "End calling" : "Start calling"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoClient;
