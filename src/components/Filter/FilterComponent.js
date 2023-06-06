import { Select } from 'antd';
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const FilterComponent = () => (
    <Select
        defaultValue="Status"
        style={{
            width: "100px", marginLeft:"10px", marginTop:"20px"
        }}
        onChange={handleChange}
        options={[
            {
                label: 'Status',
                options: [
                    {
                        label: 'Active',
                        value: 'active',
                    },
                    {
                        label: 'Finished',
                        value: 'finished',
                    },
                ],
            }
        ]}
    />
);
export default FilterComponent;