import {defineMessages, FormattedMessage} from 'react-intl';

import styles from './TextBox.css';

const messages = defineMessages({
  title: {
    id: 'textbox.title',
    description: 'Textbox component title',
    defaultMessage: 'Title',
  },
});

const TextBox = ({text}) => (
  <div className={styles.TextBox}>
    <div className={styles.title}>
      <FormattedMessage {...messages.title} />
    </div>
    <div className={styles.text}>{text}</div>
  </div>
);

export default TextBox;
