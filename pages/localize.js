import { useState, useEffect } from "react";
import {defineMessages, FormattedMessage, IntlProvider} from 'react-intl';
import areIntlLocalesSupported from 'intl-locales-supported';
// import usePromise from 'react-promise';
import TextBox from '../components/TextBox';
import englishMessages from '../intl/dist/en-US';
// import esMessages from '../intl/dist/es-ES';
// import zhMessages from '../intl/dist/zh-CN';

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

// const locale = 'en-US';
const locale = 'es-ES';
// const locale = 'zh-CN';

// const locale =
//   (typeof window !== 'undefined' &&
//     window.navigator &&
//     (window.navigator.userLanguage || window.navigator.language)) ||
//   'en-US';


/*
var localesMyAppSupports = [
  'en-US',
  'es-ES',
  'zh-CN',
];

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(localesMyAppSupports)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and patch the constructors we need with the polyfill's.
    var IntlPolyfill    = require('intl');
    Intl.NumberFormat   = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require('intl');
}
*/

  // const languageCode = locale.split('-')[0];

  /*
if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require(`@formatjs/intl-pluralrules/dist/locale-data/${languageCode}`);
}

if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require(`@formatjs/intl-relativetimeformat/dist/locale-data/${languageCode}`);
}
*/

const Localize = () => {
  const [appMessages, setMessages] = useState(englishMessages);

  useEffect(() => {
    async function importLocaleJsons(locale) {
      try {
        const localeMessages = await import(
          `../intl/dist/${locale}.json`
        );
        setMessages(localeMessages.default);
      } catch(error) {
        console.warn('Unsupported locale');
      }
    }

    importLocaleJsons(locale);
  }, [locale]);

  return (
    <IntlProvider defaultLocale="en-US" locale={locale} messages={appMessages}>
      <div>
        <FormattedMessage {...messages.first} />
      </div>
      <div>
        <FormattedMessage {...messages.second} />
      </div>
      <TextBox text="test" />
    </IntlProvider>
  )
};

export default Localize;
