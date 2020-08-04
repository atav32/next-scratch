import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import * as ReactWebcam from 'react-webcam';

import './webcam.css';

const IDEAL_VIDEO_CONSTRAINTS = {
  width: 99999,
  height: 99999,
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
  console.log('%c device options', 'color: #b0b', deviceOptions);
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

  const updateDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log('%c load available devices', 'color: #b0b', devices);
    setVideoDevices(devices.filter(device => device.kind === 'videoinput'));

    const newDeviceOptions = getAvailableDeviceOptions(devices);
    setDeviceOptions(newDeviceOptions);
    return [devices, newDeviceOptions];
  };

  useEffect(() => {
    const loadAvailableDevices = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({video: videoConstraints});
        console.log('%c mediaStream', 'color: #b0b', mediaStream);
        updateDevices();
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };

    loadAvailableDevices();
  }, []);

  useEffect(() => {
    if (!ready) {
      const newVideoConstraints = fixMultiCameraConstraints(videoConstraints, videoDevices);
      setVideoConstraints(newVideoConstraints);
    }

    const newDeviceOptions = getAvailableDeviceOptions(videoDevices);
    setDeviceOptions(newDeviceOptions);
  }, [videoDevices]);

  useEffect(() => {
    const loadUserMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({video: videoConstraints});
        setReady(true);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };
    loadUserMedia();
  }, [videoConstraints]);

  const handleChangeActiveDevice = async (device) => {
    console.log('%c setActiveDevice', 'color: #b0b', device);
    const newVideoConstraints = {
      width: videoConstraints.width,
      height: videoConstraints.height,
      deviceId: device.value,
    };
    setVideoConstraints(newVideoConstraints);
  };

  const handleOnUserMedia = async (mediaStream) => {
    const activeTrack = await getActiveTrack(mediaStream);
    const [devices, newDeviceOptions] = await updateDevices();
    const activeTrackDevice = newDeviceOptions.filter(device => device.label === activeTrack.label)[0];
    setActiveDevice(activeTrackDevice);
    console.log('%c active track', 'color: #b0b', activeTrack);
    console.log('%c active device', 'color: #b0b', activeTrackDevice);
  };

  console.log('%c ready', 'color: #b0b', ready);
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
          onUserMedia={handleOnUserMedia}
          videoConstraints={videoConstraints}
        />
      }
      <p>Error: {error ? `${error.name}: ${error.message}`: 'none'}</p>
      <p>{error && error.stack}</p>
    </div>
  );
}
