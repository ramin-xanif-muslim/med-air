import React, { useEffect, useRef, useState } from "react";
import EditInputType from "../components/EditInputType";

const useChildrenNode = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    form,
    inputType,
}) => {
    const [editing, setEditing] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            console.log('values',values);
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <EditInputType
                dataIndex={dataIndex}
                title={title}
                inputRef={inputRef}
                save={save}
                inputType={inputType}
            />
        ) : (
            <div
                style={{
                    paddingRight: 24,
                    height: "35px",
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return { childNode };
};

export default useChildrenNode;
