import PropTypes from 'prop-types';
import React from 'react';
import Severity from 'components/common-ui/Severity/Severity';

const SeverityRender = props => {
  const {
    cellData: { value },
  } = props;
  return <Severity value={value} />;
};

SeverityRender.propTypes = {
  cellData: PropTypes.shape({
    value: PropTypes.string,
  }),
};

export default SeverityRender;