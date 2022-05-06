import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';


export const areEqual = (prevProps, nextProps) => prevProps.checked === nextProps.checked && prevProps.indeterminate === nextProps.indeterminate;

const checkBoxStyles = ({ styledTheme }) => ({
  root: {
    '&$checked': {
      color: styledTheme.color.brand.brandTeal,
    },
  },
  checked: {},
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

const TableCheckbox = React.memo(CustomCheckbox, areEqual);

export default React.memo((props) => {
  const checkboxSize = 20;
  return <TableCheckbox {...props} icon={<CheckBoxOutlineBlankIcon style={{ fontSize: checkboxSize }}/>}
                        checkedIcon={<CheckBoxIcon style={{ fontSize: checkboxSize }}/>}/>;
}, areEqual);
