import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const { Search } = Input;

const onSearch = (value) => console.log(value);

const SearchComponent = () => (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <div style={{ flex: 1,width: '100%', height: '100%' }}>
            <Space direction="vertical" style={{ width: "300px", marginLeft:"330px", marginTop:"20px"}}>
                <Search
                    placeholder="Search by name..."
                    onSearch={onSearch}
                />
            </Space>
        </div>
    </div>
);

export default SearchComponent;