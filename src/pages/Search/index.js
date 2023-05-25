import React, { memo } from "react";
import { Empty } from "antd";
import { Table } from "antd";
import PatientFormCalendar from "./modules/components/PatientFormCalendar";
import { Box } from "@chakra-ui/react";
import { useStore } from "../../modules/store";
import dayjs from "dayjs";
import { useOnRowTable } from "../../modules/hooks/useOnRowTable";
import Alert from "../../components/Alert";

const Search = () => {

    const dataSourceSearchTable = useStore((store) => store.dataSourceSearchTable)

    const columns = [
        {
            title: "Name",
            dataIndex: "patientName",
            key: "patientName",
        },
        {
            title: "Surname",
            dataIndex: "patientSurName",
            key: "patientSurName",
        },
        {
            title: "Patronymic",
            dataIndex: "patientPatronymic",
            key: "patientPatronymic",
        },
        {
            title: "Birth date",
            dataIndex: "birthDate",
            key: "birthDate",
            render: (value, row, index) => {
                if (!value) return ''
                return dayjs(value).format("DD-MM-YYYY");
            },
        },
        {
            title: "Birth Place",
            dataIndex: "birthPlace",
            key: "birthPlace",
        },
    ];

    const { onRowTable, isLoading } = useOnRowTable()

    return (
        <>
            <Alert />

            <Box boxShadow='xl' p='2' bg='pink.100' borderRadius='15px' >

                <Box boxShadow='xl' p='2' bg='pink.50' borderRadius='15px' >
                    <PatientFormCalendar />
                </Box>


                <Box mt='2'>

                    <Table
                        loading={isLoading}
                        size='small'
                        bordered
                        pagination={false}
                        scroll={{
                            x: window.innerHeight
                        }}
                        locale={{
                            emptyText: (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description="Patient not found..."
                                />
                            ),
                        }}
                        columns={columns}
                        dataSource={dataSourceSearchTable}
                        onRow={(record, index) => ({
                            onClick: (e) => onRowTable(record, index),
                        })}
                    />

                </Box>

            </Box>
        </>
    );
};

export default memo(Search);
