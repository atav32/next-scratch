import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import * as ReactWebcam from 'react-webcam';

import './webcam.css';

const IDEAL_VIDEO_CONSTRAINTS = {
  width: 4608,
  height: 3456,
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
  // console.log('%c video devices', 'color: #b0b', videoDevices);
  videoDevices.forEach(device => deviceOptions.push({
    label: device.label,
    value: device.deviceId,
  }));
  // console.log('%c device options', 'color: #b0b', deviceOptions);
  return deviceOptions;
};

const getActiveTrack = (mediaStream) => {
  const videoTracks = mediaStream.getVideoTracks();
  const activeTrack = videoTracks.filter(track => track.readyState === 'live')[0];
  console.log('%c videoTracks', 'color: #b0b', videoTracks, activeTrack);
  return activeTrack;
};

const logStreamTracks = (mediaStream) => {
  const videoTracks = mediaStream.getVideoTracks();
  videoTracks.forEach(track => {
    console.log('%c track capabilities', 'color: #b0b', track.getCapabilities());
    console.log('%c track settings', 'color: #b0b', track.getSettings());
    console.log('%c track constraints', 'color: #b0b', track.getConstraints());
  });
};

export default function Webcam() {
  const [activeDevice, setActiveDevice] = useState(null);
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [error, setError] = useState(null);
  const [height, setHeight] = useState(IDEAL_VIDEO_CONSTRAINTS.height);
  const [videoDevices, setVideoDevices] = useState([]);
  const [videoConstraints, setVideoConstraints] = useState(IDEAL_VIDEO_CONSTRAINTS);
  const [width, setWidth] = useState(IDEAL_VIDEO_CONSTRAINTS.width);
  const [ready, setReady] = useState(false);

  const updateDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const availableVideoDevices = devices.filter(device => device.kind === 'videoinput');
    console.log('%c load available devices', 'color: #b0b', availableVideoDevices);
    setVideoDevices(availableVideoDevices);

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
    const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
    console.log('%c supported constraints', 'color: #b0b', supportedConstraints);
  }, []);

  useEffect(() => {
    /*
    if (!ready) {
      const newVideoConstraints = fixMultiCameraConstraints(videoConstraints, videoDevices);
      setVideoConstraints(newVideoConstraints);
    }
    */

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

  useEffect(() => {
    const newVideoConstraints = {
      ...videoConstraints,
      width,
      height,
    };
    setVideoConstraints(newVideoConstraints);
  }, [width, height]);

  const handleChangeActiveDevice = async (device) => {
    console.log('%c setActiveDevice', 'color: #b0b', device);
    const newVideoConstraints = {
      // width: videoConstraints.width,
      // height: videoConstraints.height,
      deviceId: device.value,
    };
    setVideoConstraints(newVideoConstraints);
  };

  const handleOnUserMedia = async (mediaStream) => {
    logStreamTracks(mediaStream);
    const activeTrack = getActiveTrack(mediaStream);
    const [devices, newDeviceOptions] = await updateDevices();
    const activeTrackDevice = newDeviceOptions.filter(device => device.value === activeTrack.getCapabilities().deviceId)[0];
    setActiveDevice(activeTrackDevice);
    console.log('%c active track', 'color: #b0b', activeTrack);
    console.log('%c active device', 'color: #b0b', activeTrackDevice);
  };

  const handleOnUserMediaError = (err) => {
    setError(err);
    console.error(err);
  };

  const handleConstraintChange = (event) => {
    const inputName = event.target.name;
    const newValue = event.target.value;
    // console.log('%c handle constraint change', 'color: #b0b', event, event.target.name, event.target.value);
    if (inputName === 'width') {
      setWidth(newValue);
    } else if (inputName === 'height') {
      setHeight(newValue);
    }
  };

  console.log('%c ready', 'color: #0b0', ready);
  console.log('%c video contraints', 'color: #b0b', videoConstraints);

  return (
    <div className="ContentContainer">
      <p>This is the webcam page</p>
      <div className="video-constraint-container">
        <label className="video-constraint-label">
          <span>Width: {width}</span>
          <input
            className="video-constraint"
            type="range"
            name="width"
            value={width}
            onChange={handleConstraintChange}
            min="0"
            max={IDEAL_VIDEO_CONSTRAINTS.width}
            step="10"
          />
        </label>
        <label className="video-constraint-label">
          <span>Height: {height}</span>
          <input
            className="video-constraint"
            type="range"
            name="height"
            value={height}
            onChange={handleConstraintChange}
            min="0"
            max={IDEAL_VIDEO_CONSTRAINTS.height}
            step="10"
          />
        </label>
      </div>
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
        onUserMediaError={handleOnUserMediaError}
        videoConstraints={videoConstraints}
      />
      }
      <p>Error: {error ? `${error.name}: ${error.message}`: 'none'}</p>
      <p>{error && error.stack}</p>
    </div>
  );
}
