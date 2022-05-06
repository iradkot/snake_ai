import React from 'react';
import styled from 'styled-components';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { FormattedMessage } from 'react-intl';

export const checkboxSize = 45;

export const StyledTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  min-height: ${({ wrapperSize }) => wrapperSize.height}px;
  max-height: 100%;
  position: relative;
  border: 1px solid black;
  border-top-width: 0;
  box-sizing: border-box;
  
`;

export const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  ${({ stickyHeader }) => !stickyHeader && 'overflow: auto'};
`;

export const StyledTable = styled.div`
  box-sizing: border-box;
  height: 100%;;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyleTableBody = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  ${({ stickyHeader }) => stickyHeader && 'overflow: auto'};
`;

export const StyledHeaderTableRow = styled.div`
  background: #ffffff;
  top: 0;
  z-index: 2;
  border-top: 1px solid black;
  border-bottom:  1px solid black;
  ${({ sticky }) => sticky && 'position: sticky'};
  
`;

export const StyledTableCell = styled.div`
  padding: 10px;
  display: flex;
  text-align: left;
  &.isCheckbox {
    max-width: ${checkboxSize}px;
  }
  ${({cellStyle}) => cellStyle};
`;
export const StyledTableHeaderItem = styled(StyledTableCell)`
  &.MuiTableCell-head {
    font-weight: bold;
    color: black;
    font-size: 14px;
  }
`;
/* I used 'styled' in this way to fix - "Unknown Prop Warning" of react: (https://reactjs.org/warnings/unknown-prop.html):
issue: https://github.com/styled-components/styled-components/issues/2131
fix: https://stackoverflow.com/questions/49834251/how-to-extend-styled-component-without-passing-props-to-underlying-dom-element
*/

// &:hover {
//     background: ${({ isSelected }) =>
//       isSelected ? 'blue' : 'grey'};
//   };
export const StyledTableRow = styled.div`
  cursor: ${({ isClickable }) => isClickable && 'pointer'};
  background: ${({ isSelected }) =>
    isSelected ? 'blue' :'white'};
  // here comes the hover comment from above
  align-items: center;
  justify-content: center;
  ${({rowStyle}) => rowStyle};
`;

export const StyledLink = styled.a`
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const StyledStatusVerticalLine = styled.div`
  width: 5px;
  background: ${({ boolValue }) => (boolValue ? '#C7E7B6' : '#E4E6E7')};
  margin-right: 5px;
`;

export const StyledYesNoCell = boolValue => {
  const id = boolValue ? 'general_yes' : 'general_no';
  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <StyledStatusVerticalLine boolValue={boolValue} />
      <p>
        <FormattedMessage id={id} />
      </p>
    </div>
  );
};

const borderSize = 5;
export const StyledResizeHandler = styled.div`
  display: none;
  ${StyledTableHeaderItem}:hover & {
    ${({ mouseState }) => mouseState !== 'down' && 'display: inline-block;'};
  }
  ${({ isResizing }) => isResizing && 'display: inline-block;'};
  box-sizing: border-box;
  cursor: col-resize;
  margin-right: ${borderSize / 2}px;
  border-right: #00af9a ${borderSize}px solid;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
  z-index: 1;
  ${'' /* prevents from scrolling while dragging on touch devices */};
  touch-action: none;
  &.isResizing {
    border-right: #00af9a 2px solid;
  }
`;
