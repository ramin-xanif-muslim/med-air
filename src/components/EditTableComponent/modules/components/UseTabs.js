import { Form, Select } from "antd";
import React, { memo, useState } from "react";
import { useQuery } from "react-query";
import sendRequest from "../../../../modules/api/sendRequest";

const { Option } = Select;


const fetchManagersTabs = async () => {
  let res = await sendRequest("managers/tabs");
  if (res?.data) return res.data
};

const UseTabs = ({ dataIndex, title, inputRef, save }) => {

  const onBlur = () => {
    let inputType = 'select'
    save(inputType)
  };

  const { data: managersList, isLoading, refetch } = useQuery(["managers/tabs"], fetchManagersTabs,{
    enabled: false,
  })

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
        loading={isLoading}
        onFocus={refetch}
      >
        {managersList?.map((c, index) => {
          return (
            <Option key={c.cureTabId} value={JSON.stringify(c)}>
              {c.cureTabName}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

export default memo(UseTabs);
