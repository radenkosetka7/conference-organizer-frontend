import React from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const DateComponent = () => {
        const handleDateChange = (dates, dateStrings) => {
                if (dates) {
                        const [startDate, endDate] = dates;
                        console.log('Početni datum:', startDate);
                        console.log('Završni datum:', endDate);
                        console.log('Početni datum (string):', dateStrings[0]);
                        console.log('Završni datum (string):', dateStrings[1]);
                } else {
                        console.log('Nije odabran nijedan datum.');
                }
        };

        return (
            <div>
                    <Space>
                            <RangePicker style={{height: '33px', marginTop:"20px", marginLeft:"-245px" }} onChange={handleDateChange} />
                    </Space>
            </div>
        );
};

export default DateComponent;