import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { size as _size } from 'lodash';
import { FixedSizeList } from 'react-window';
import { useTable, useSortBy, useResizeColumns, useFlexLayout } from 'react-table';
// material ui imports
import TableHead from '@material-ui/core/TableHead';
// utils
import * as tableUtils from './utils';
import { reactTableColumnObjectPropTypes } from './types';
// components
import RenderColumnHeader from './RenderColumnHeader';
import RenderCell from './RenderCell';
// styles
import { StyledHeaderTableRow, StyledTable, StyledTableRow, StyleTableBody } from './styles';
import useDimensions from "../../hooks/useDimensions";

const Table = ({
                   columns,
                   data,
                   withChooseRowOption,
                   selectedRows,
                   setSelectedRows,
                   stickyHeader,
                   mouseState,
                   setMouseState,
                   hideHeader,
                   idSelector,
                   tableStyle,
                   headerRowStyle,
                   onRowClick,
                   rowStyle,
                   cellStyle,
               }) => {
    const isMouseDown = mouseState === 'down';
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 50, // minWidth is only used as a limit for resizing
            width: 50, // width is used for both the flex-basis and flex-grow
            maxWidth: 300, // maxWidth is only used as a limit for resizing
        }),
        [],
    );
    
    const headerProps = (props, { column }) =>
        tableUtils.getStyles(props, column && column.disableResizing, column && column.align);
    
    const cellProps = (props, { cell }) =>
        tableUtils.getStyles(
            props,
            cell.column && cell.column.disableResizing,
            cell.column && cell.column.align,
        );
    
    const hooks = [
        useSortBy,
        useFlexLayout,
        useResizeColumns,
        ...(withChooseRowOption
            ? [ tableUtils.selectionHook(data, idSelector, selectedRows, setSelectedRows) ]
            : []),
    ];
    
    const instance = useTable(
        {
            columns,
            data,
            getRowId: idSelector,
            defaultColumn,
        },
        ...hooks,
    );
    const { dispatch, getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = instance;
    /* listening to mouse state for resize fix of react table out of bounds issue
      React table is not listening to mouse leave which causes an error activating mouse down
      on the resizer and mouse up out of the table scope  which causes react table keep listening to
      mouse state, here we solve it manually by dispatching react-table 'columnDoneResizing' action
      based on their code: https://github.com/tannerlinsley/react-table/blob/master/src/plugin-hooks/useResizeColumns.js
     */
    useEffect(() => {
        const headers = headerGroups[0].headers.map(header => header.isResizing);
        const isResizing = headers.some(Boolean);
        if ( isResizing && !isMouseDown ) {
            dispatch({ type: 'columnDoneResizing' });
        }
    }, [ dispatch, headerGroups, mouseState, isMouseDown ]);
    const tableBodyRef = useRef();
    const tableBodySize = useDimensions(tableBodyRef);
    const RenderRow = useCallback(
        ({ index, style }) => {
            const row = rows[index];
            console.log({index, row});
            prepareRow(row);
            return (
                <StyledTableRow
                    isClickable={ !!onRowClick }
                    isSelected={ withChooseRowOption && !!selectedRows[idSelector(row)] }
                    { ...row.getRowProps({
                        onClick: onRowClick ? () => onRowClick(row) : undefined,
                        rowStyle,
                        style,
                    }) }
                >
                    { row.cells.map(cell => (
                        <RenderCell
                            cell={ cell }
                            cellProps={ cellProps }
                            cellStyle={ cellStyle }
                            { ...cell.getCellProps() }
                        />
                    )) }
                </StyledTableRow>
            );
        }
    );
    return (
        <StyledTable { ...getTableProps() } aria-label="sticky table" style={ tableStyle }>
            { !hideHeader && (
                <div>
                    { headerGroups.map(headerGroup => {
                        const { style, ...rest } = headerGroup.getHeaderGroupProps();
                        return (
                            <StyledHeaderTableRow
                                sticky={ stickyHeader ? 'true' : '' }
                                { ...rest }
                                style={ { ...style, ...headerRowStyle } }
                            >
                                { headerGroup.headers.map(column => {
                                    return (
                                        <RenderColumnHeader
                                            setMouseState={ setMouseState }
                                            mouseState={ mouseState }
                                            numOfSelectedRows={ withChooseRowOption && _size(selectedRows) }
                                            totalNumOfRows={ rows.length }
                                            column={ column }
                                            headerProps={ headerProps }
                                            key={ column.id }
                                        />
                                    );
                                }) }
                            </StyledHeaderTableRow>
                        );
                    }) }
                </div>
            ) }
            <StyleTableBody ref={tableBodyRef} {...getTableBodyProps()} stickyHeader={stickyHeader}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <StyledTableRow
                            isClickable={ !!onRowClick }
                            isSelected={ withChooseRowOption && !!selectedRows[idSelector(row)] }
                            { ...row.getRowProps({
                                onClick: onRowClick ? () => onRowClick(row) : undefined,
                                rowStyle,
                            }) }
                        >
                            { row.cells.map(cell => (
                                <RenderCell
                                    cell={ cell }
                                    cellProps={ cellProps }
                                    cellStyle={ cellStyle }
                                    { ...cell.getCellProps() }
                                />
                            )) }
                        </StyledTableRow>
                    );
                })}
            </StyleTableBody>
        </StyledTable>
    );
};

Table.defaultProps = {
    idSelector: tableUtils.getRowId,
    tableStyle: {},
    headerRowStyle: {},
};

Table.propTypes = {
    columns: PropTypes.arrayOf(reactTableColumnObjectPropTypes).isRequired, // columns data
    data: PropTypes.arrayOf(PropTypes.object).isRequired, // table data
    withChooseRowOption: PropTypes.bool,
    idSelector: PropTypes.func,
    setSelectedRows: PropTypes.func,
    selectedRows: PropTypes.objectOf(PropTypes.bool),
    withPagination: PropTypes.bool,
    headerProps: PropTypes.func,
    cellProps: PropTypes.func,
    mouseState: PropTypes.string,
    setMouseState: PropTypes.func,
    stickyHeader: PropTypes.bool,
    autoResetSelectedRows: PropTypes.bool,
    hideHeader: PropTypes.bool,
    tableStyle: PropTypes.object,
    headerRowStyle: PropTypes.object,
    rowStyle: PropTypes.arrayOf(PropTypes.string),
    cellStyle: PropTypes.arrayOf(PropTypes.string),
    onRowClick: PropTypes.func,
};

export default React.memo(Table);
