import React, { memo } from "react";
import UseTabs from "./UseTabs";
import CureTabType from "./CureTabType";
import InputComponent from "./InputComponent";

const EditInputType = (props) => {
  const { dataIndex, title, inputRef, save, inputType } = props;
  if (
    dataIndex === "useTabs" ||
    (dataIndex === "cureTabName" && inputType === "select")
  ) {
    return (
      <UseTabs
        dataIndex={dataIndex}
        title={title}
        inputRef={inputRef}
        save={save}
      />
    );
  } else if (dataIndex === "cureTabType" && inputType === 'select') {
    return (
      <CureTabType
        dataIndex={dataIndex}
        title={title}
        inputRef={inputRef}
        save={save}
      />
    );
  } else {
    return (
      <InputComponent
        dataIndex={dataIndex}
        title={title}
        inputRef={inputRef}
        save={save}
      />
    );
  }
};

export default memo(EditInputType);
