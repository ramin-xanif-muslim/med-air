import { Form, Select } from 'antd';
import React, { memo } from 'react';

const { Option } = Select;

const CureTabType = ({ dataIndex, title, inputRef, save }) => {

    const onBlur = () => {
        let inputType = 'select'
        save(inputType)
    }

    return (
        <Form.Item
            style={{
                margin: 0,
            }}
            name={dataIndex}
        >
            <Select
                allowClear
                ref={inputRef}
                lazyLoad
                onBlur={onBlur}
            >
                <Option value="Tablet">Tablet</Option>
                <Option value="Ampoule">Ampoule</Option>
                <Option value="Drops">Drops</Option>
            </Select>
        </Form.Item>
    );
};

export default memo(CureTabType);