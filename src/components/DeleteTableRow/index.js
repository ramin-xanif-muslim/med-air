import { Popconfirm, Typography } from "antd";
import React, { memo } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Box } from "@chakra-ui/react";

function DeleteTableRow({ onClick }) {

    return (
        <Typography.Link>
            <Box color='red' onClick={(e) => e.stopPropagation()}>
                <Popconfirm
                    title="Are you sure you want to delete this item?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={onClick}
                >
                    <DeleteOutlined/>
                </Popconfirm>
            </Box>
        </Typography.Link>
    );
}

export default memo(DeleteTableRow);
