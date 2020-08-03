import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import * as ReactWebcam from 'react-webcam';

import './webcam.css';

const IDEAL_VIDEO_CONSTRAINTS = {
  width: 2880,
  height: 1620,
  facingMode: 'environment',
};

const fixMultiCameraConstraints = (videoConstraints, devices) => {
  const preferredDevices = devices.filter(
    (device) => device.label && device.label === 'camera2 0, facing back',
  );
  if (preferredDevices.length) {
    return {
      ...videoConstraints,
      deviceId: preferredDevices[0].deviceId,
    };
  }
  return videoConstraints;
};

const getAvailableDeviceOptions = (devices) => {
  const deviceOptions = [];
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  console.log('%c video devices', 'color: #b0b', videoDevices);
  videoDevices.forEach(device => deviceOptions.push({
    label: device.label,
    value: device.deviceId,
  }));
  return deviceOptions;
};

const getActiveTrack = async (mediaStream) => {
  const videoTracks = mediaStream.getVideoTracks();
  const activeTrack = videoTracks.filter(track => track.readyState === 'live')[0];
  console.log('%c videoTracks', 'color: #b0b', videoTracks, activeTrack);
  return activeTrack;
};

export default function Webcam() {
  const [activeDevice, setActiveDevice] = useState(null);
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [error, setError] = useState(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [videoConstraints, setVideoConstraints] = useState(IDEAL_VIDEO_CONSTRAINTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadAvailableDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setVideoDevices(devices.filter(device => device.kind === 'videoinput'));

      const newDeviceOptions = getAvailableDeviceOptions(devices);
      setDeviceOptions(newDeviceOptions);
    };
    loadAvailableDevices();
  }, []);

  useEffect(() => {
    const newVideoConstraints = fixMultiCameraConstraints(videoConstraints, videoDevices);
    setVideoConstraints(newVideoConstraints);
  }, [videoDevices]);

  useEffect(() => {
    setReady(true);
  }, [videoConstraints]);

  /*
  const updateActiveDevice = async (newVideoConstraints, newDeviceOptions) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({video: videoConstraints});
      const activeTrack = await getActiveTrack(mediaStream);
      const activeTrackDevice = newDeviceOptions.filter(device => device.label === activeTrack.label)[0];
      console.log('%c active device', 'color: #b0b', newVideoConstraints, activeTrackDevice);
      setActiveDevice(activeTrackDevice);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };
 */

  /*
  const loadMediaDevices = async () => {
    console.log('%c loadMediaDevices', 'color: #b0b');
    try {
      const newDeviceOptions = getAvailableDeviceOptions(devices);
      setDeviceOptions(newDeviceOptions);
      setVideoDevices(devices);
      setVideoConstraints(newVideoConstraints);
      await updateActiveDevice(newVideoConstraints, newDeviceOptions);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };
  */

  const handleChangeActiveDevice = async (device) => {
    console.log('%c setActiveDevice', 'color: #b0b', device);
    const newVideoConstraints = {
      ...videoConstraints,
      deviceId: device.value,
    };
    setVideoConstraints(newVideoConstraints);
    // setActiveDevice(device);
    // const activeTrack = await getActiveTrack(newVideoConstraints);
  };

  const handleUserMedia = async (mediaStream) => {
    // console.log('%c handleUserMedia', 'color: #b0b', mediaStream);
    const activeTrack = await getActiveTrack(mediaStream);
    const activeTrackDevice = deviceOptions.filter(device => device.label === activeTrack.label)[0];
    setActiveDevice(activeTrackDevice);
    console.log('%c active track', 'color: #b0b', activeTrack);
    console.log('%c active device', 'color: #b0b', activeTrackDevice);
  };

  console.log('%c video contraints', 'color: #b0b', videoConstraints);

  return (
    <div className="ContentContainer">
      <p>This is the webcam page</p>
      <Select
        options={deviceOptions}
        value={activeDevice}
        onChange={handleChangeActiveDevice}
      />
      { ready &&
        <ReactWebcam
          className="react-webcam"
          audio={false}
          onUserMedia={handleUserMedia}
          videoConstraints={videoConstraints}
        />
      }
      <p>Error: {error ? `${error.name}: ${error.message}`: 'none'}</p>
      <p>{error && error.stack}</p>
    </div>
  );
}
