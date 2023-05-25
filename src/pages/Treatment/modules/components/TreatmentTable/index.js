import { Box, Flex, useMediaQuery } from '@chakra-ui/react'
import { Table, Tooltip } from 'antd'
import React, { memo, useMemo } from 'react'
import DeleteTreatmentTableRow from '../DeleteTreatmentTableRow';
import { useLocalStorageStore, useStore } from '../../../../../modules/store';
import TreatmentTableTableSetting from './TreatmentTableTableSetting';
import dayjs from 'dayjs';

function TreatmentTable(props) {

    const { selectedRowKey, setSelectedRowKey, form } = props

    const [isLargerThan400] = useMediaQuery('(min-width: 400px)')

    const treatmentTableTableSetting = useLocalStorageStore((store) => store.treatmentTableTableSetting)

    const dataSourceTreatmentTable = useStore((store) => store.dataSourceTreatmentTable)
    const setDataSourceTreatmentTable = useStore((store) => store.setDataSourceTreatmentTable)
    const setIsFieldsChange = useStore((store) => store.setIsFieldsChange)

    const visible = (dataIndex, defaultVisible = true) => {
        return treatmentTableTableSetting?.find(i => i.dataIndex === dataIndex) ? treatmentTableTableSetting.find(i => i.dataIndex === dataIndex).isVisible : defaultVisible
    }

    const onRowTable = (record, index) => {
        const {
            treatmentDate,
            erN,
            prN,
            SLNB,
            slnbReactive,
            slnbMts,
            axillaDesection,
            axillaDesectionReactive,
            axillaDesectionMts,
        } = record

        const SLNB_Value = SLNB ? SLNB : slnbReactive || slnbMts ? 1 : 2 

        const axillaDesectionValue = axillaDesection ? axillaDesection : axillaDesectionReactive || axillaDesectionMts ? 1 : 2 

        form.setFieldsValue({
            ...record,
            SLNB: SLNB_Value,
            axillaDesection: axillaDesectionValue,
            treatmentDate: dayjs(treatmentDate),
            ihkEr: erN ? 1 : 2,
            ihkPr: prN ? 1 : 2,
        })
    }

    const columns = useMemo(() => {
        return [
            {
                title: "Date",
                dataIndex: "treatmentDate",
                key: "treatmentDate",
                isVisible: visible('treatmentDate'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Brest type",
                dataIndex: "breastType",
                key: "breastType",
                isVisible: visible('breastType'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Treatment type",
                dataIndex: "treatmentTypeName",
                key: "treatmentTypeName",
                isVisible: visible('treatmentTypeName'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Sub type",
                dataIndex: "treatmentSubType",
                key: "treatmentSubType",
                isVisible: visible('treatmentSubType'),
                ellipsis: true,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Sub sub type",
                dataIndex: "treatmentSubSubType",
                key: "treatmentSubSubType",
                isVisible: visible('treatmentSubSubType'),
                ellipsis: true,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Description",
                dataIndex: "treatmentTypeDesc",
                key: "treatmentTypeDesc",
                isVisible: visible('treatmentTypeDesc'),
                ellipsis: true,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "ER",
                dataIndex: "ihkEr",
                key: "ihkEr",
                isVisible: visible('ihkEr'),
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
                dataIndex: "ihkPr",
                key: "ihkPr",
                isVisible: visible('ihkPr'),
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
                        let newData = dataSourceTreatmentTable.filter(i => i.id !== row.id)
                        setDataSourceTreatmentTable(newData)
                    }
                    return (
                        <DeleteTreatmentTableRow handleDelete={handleDelete} />
                    );
                },
            },
        ];
    }, [isLargerThan400, treatmentTableTableSetting, dataSourceTreatmentTable]);

    return (
        <Box display='flex' flexDirection='column'>

            <Box alignSelf='flex-end'>
                <TreatmentTableTableSetting columns={columns} />
            </Box>

            <Table
                size='small'
                bordered
                scroll={{
                    x: window.innerHeight
                }}
                pagination={false}
                columns={columns.filter(i => i.isVisible === true)}
                dataSource={dataSourceTreatmentTable}
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

export default memo(TreatmentTable)