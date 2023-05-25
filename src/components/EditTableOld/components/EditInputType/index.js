import React, { memo } from "react";
import InputComponent from "../InputComponent";

const EditInputType = (props) => {
    const { dataIndex, title, inputRef, save, } = props;

    return (
        <InputComponent
            dataIndex={dataIndex}
            title={title}
            inputRef={inputRef}
            save={save}
        />
    );
};

export default memo(EditInputType);
