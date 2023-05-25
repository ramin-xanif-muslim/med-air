import { Box, useMediaQuery } from '@chakra-ui/react'
import { Table, Tooltip } from 'antd'
import React, { memo, useMemo } from 'react'
import { useLocalStorageStore, useStore } from '../../../../../modules/store'
import DeleteAnalysisTableRow from '../DeleteAnalysisTableRow'
import AnalysisTableSetting from './AnalysisTableSetting'
import dayjs from 'dayjs'

function AnalysisTable(props) {

    const { selectedRowKey, setSelectedRowKey, form } = props

    const [isLargerThan400] = useMediaQuery('(min-width: 400px)')

    const analysisTableSetting = useLocalStorageStore((store) => store.diseaseHistoryTableSetting)

    const dataSourceAnalysisTable = useStore((store) => store.dataSourceAnalysisTable)
    const setDataSourceAnalysisTable = useStore((store) => store.setDataSourceAnalysisTable)
    const setIsFieldsChange = useStore((store) => store.setIsFieldsChange)

    const visible = (dataIndex, defaultVisible = true) => {
        return analysisTableSetting?.find(i => i.dataIndex === dataIndex) ? analysisTableSetting.find(i => i.dataIndex === dataIndex).isVisible : defaultVisible
    }

    const onRowTable = (record, index) => {
        const { analyzesType, analyzesSubType, date } = record
        form.setFieldsValue({
            ...record,
            date: dayjs(date),
            analyzesSubType: analyzesType === "Other healthcare area" ? "" : analyzesSubType
        })
    }

    const columns = useMemo(() => {
        return [
            {
                title: "Breast Type",
                dataIndex: "analyzesType",
                key: "analyzesType",
                isVisible: visible('analyzesType'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Sub Type",
                dataIndex: "analyzesSubType",
                key: "analyzesSubType",
                isVisible: visible('analyzesSubType'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Description",
                dataIndex: "analyzesDesc",
                key: "analyzesDesc",
                isVisible: visible('analyzesDesc'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Date",
                dataIndex: "date",
                key: "date",
                isVisible: visible('date'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Image",
                dataIndex: "analyzesContentName",
                key: "analyzesContentName",
                isVisible: visible('analyzesContentName'),
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
                width: 50,
                align: 'center',
                dataIndex: "delete",
                key: "delete",
                isVisible: visible('delete'),
                ellipsis: true,
                render: (value, row, index) => {
                    const handleDelete = () => {
                        setIsFieldsChange(true)
                        let newData = dataSourceAnalysisTable.filter(i => i.id !== row.id)
                        setDataSourceAnalysisTable(newData)
                    }
                    return (
                        <DeleteAnalysisTableRow handleDelete={handleDelete} />
                    );
                },
            },
        ];
    }, [isLargerThan400, analysisTableSetting, dataSourceAnalysisTable]);

    return (
        <Box display='flex' flexDirection='column'>

            <Box alignSelf='flex-end'>
                <AnalysisTableSetting columns={columns} />
            </Box>

            <Table
                size='small'
                bordered
                scroll={{
                    x: window.innerHeight
                }}
                pagination={false}
                columns={columns.filter(i => i.isVisible === true)}
                dataSource={dataSourceAnalysisTable}
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

export default memo(AnalysisTable)