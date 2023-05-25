import { Box, useMediaQuery } from '@chakra-ui/react'
import { Table, Tooltip } from 'antd'
import React, { memo, useMemo } from 'react'
import VisitsTableSetting from '../VisitsTableSetting'
import { useLocalStorageStore, useStore } from '../../../../../modules/store'
import DeleteVisitsTableRow from '../DeleteVisitsTableRow'
import dayjs from 'dayjs'

function VisitsTable(props) {

    const { selectedRowKey, setSelectedRowKey, form } = props

    const [isLargerThan400] = useMediaQuery('(min-width: 400px)')

    const visitsTableSetting = useLocalStorageStore((store) => store.diseaseHistoryTableSetting)

    const dataSourceVisitTable = useStore((store) => store.dataSourceVisitTable)
    const setDataSourceVisitTable = useStore((store) => store.setDataSourceVisitTable)

    const visible = (dataIndex, defaultVisible = true) => {
        return visitsTableSetting?.find(i => i.dataIndex === dataIndex) ? visitsTableSetting.find(i => i.dataIndex === dataIndex).isVisible : defaultVisible
    }

    const onRowTable = (record, index) => {
        const {
            visitDate,
            benignDescription,
            usmDescription,
            bloodDescription,
            lungsDescription,
            reasonDescription,
        } = record

        let newData = {
            ...record,
            usm: usmDescription ? true : false,
            blood: bloodDescription ? true : false,
            lungs: lungsDescription ? true : false,
            reason: reasonDescription ? true : false,
            visitDate: dayjs(visitDate),
            Prophylactic: benignDescription ? "Benign" : "Maligant",
        }
        form.setFieldsValue(newData)
    }

    const setIsFieldsChange = useStore((store) => store.setIsFieldsChange)

    const columns = useMemo(() => {
        return [
            {
                title: "Date",
                dataIndex: "visitDate",
                key: "visitDate",
                isVisible: visible('visitDate'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                isVisible: visible('status'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Visit type",
                dataIndex: "visitType",
                key: "visitType",
                isVisible: visible('visitType'),
                ellipsis: true,
                width: isLargerThan400 ? false : 150,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Reason",
                dataIndex: "visitReason",
                key: "visitReason",
                isVisible: visible('visitReason'),
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
                dataIndex: "visitDesc",
                key: "visitDesc",
                isVisible: visible('visitDesc'),
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
                        let newData = dataSourceVisitTable.filter(i => i.id !== row.id)
                        setDataSourceVisitTable(newData)
                    }
                    return (
                        <DeleteVisitsTableRow handleDelete={handleDelete} />
                    );
                },
            },
        ];
    }, [isLargerThan400, visitsTableSetting, dataSourceVisitTable]);

    return (
        <Box display='flex' flexDirection='column'>

            <Box alignSelf='flex-end'>
                <VisitsTableSetting columns={columns} />
            </Box>

            <Table
                size='small'
                bordered
                scroll={{
                    x: window.innerHeight
                }}
                pagination={false}
                columns={columns.filter(i => i.isVisible === true)}
                dataSource={dataSourceVisitTable}
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

export default memo(VisitsTable)