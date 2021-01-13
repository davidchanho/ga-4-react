import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withTracker } from '../src/index';

Object.defineProperty(global.document, 'readyState', {
  get() {
    return 'interactive';
  },
});

beforeAll(() => {
  global.document.head.innerHTML = '';
});

const Tracker = withTracker(props => <>{JSON.stringify(props)}</>);

describe('GA4R withTracker', () => {
  it('Rendering', async done => {
    const { container } = render(
      <Tracker path="myCustomPath" gaCode="GA-CODE"></Tracker>
    );

    setTimeout(() => {
      global.document.dispatchEvent(new Event('readystatechange'));
    }, 100);

    setTimeout(() => {
      const LoadEvent = document.createEvent('HTMLEvents');
      LoadEvent.initEvent('load', true, true);
      const targets = global.document.head.querySelectorAll('script');
      if (targets) {
        targets.forEach(target => target.dispatchEvent(LoadEvent));
      }
    }, 1000);

    setTimeout(() => {
      expect(container.innerHTML).toMatchSnapshot();
      expect(global.document.head).toMatchSnapshot();
      done();
    }, 2000);
  });

  it('Rendering, after GA4React initialization', async done => {
    const { container } = render(
      <Tracker path="myCustomPath" gaCode="GA-CODE"></Tracker>
    );

    setTimeout(() => {
      global.document.dispatchEvent(new Event('readystatechange'));
    }, 100);

    setTimeout(() => {
      const LoadEvent = document.createEvent('HTMLEvents');
      LoadEvent.initEvent('load', true, true);
      const targets = global.document.head.querySelectorAll('script');
      if (targets) {
        targets.forEach(target => target.dispatchEvent(LoadEvent));
      }
    }, 1000);

    setTimeout(() => {
      expect(container.innerHTML).toMatchSnapshot();
      expect(global.document.head).toMatchSnapshot();
      done();
    }, 2000);
  });
});
