import { Select } from 'antd';

const FilterComponent = (props) => (
    <Select allowClear
        defaultValue="Status"
        style={{
            width: "100px", marginLeft:"10px", marginTop:"20px"
        }}
        onChange={props.onSelectConferences}
        options={[
            {
                label: 'Status',
                options: [
                    {
                        label: 'Active',
                        value: 0,
                    },
                    {
                        label: 'Finished',
                        value: 1,
                    },
                ],
            }
        ]}
    />
);
export default FilterComponent;