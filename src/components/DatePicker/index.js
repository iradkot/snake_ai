import React from 'react';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { format } from 'date-fns'
import DateFnsUtils from "@date-io/date-fns";

const isDateLegal = (date) => {
    const dateDay = format(date, 'EEEEEE');
    return (dateDay === 'Sa' || dateDay === 'Fr')
}


const AppDatePicker = ({selectedDate, setSelectedDate, datePickerProps = {}, dateDisplayCondition}) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DatePicker
        autoOk
        disableFuture
        format="dd/MM/yy"
        label="Basic example"
        value={selectedDate}
        onChange={setSelectedDate}
        animateYearScrolling
        KeyboardButtonProps={{
            'aria-label': 'change date',
        }}
        shouldDisableDate={dateDisplayCondition || isDateLegal}
        {...datePickerProps}
        
    />
    </MuiPickersUtilsProvider>
);

export default AppDatePicker;
