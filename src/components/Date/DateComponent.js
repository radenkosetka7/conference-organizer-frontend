import React from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const DateComponent = (props) => {

        return (
            <div>
                    <Space>
                            <RangePicker allowClear style={{height: '33px', marginTop:"20px", marginLeft:"-245px" }} onChange={props.handleDateChanged} />
                    </Space>
            </div>
        );
};

export default DateComponent;