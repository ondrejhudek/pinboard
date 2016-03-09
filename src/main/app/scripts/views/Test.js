import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import TimePicker from 'material-ui/lib/time-picker/time-picker';

const handle = () => {
    console.log('handle')
}

const TestView = () => (
    <div>
        <DatePicker hintText="Portrait Dialog" container="inline" onClick={handle}/>
        <DatePicker hintText="Landscape Dialog" mode="landscape" />
        <DatePicker hintText="Dialog Disabled" disabled={true} />
        <TimePicker
            hintText="12hr Format"
        />
    </div>
);

export default TestView
