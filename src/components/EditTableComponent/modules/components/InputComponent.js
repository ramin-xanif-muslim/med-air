import { Form, Input } from 'antd';
import React, { memo } from 'react';

const InputComponent = ({ dataIndex, title, inputRef, save }) => {
    return (
        <Form.Item
            name={dataIndex}
        >
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
    );
};

export default memo(InputComponent);