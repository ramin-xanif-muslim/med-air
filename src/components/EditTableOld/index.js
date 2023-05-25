import { Form, Table } from "antd";
import React, { memo, useContext } from "react";
import useChildrenNode from "./hooks/useChildrenNode";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const form = useContext(EditableContext);

    const { childNode } = useChildrenNode({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        form,
    });

    return <td {...restProps}>{childNode}</td>;
};

const EditTable = (props) => {
    const {
        dataSource,
        setDataSource,
        defaultColumns,
        ...otherProps
    } = props;

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                inputType: col.inputType,
                handleSave,
            }),
        };
    });
    return (
        <div>
            <Table
                {...otherProps}
                size='small'
                components={components}
                bordered
                dataSource={dataSource}
                columns={columns}
                locale={{
                    emptyText: "",
                }}
                pagination={false}
            />
        </div>
    );
};

export default memo(EditTable);
