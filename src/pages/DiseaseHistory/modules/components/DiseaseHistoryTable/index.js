import { Box, Flex, useMediaQuery } from '@chakra-ui/react'
import { Table, Tooltip } from 'antd'
import React, { memo, useMemo } from 'react'
import DeleteDiseaseHistoryTableRow from '../DeleteDiseaseHistoryTableRow';
import { useLocalStorageStore, useStore } from '../../../../../modules/store';
import DiseaseHistoryTableSetting from './DiseaseHistoryTableSetting';

function DiseaseHistoryTable(props) {

    const { selectedRowKey, setSelectedRowKey, form } = props

    const [isLargerThan400] = useMediaQuery('(min-width: 400px)')

    const diseaseHistoryTableSetting = useLocalStorageStore((store) => store.diseaseHistoryTableSetting)

    const dataSourceDiseaseHistoryTable = useStore((store) => store.dataSourceDiseaseHistoryTable)
    const setDataSourceDiseaseHistoryTable = useStore((store) => store.setDataSourceDiseaseHistoryTable)
    const setIsFieldsChange = useStore((store) => store.setIsFieldsChange)

    const visible = (dataIndex, defaultVisible = true) => {
        return diseaseHistoryTableSetting?.find(i => i.dataIndex === dataIndex) ? diseaseHistoryTableSetting.find(i => i.dataIndex === dataIndex).isVisible : defaultVisible
    }

    const onRowTable = (record, index) => {
        const { erN, prN } = record
        let initialForm = {
            ...record,
            ihkEr: erN ? 1 : 2,
            ihkPr: prN ? 1 : 2,
        }
        form.setFieldsValue(initialForm)
    }

    const columns = useMemo(() => {
        return [
            {
                title: "Breast",
                dataIndex: "complaintBreastType",
                key: "complaintBreastType",
                isVisible: visible('complaintBreastType'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Duration of illness",
                dataIndex: "durationOfIllness",
                key: "durationOfIllness",
                isVisible: visible('durationOfIllness'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Complaints",
                dataIndex: "complaintDescription",
                key: "complaintDescription",
                isVisible: visible('complaintDescription'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "ER",
                dataIndex: "erN",
                key: "erN",
                isVisible: visible('erN'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => {
                    if (value) {
                        return (
                            <Flex justifyContent='space-between' pr='2' >
                                <Box>Positive</Box>
                                <Box ml='2' color='blue.400' fontWeight='semibold'>{value}</Box>
                            </Flex>
                        )
                    } else {
                        return "Negative";
                    }
                },
            },
            {
                title: "PR",
                dataIndex: "prN",
                key: "prN",
                isVisible: visible('prN'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => {
                    if (value) {
                        return (
                            <Flex justifyContent='space-between' pr='2' >
                                <Box>Positive</Box>
                                <Box ml='2' color='blue.400' fontWeight='semibold'>{value}</Box>
                            </Flex>
                        )
                    } else {
                        return "Negative";
                    }
                },
            },
            {
                title: "HER2",
                dataIndex: "her2",
                key: "her2",
                isVisible: visible('her2'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value, row) => {
                    if (+value === 2) {
                        return (
                            <Flex justifyContent='space-between' pr='2' >
                                <Box>{value}</Box>
                                <Flex>
                                    <Box>FT:</Box>
                                    <Box ml='2' color='blue.400' fontWeight='semibold'>{row.her2FT}</Box>
                                </Flex>
                            </Flex>
                        )
                    } else {
                        return (
                            <Tooltip placement="topLeft" title={value}>
                                {value}
                            </Tooltip>
                        )
                    }
                },
            },
            {
                title: "K67",
                dataIndex: "k67",
                key: "k67",
                isVisible: visible('k67'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Delete",
                dataIndex: "delete",
                width: 50,
                key: "delete",
                isVisible: visible('delete'),
                ellipsis: true,
                align: 'center',
                render: (value, row, index) => {
                    const handleDelete = () => {
                        setIsFieldsChange(true)
                        let newData = dataSourceDiseaseHistoryTable.filter(i => i.id !== row.id)
                        setDataSourceDiseaseHistoryTable(newData)
                    }
                    return (
                        <DeleteDiseaseHistoryTableRow handleDelete={handleDelete} />
                    );
                },
            },
        ];
    }, [isLargerThan400, diseaseHistoryTableSetting, dataSourceDiseaseHistoryTable]);

    return (
        <Box display='flex' flexDirection='column'>

            <Box alignSelf='flex-end'>
                <DiseaseHistoryTableSetting columns={columns} />
            </Box>

            <Table
                size='small'
                bordered
                scroll={{
                    x: window.innerHeight
                }}
                pagination={false}
                columns={columns.filter(i => i.isVisible === true)}
                dataSource={dataSourceDiseaseHistoryTable}
                rowClassName={(record, index) =>
                    selectedRowKey === index + 1 ? 'ant-table-row-selected' : ''
                }
                onRow={(record, index) => ({
                    onClick: (e) => {
                        onRowTable(record, index)
                        setSelectedRowKey(index + 1)
                    },
                })}
            />

        </Box>
    )
}

export default memo(DiseaseHistoryTable)