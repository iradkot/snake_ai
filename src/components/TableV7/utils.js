import React from 'react';
import { size, filter } from 'lodash';
import { checkboxSize } from './styles';
import TableCheckbox from './TableCheckbox';

const sortTypes = {
  // basic / datetime / alphanumeric - check: https://github.com/tannerlinsley/react-table/blob/master/docs/api/useSortBy.md
  millisecondsDate: 'basic',
};

export const parseColumnsData = (columns) =>
  columns.map(({ name, type, ...rest }) => {
    return {
      Header: name,
      accessor: name,
      type,
      sortType: sortTypes[type] || 'basic',
      ...rest,
    };
  });

// eslint-disable-next-line no-unused-vars
export const getStyles = (props, disableResizing = false, align = 'left') => [
  props,
  disableResizing,
  {
    style: {
      display: 'flex',
    },
  },
];

export const selectionHook = (data, idSelector, selectedRows, setSelectedRows) => hooks => {
  hooks.columns.push(columnsArr => {
    return [
      // Make a column for selection both at header and for each row
      {
        id: 'selection',
        type: 'checkbox',
        minWidth: checkboxSize,
        width: checkboxSize,
        maxWidth: checkboxSize,
        display: 'flex',
        disableResizing: true,
        disableGroupBy: true,
        Header: () => {
          const numOfSelectedRows = size(filter(selectedRows));
          const checked = data.length && numOfSelectedRows === data.length;
          const indeterminate = !checked && !!numOfSelectedRows;
          const handleHeaderCheckboxPress = () => {
            const newSelectedRows = {};
            if (!checked) {
              data.forEach(row => {
                newSelectedRows[idSelector(row)] = true;
              });
            }
            setSelectedRows(newSelectedRows);
          };
          return (
            <TableCheckbox checked={checked} indeterminate={indeterminate} onChange={handleHeaderCheckboxPress}/>
          );
        },
        Cell: ({ row }) => {
          const rowId = idSelector(row);
          const isCurrentRowSelected = !!selectedRows[rowId];
          return <TableCheckbox
            checked={isCurrentRowSelected}
            onChange={({ target: { checked } }) => {
              if (checked !== isCurrentRowSelected) {
                if (!checked) {
                  const {[rowId]: omit, ...newSelectedRows}  = selectedRows;
                  setSelectedRows(newSelectedRows)
                } else {
                  setSelectedRows({ ...selectedRows, [rowId]: true });
                }
              }
            }}/>;
        },
      },
      ...columnsArr,
    ];
  });
  hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
    // fix the parent group of the selection button to not be resizable
    const selectionGroupHeader = headerGroups[0].headers[0];
    selectionGroupHeader.canResize = false;
  });
};

// getRowId is the id where we tell the table what id to use for the row
export const getRowId = ({ id, _id }) => id || _id;
