import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

class PublishTitle extends Component {
  render() {
    const { publishTitle } = this.props;
    const { changePublishTitle } = this.props;
    return (
      <TextField
        floatingLabelFixed
        floatingLabelText="发布标题"
        autoFocus
        rows={1}
        rowsMax={1}
        value={publishTitle}
        onChange={(event) => {
          changePublishTitle(event.target.value);
        }}
      />
    );
  }
}

PublishTitle.propTypes = {
  publishTitle: PropTypes.string.isRequired,
  changePublishTitle: PropTypes.func.isRequired,
};

export default PublishTitle;
