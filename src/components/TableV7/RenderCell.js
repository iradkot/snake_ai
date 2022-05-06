import React from 'react';
import { get } from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { reactTableCellObjectPropTypes } from './types';
import { StyledTableCell, StyledLink, StyledYesNoCell } from './styles';

const RenderCell = props => {
  const { cell, cellProps, cellStyle } = props;
  const columnType = get(cell.column, 'type', 'none');
  const cellOptions = {
    link: () => {
      const callback = get(cell.column, 'callback');
      return <StyledLink onClick={() => callback(props)}>{cell.render('Cell')}</StyledLink>;
    },
    boolean: () => StyledYesNoCell(cell.value, cell),
    component: () => {
      const Comp = get(cell.column, 'component');
      return <Comp cellData={cell} />;
    },
  };
  const isCheckbox = columnType === 'checkbox';
  const CellComponent = cellOptions[columnType] || (() => cell.render('Cell'));
  return (
    <StyledTableCell
      padding={isCheckbox ? 'checkbox' : 'default'}
      className={classNames({ isCheckbox })}
      {...cell.getCellProps(isCheckbox ? {} : cellProps)}
      cellStyle={cellStyle}
    >
      <CellComponent />
    </StyledTableCell>
  );
};

RenderCell.propTypes = {
  cell: reactTableCellObjectPropTypes,
  cellProps: PropTypes.func,
  cellStyle: PropTypes.arrayOf(PropTypes.string),
};

export default React.memo(RenderCell);
