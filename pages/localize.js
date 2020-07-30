import React from 'react';
import {defineMessages, FormattedMessage, IntlProvider} from 'react-intl';
import TextBox from '../components/TextBox';

const locale =
  (typeof window !== 'undefined' &&
    window.navigator &&
    window.navigator.locale) ||
  'en-US';

const messages = defineMessages({
  first: {
    id: 'localize.first',
    description: 'First test message',
    defaultMessage: 'First',
  },
  second: {
    id: 'localize.second',
    description: 'Second test message',
    defaultMessage: 'Second',
  },
});

const Localize = () => (
  <IntlProvider defaultLocale="en-US" locale={locale}>
    <div className="ContentContainer">
      <p>
        <FormattedMessage {...messages.first} />
      </p>
      <p>
        <FormattedMessage {...messages.second} />
      </p>
      <TextBox text="test" />
    </div>
  </IntlProvider>
);

export default Localize;
