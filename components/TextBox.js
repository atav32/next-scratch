import {defineMessages, FormattedMessage} from 'react-intl';

import style from './TextBox.scss';

const messages = defineMessages({
  title: {
    id: 'textbox.title',
    description: 'Textbox component title',
    defaultMessage: 'Title',
  },
});

const TextBox = ({text}) => (
  <div className={style.TextBox}>
    <div className={style.title}>
      <FormattedMessage {...messages.title} />
    </div>
    <div className={style.text}>{text}</div>
  </div>
);

export default TextBox;
