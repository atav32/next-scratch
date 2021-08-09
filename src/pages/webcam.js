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
  const deviceOptions = [{label: 'None', value: null}];
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  console.log('%c video devices', 'color: #b0b', videoDevices);
  videoDevices.forEach(device => deviceOptions.push({
    label: device.label,
    value: device.deviceId,
  }));
  return deviceOptions;
};

const getActiveTrack = async (videoConstraints) => {
  const mediaStream = await navigator.mediaDevices.getUserMedia({video: videoConstraints});
  const videoTracks = mediaStream.getVideoTracks();
  const activeTrack = videoTracks.filter(track => track.readyState === 'live')[0];
  console.log('%c videoTracks', 'color: #b0b', videoTracks, activeTrack);
  return activeTrack;
};

export default function Webcam() {
  const [activeDevice, setActiveDevice] = useState(null);
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [error, setError] = useState(null);
  const [mediaDevices, setMediaDevices] = useState([]);
  const [videoConstraints, setVideoConstraints] = useState(IDEAL_VIDEO_CONSTRAINTS);

  const updateActiveDevice = async (newVideoConstraints, newDeviceOptions) => {
    try {
      const activeTrack = await getActiveTrack(newVideoConstraints);
      const activeTrackDevice = newDeviceOptions.filter(device => device.label === activeTrack.label)[0];
      console.log('%c active device', 'color: #b0b', newVideoConstraints, activeTrackDevice);
      setActiveDevice(activeTrackDevice);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  const loadMediaDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const newVideoConstraints = fixMultiCameraConstraints(videoConstraints, devices);
      const newDeviceOptions = getAvailableDeviceOptions(devices);
      setDeviceOptions(newDeviceOptions);
      setMediaDevices(devices);
      setVideoConstraints(newVideoConstraints);
      await updateActiveDevice(newVideoConstraints, newDeviceOptions);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  useEffect(() => {
    loadMediaDevices();
  }, [setError, setMediaDevices, setVideoConstraints]);

  const handleChangeActiveDevice = async (device) => {
    console.log('%c setActiveDevice', 'color: #b0b', device);
    const newVideoConstraints = {
      ...videoConstraints,
      deviceId: device.value,
    };
    setVideoConstraints(newVideoConstraints);
    setActiveDevice(device);
    const activeTrack = await getActiveTrack(newVideoConstraints);
  };

  return (
    <div className="ContentContainer">
      <p>This is the webcam page</p>
      <Select
        options={deviceOptions}
        value={activeDevice}
        onChange={handleChangeActiveDevice}
      />
      { !!mediaDevices.length &&
        <ReactWebcam
          className="react-webcam"
          audio={false}
          videoConstraints={videoConstraints}
        />
      }
      <p>Error: {error ? `${error.name}: ${error.message}`: 'none'}</p>
      <p>{error && error.stack}</p>
    </div>
  );
}
