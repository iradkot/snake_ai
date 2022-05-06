import ActivityType from 'components/common-ui/ActivityType/ActivityType';
import PropTypes from 'prop-types';
import React from 'react';

const ActivityTypeRender = props => {
  const {
    cellData: { value },
  } = props;
  return <ActivityType value={value} />;
};

ActivityTypeRender.propTypes = {
  cellData: PropTypes.shape({
    value: PropTypes.string,
  }),
};

export default ActivityTypeRender;
