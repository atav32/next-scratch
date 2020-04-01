import {defineMessages, FormattedMessage} from 'react-intl';

import '../styles/TextBox.css';

const messages = defineMessages({
  title: {
    id: 'textbox.title',
    description: 'Textbox component title',
    defaultMessage: 'Title',
  },
});

const TextBox = ({text}) => (
  <div className="TextBox">
    <div className="TextBox__title">
      <FormattedMessage {...messages.title} />
    </div>
    <div className="TextBox__text">{text}</div>
  </div>
);

export default TextBox;
