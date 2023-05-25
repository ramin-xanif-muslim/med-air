import React, { memo, useEffect, useMemo, useState } from 'react'
import { Checkbox } from 'antd';
import { useLocalStorageStore } from '../../../../../modules/store';
import { deepCopy } from '../../../../../modules/functions/deepCopy';
import TableSetting from '../../../../../components/TableSetting';

function TreatmentTableTableSetting({ columns }) {
    const [isOpen, setIsOpen] = useState(false)

    const treatmentTableTableSetting = useLocalStorageStore((store) => store.treatmentTableTableSetting)
    const setTreatmentTableTableSetting = useLocalStorageStore((store) => store.setTreatmentTableTableSetting)

    const onChangeCheckbox = (e) => {
        let dataIndex = e.target.id
        let isVisible = e.target.checked
        const copyCTS = deepCopy(treatmentTableTableSetting)
        copyCTS.forEach(i => {
            if (i.dataIndex === dataIndex) {
                i.isVisible = isVisible
            }
        })
        setTreatmentTableTableSetting([...copyCTS])
    }

    useEffect(() => {
        let colArr = columns.map(({ key, dataIndex, isVisible, title }) => ({ key, dataIndex, isVisible, title }))
        setTreatmentTableTableSetting(colArr)
    }, [])

    const items = useMemo(() => {
        const arr = treatmentTableTableSetting
            ? treatmentTableTableSetting?.map(i => (
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
    }, [treatmentTableTableSetting])

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

export default memo(TreatmentTableTableSetting)