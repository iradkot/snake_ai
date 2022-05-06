import React, { useState } from 'react';
import * as tableUtils from './utils';
import PropTypes from 'prop-types';
import { paginationObjectPropTypes } from './types';
import TableWrapper from './TableWrapper';
import Table from './Table';

const TableComponent = ({
  columns,
  data,
  i18nPrefix,
  withChooseRowOption,
  setSelectedRows,
  selectedRows,
  initialSelectedRowIds,
  withPagination,
  paginationObject,
  loading,
  stickyHeader = true,
  autoResetSelectedRows,
  hideHeader = false,
  tableStyle,
  headerRowStyle,
  tableWrapperStyle,
  idSelector,
  onRowClick,
  ...rest
}) => {
  const parsedColumnsData = React.useMemo(
    () => tableUtils.parseColumnsData(columns, i18nPrefix),
    [columns, i18nPrefix],
  );
  const [mouseState, setMouseState] = useState('unknown');
  return (
    <TableWrapper
        stickyHeader={stickyHeader}
      columns={columns}
      i18nPrefix={i18nPrefix}
      withPagination={withPagination}
      paginationObject={paginationObject}
      loading={loading}
      mouseState={mouseState}
      setMouseState={setMouseState}
      tableWrapperStyle={tableWrapperStyle}
    >
      <Table
        hideHeader={hideHeader}
        mouseState={mouseState}
        setMouseState={setMouseState}
        columns={[...parsedColumnsData]}
        autoResetSelectedRows={autoResetSelectedRows}
        data={data}
        withChooseRowOption={withChooseRowOption}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        initialSelectedRowIds={initialSelectedRowIds}
        i18nPrefix={i18nPrefix}
        stickyHeader={stickyHeader}
        tableStyle={tableStyle}
        headerRowStyle={headerRowStyle}
        onRowClick={onRowClick}
        idSelector={idSelector}
        {...rest}
      />
    </TableWrapper>
  );
};

TableComponent.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  i18nPrefix: PropTypes.string, // i18n key prefix
  withChooseRowOption: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedRows: PropTypes.objectOf(PropTypes.bool),
  setSelectedRows: PropTypes.func,
  initialSelectedRowIds: PropTypes.arrayOf(PropTypes.string),
  withPagination: PropTypes.bool,
  paginationObject: paginationObjectPropTypes,
  stickyHeader: PropTypes.bool,
  loading: PropTypes.bool,
  autoResetSelectedRows: PropTypes.bool,
  hideHeader: PropTypes.bool,
  tableStyle: PropTypes.object,
  onRowClick: PropTypes.func,
  headerRowStyle: PropTypes.object,
  tableWrapperStyle: PropTypes.object,
  idSelector: PropTypes.func,
};

export default TableComponent;
