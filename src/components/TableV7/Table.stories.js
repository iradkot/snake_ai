import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { number, boolean } from '@storybook/addon-knobs';
import makeData from 'utils/devUtils/makeData';
import Table from './index';

const Component = styled.div`
  background-color: #1e8500;
`;
const myComponent = ({ cellData, ...props }) => {
  return <Component>{cellData.value}</Component>;
};
const stories = storiesOf('Table', module);
stories.add('Table Component', () => {
  const cellLinkCallback = cellData => {
    alert('cell data was printed at the console');
  };

  const columnsObjectsArray = [
    { name: 'priority', type: 'number', sortable: true, width: 100, minWidth: 100, disableResizing: true },
    { name: 'name', type: 'link', callback: cellLinkCallback, sortable: true, width: 100, minWidth: 100 },
    { name: 'last_deploy_time', type: 'millisecondsDate', sortable: true },
    { name: 'assigned_systems', type: 'component', component: myComponent, width: 150, minWidth: 150 },
    // { name: 'assigned_systems', type: 'link', sortable: true, callback: cellLinkCallback },
    { name: 'pending_changes', type: 'boolean', width: 150, minWidth: 150 },
  ];

  const [selectedRows, setSelectedRows] = useState({});
  const withChooseRowOption = boolean('withChooseRowOption', true);
  const stickyHeader = boolean('stickyHeader', true);
  const withPagination = boolean('withPagination', false);
  const isRowAction = boolean('onRowClick', true);
  const isTableLoading = boolean('isTableLoading', false);
  const hideHeader = boolean('hideHeader', false);
  const size = number('data size', 30) || 0;
  const containerWidth = number('Container width(in percentages - %, max 100 min 0)', 80);
  const containerHeight = number('Container height(in percentages - %, max 100 min 0)', 90);
  const [data, setData] = useState(makeData(size));
  if (data.length !== size) {
    setData(makeData(size));
  }
  let pageIndex;
  let numOfPages;
  if (withPagination) {
    pageIndex = number('page index', 0);
    numOfPages = number('number of pages', 5);
  }
  const paginationObject = {
    previousPage: () => alert('pressed go to "previousPage"'),
    nextPage: () => alert('pressed go to "nextPage"'),
    pageIndex,
    numOfPages,
  };
  const onRowClick = row => {
    console.log(row);
  };
  const hideBorder = boolean('hide borders?(table cat get custom styles) ', false);
  return (
    <div style={{ width: `${containerWidth}%`, height: `${containerHeight}%`, display: 'flex' }}>
      <Table
        columns={columnsObjectsArray}
        data={data}
        i18nPrefix="network_policy"
        withChooseRowOption={withChooseRowOption}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        withPagination={withPagination}
        paginationObject={paginationObject}
        stickyHeader={stickyHeader}
        loading={isTableLoading}
        hideHeader={hideHeader}
        tableStyle={hideBorder ? {border: '0 solid yellow'} : {}}
        headerRowStyle={hideBorder ? {border: '0 solid yellow'} : {}}
        onRowClick={isRowAction? onRowClick : undefined}
      />
    </div>
  );
});
