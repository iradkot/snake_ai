import PropTypes from 'prop-types';
import React from 'react';
import Channel from 'components/common-ui/Channel/Channel';

const ChannelRender = props => {
  const {
    cellData: { value },
  } = props;
  return <Channel value={value} />;
};

ChannelRender.propTypes = {
  cellData: PropTypes.shape({
    value: PropTypes.string,
  }),
};

export default ChannelRender;
