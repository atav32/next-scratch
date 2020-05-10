import {configureToMatchImageSnapshot} from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: {
    threshold: 0.1,
  },
  failureThreshold: 0.0001,
  failureThresholdType: 'percent',
  blur: 1,
});
expect.extend({toMatchImageSnapshot});
