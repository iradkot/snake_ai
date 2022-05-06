import PropTypes from 'prop-types';

export const reactTableColumnObjectPropTypes = PropTypes.shape({
  getHeaderProps: PropTypes.func,
  getResizerProps: PropTypes.func,
  render: PropTypes.func,
  id: PropTypes.string,
  type: PropTypes.string,
  totalHeadCount: PropTypes.number,
  Header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
});

export const reactTableCellObjectPropTypes = PropTypes.shape({
  column: reactTableColumnObjectPropTypes,
  getCellProps: PropTypes.func,
  render: PropTypes.func,
});

export const paginationObjectPropTypes = PropTypes.shape({
  previousPage: PropTypes.func,
  nextPage: PropTypes.func,
  pageIndex: PropTypes.number,
  numOfPages: PropTypes.number,
  onSetNumOfRowsPerPage: PropTypes.func,
  numOfRowsPerPage: PropTypes.number
});
