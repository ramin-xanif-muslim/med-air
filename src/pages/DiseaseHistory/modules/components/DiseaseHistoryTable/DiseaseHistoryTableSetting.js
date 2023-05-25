import React, { memo, useEffect, useMemo, useState } from 'react'
import { Checkbox } from 'antd';
import { useLocalStorageStore } from '../../../../../modules/store';
import { deepCopy } from '../../../../../modules/functions/deepCopy';
import TableSetting from '../../../../../components/TableSetting';

function DiseaseHistoryTableSetting({ columns }) {
    const [isOpen, setIsOpen] = useState(false)

    const diseaseHistoryTableSetting = useLocalStorageStore((store) => store.diseaseHistoryTableSetting)
    const setDiseaseHistoryTableSetting = useLocalStorageStore((store) => store.setDiseaseHistoryTableSetting)

    const onChangeCheckbox = (e) => {
        let dataIndex = e.target.id
        let isVisible = e.target.checked
        const copyCTS = deepCopy(diseaseHistoryTableSetting)
        copyCTS.forEach(i => {
            if (i.dataIndex === dataIndex) {
                i.isVisible = isVisible
            }
        })
        setDiseaseHistoryTableSetting([...copyCTS])
    }

    useEffect(() => {
        let colArr = columns.map(({ key, dataIndex, isVisible, title }) => ({ key, dataIndex, isVisible, title }))
        setDiseaseHistoryTableSetting(colArr)
    }, [])

    const items = useMemo(() => {
        const arr = diseaseHistoryTableSetting
            ? diseaseHistoryTableSetting?.map(i => (
                {
                    label: <Checkbox
                        id={i?.dataIndex}
                        onChange={onChangeCheckbox}
                        defaultChecked={i?.isVisible}
                    >
                        {i.title}
                    </Checkbox>
                }
            ))
            : []
        return arr
    }, [diseaseHistoryTableSetting])

    const onOpenChange = (e) => {
        setIsOpen(e)
    }

    return (
        <TableSetting
            items={items}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        />
    )
}

export default memo(DiseaseHistoryTableSetting)