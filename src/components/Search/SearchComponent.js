import React from 'react';
import { Input, Space } from 'antd';
import {useState} from "react";
const { Search } = Input;


const SearchComponent = (props) => {
    return (
        <div style={{display: 'flex', width: '100%', height: '100%'}}>
            <div style={{flex: 1, width: '100%', height: '100%'}}>
                <Space direction="vertical" style={{width: "300px", marginLeft: "330px", marginTop: "20px"}}>
                    <Search
                        placeholder="Search by name..."
                        onSearch={props.onSearchConferences}
                    />
                </Space>
            </div>
        </div>
    );
};

export default SearchComponent;