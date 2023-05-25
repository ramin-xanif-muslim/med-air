import React, { memo, useMemo, useState } from 'react'
import EditTableComponent from '../../../../../components/EditTableComponent'
import { useLocalStorageStore, useStore } from '../../../../../modules/store';
import { Button, Tooltip } from 'antd';
import DeleteTreatmentMedicationsTableRow from '../DeleteTreatmentMedicationsTableRow';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import TreatmentMedicationsTableSetting from './TreatmentMedicationsTableSetting';
import { PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';

function TreatmentMedicationsTable() {

    const recipeList = useStore((store) => store.recipeList)
    const setRecipeList = useStore((store) => store.setRecipeList)
    const setIsFieldsChange = useStore((store) => store.setIsFieldsChange)


    const treatmentMedicationsTableSetting = useLocalStorageStore((store) => store.treatmentMedicationsTableSetting)

    const visible = (dataIndex, defaultVisible = true) => {
        return treatmentMedicationsTableSetting?.find(i => i.dataIndex === dataIndex) ? treatmentMedicationsTableSetting.find(i => i.dataIndex === dataIndex).isVisible : defaultVisible
    }

    const columns = useMemo(() => {
        return [
            {
                title: "Date",
                dataIndex: "date",
                key: "date",
                isVisible: visible('date'),
                ellipsis: true,
                editable: true,
                width: 200,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Name",
                dataIndex: "cureTabName",
                key: "cureTabName",
                isVisible: visible('cureTabName'),
                inputType: 'select',
                ellipsis: true,
                editable: true,
                width: 200,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Type",
                dataIndex: "cureTabType",
                key: "cureTabType",
                isVisible: visible('cureTabType'),
                inputType: 'select',
                ellipsis: true,
                editable: true,
                width: 200,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Mg/Ml",
                dataIndex: "cureTabDose",
                key: "cureTabDose",
                isVisible: visible('cureTabDose'),
                ellipsis: true,
                editable: true,
                width: 200,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Usage guide",
                dataIndex: "cureTabUsing",
                key: "cureTabUsing",
                isVisible: visible('cureTabUsing'),
                ellipsis: true,
                editable: true,
                width: 200,
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
                        let newData = recipeList.filter(i => i.Id !== row.Id)
                        setRecipeList(newData)
                    }
                    return (
                        <DeleteTreatmentMedicationsTableRow handleDelete={handleDelete} />
                    );
                },
            },
        ];
    }, [treatmentMedicationsTableSetting, recipeList]);


    const onClickNewRecipe = () => {
        let key = new Date().getTime()
        let Id = new Date().getTime()
        let newData = { key, Id, date: dayjs().format("DD-MM-YYYY") };
        setRecipeList([...recipeList, newData]);
    };

    return (
        <Box display='flex' flexDirection='column'>

            <Flex m='2'>
                <Text fontSize='20' fontWeight='600' >Medications</Text>

                <Spacer />

                <TreatmentMedicationsTableSetting columns={columns} />
            </Flex>

            <EditTableComponent
                dataSource={recipeList}
                setDataSource={setRecipeList}
                defaultColumns={columns.filter(i => i.isVisible === true)}
            />

            <Button block icon={<PlusOutlined />} onClick={onClickNewRecipe}>
                New medications
            </Button>

        </Box>
    )
}

export default memo(TreatmentMedicationsTable)