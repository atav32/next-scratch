import React from 'react';
import {defineMessages, FormattedMessage, IntlProvider} from 'react-intl';
import TextBox from '../components/TextBox';

const languages = {
  'de-DE': 'Deutsche',
  'en-US': 'English (United States)',
  'es-ES': 'Español (España)',
  'es-419': 'Español (America Latina)',
  'fr-FR': 'Français (France)',
  'ja-JP': '日本語',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
}

const locales = {
  de: {
    code: 'de-DE',
    name: 'Deutsche'
  },
  en: {
    code: 'en-US',
    name: 'English (United States)',
  },
  es: {
    code: 'es-ES',
    name: 'Español (España)',
  },
  'es-MX': {
    code: 'es-419',
    name: 'Español (America Latina)',
  },
  fr: {
    code: 'fr-FR',
    name: 'Français (France)',
  },
  ja: {
    code: 'ja-JP',
    name: '日本語',
  },
  zh: {
    code: 'zh-Hans',
    name: '简体中文',
  },
  'zh-CN': {
    code: 'zh-Hans',
    name: '简体中文',
  },
  'zh-TW': {
    code: 'zh-Hant',
    name: '繁體中文',
  },
  'zh-HK': {
    code: 'zh-Hant',
    name: '繁體中文',
  },
};

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

const Selector = () => {
  const [language, setLanguage] = React.useState('en-US');
  const handleLanguageChange = (event) => {
    console.log('%c language change', 'color: #b0b', event.target.value);
  };

  return (
    <select name="language" className="language-selector" onChange={handleLanguageChange}>
      {Object.entries(languages).map(([code, lang]) => (
        <option value={code} selected={code === language}>{lang}</option>
      ))}
    </select>
  );
};

const localeReducer = () => {};

const LocaleContext = React.createContext(['en-US', localeReducer]);

const Localize = () => {
  const [locale, dispatchLocale] = React.useReducer(localeReducer, 'en-US');
  return (
    <div className="ContentContainer">
      <Selector />
      <IntlProvider defaultLocale="en-US" locale={locale}>
        {locale}
        <p>
          <FormattedMessage {...messages.first} />
        </p>
        <p>
          <FormattedMessage {...messages.second} />
        </p>
        <TextBox text="test" />
      </IntlProvider>
    </div>
  );
};

export default Localize;
