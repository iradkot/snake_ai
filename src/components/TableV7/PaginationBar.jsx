import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { paginationObjectPropTypes } from './types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const PaginationBar = ({ paginationObject }) => {
  return (
    <div>
      <IconButton
        onClick={() => paginationObject.previousPage()}
        disabled={paginationObject.pageIndex <= 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft/>
      </IconButton>
      <IconButton
        onClick={() => paginationObject.nextPage()}
        disabled={paginationObject.pageIndex >= paginationObject.numOfPages - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight/>
      </IconButton>
      <span>
        Page{' '}
        <strong>
          {paginationObject.pageIndex + 1} of {paginationObject.numOfPages}
        </strong>{' '}
      </span>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={paginationObject.numOfRowsPerPage}
        onChange={paginationObject.onSetNumOfRowsPerPage}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </Select>
      {/*<Dropdown width="280px" data={data} value={data.find(item => item.value === 20).label} onOptionSelect={item => alert(item)} />*/}
      
      {/*onSetNumOfRowsPerPage*/}
      {/*numOfRowsPerPage*/}
    </div>
  );
};

PaginationBar.propTypes = {
  paginationObject: paginationObjectPropTypes,
};

export default PaginationBar;
