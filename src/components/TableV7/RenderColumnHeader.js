import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import classNames from 'classnames';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { StyledTableHeaderItem, StyledResizeHandler } from './styles';
import { reactTableColumnObjectPropTypes } from './types';

const ResizeHandle = React.memo(({ column, mouseState, setMouseState }) => {
  const handleMouseEvents = e => {
    e.preventDefault();
    // column.getResizerProps().onMouseDown(e);
    column.getResizerProps().onTouchStart(e);
    setMouseState('down');
  };
  const isMouseDown = mouseState === 'down';
  return (
    <StyledResizeHandler
      mouseState={mouseState}
      isResizing={column.isResizing && isMouseDown}
      onMouseDown={handleMouseEvents}
      // onTouchStart={handleMouseEvents}
    />
  );
});

ResizeHandle.propTypes = {
  column: reactTableColumnObjectPropTypes,
  mouseState: PropTypes.string,
  setMouseState: PropTypes.func,
};

const RenderColumnHeader = props => {
  const { column, mouseState, headerProps, setMouseState } = props;
  const columnType = get(column, 'type', 'none');
  const isCheckbox = columnType === 'checkbox';
  const sortable = get(column, 'sortable', false);
  const disableResizing = get(column, 'disableResizing', false);
  const { style, ...rest } = column.getHeaderProps(headerProps);
  const headerDefaultCellStyle = {borderWidth: 1};
  const headerItemCustomStyle = isCheckbox ? {justifyContent: 'center', alignItems: 'center', ...headerDefaultCellStyle} : headerDefaultCellStyle;
  return (
    <StyledTableHeaderItem
      padding={isCheckbox ? 'checkbox' : 'default'}
      className={classNames({ isCheckbox })}
      {...column.getHeaderProps(headerProps)}
      {...rest}
      style={{...style, ...headerItemCustomStyle}}
    >
      {sortable ? (
        <span>
          <TableSortLabel
            active={column.isSorted}
            direction={column.isSortedDesc ? 'desc' : 'asc'}
            {...column.getSortByToggleProps()}
          >
            {column.render('Header')}
          </TableSortLabel>
        </span>) :
       (column.render('Header'))
      }
      {!isCheckbox && !disableResizing && (
        <ResizeHandle mouseState={mouseState} setMouseState={setMouseState} column={column} />
      )}
    </StyledTableHeaderItem>
  );
};

RenderColumnHeader.propTypes = {
  column: reactTableColumnObjectPropTypes,
  mouseState: PropTypes.string,
  headerProps: PropTypes.func,
  setMouseState: PropTypes.func,
};

export default React.memo(RenderColumnHeader);
