# neo_ui Table component
The table component for the neo_io app

## props:
* i18nPrefix, This table is counting on a specific i18n scheme in which every column name 
has an i18n prefix which is responsible for translating the column name to an i18n.currentLocale
* columns - array of columns which defines every column name and other values:
    * `name`: used for i18n translations
    * `sortable`: boolean value deciding if the current column is sortable.
    * `type`: use to display cell in relevant format, types:
        * `millisecondsDate`: display the table cell value in GMT date format, 
        <br/> for example, a cell with a value of `1580892873267` will be displayed as follows: 
        <br/> `Tue, 04 Feb 2020 12:24:52 GMT`
        * `number` display number cell
        * `string` display string cell
        * `boolean` display default boolean cell (using the `StyledYesNoCell` component)
        * `component` returns user custom component with cell data as props
        <br/> This type expect also a component prop to display in cell
        <br/> ***example***: { name: 'assigned_systems', type: 'component', component: myComponent}  
        * `link`: display text as link text, table expects a `callback` prop as well 
        <br/> on `link` press the cell data is being sent through the `callback` function
    * `callback` - optional - needed when `type` = `link`(see above)
        <br/>*Callback Example:* <br/> (cellData) => ` ({ cell: { row: { id: policyId } } }) => {
                                                     history.push(`${constants.EDIT_NETWORK_PROXY_POLICY_PATH}/${policyId}`)
                                                   }`
     
