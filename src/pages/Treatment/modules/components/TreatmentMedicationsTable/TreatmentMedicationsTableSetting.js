import React, { memo, useEffect, useMemo, useState } from 'react'
import { Checkbox } from 'antd';
import { useLocalStorageStore } from '../../../../../modules/store';
import { deepCopy } from '../../../../../modules/functions/deepCopy';
import TableSetting from '../../../../../components/TableSetting';

function TreatmentMedicationsTableSetting({ columns }) {
    const [isOpen, setIsOpen] = useState(false)

    const treatmentMedicationsTableSetting = useLocalStorageStore((store) => store.treatmentMedicationsTableSetting)
    const setTreatmentMedicationsTableSetting = useLocalStorageStore((store) => store.setTreatmentMedicationsTableSetting)

    const onChangeCheckbox = (e) => {
        let dataIndex = e.target.id
        let isVisible = e.target.checked
        const copyCTS = deepCopy(treatmentMedicationsTableSetting)
        copyCTS.forEach(i => {
            if (i.dataIndex === dataIndex) {
                i.isVisible = isVisible
            }
        })
        setTreatmentMedicationsTableSetting([...copyCTS])
    }

    useEffect(() => {
        let colArr = columns.map(({ key, dataIndex, isVisible, title }) => ({ key, dataIndex, isVisible, title }))
        setTreatmentMedicationsTableSetting(colArr)
    }, [])

    const items = useMemo(() => {
        const arr = treatmentMedicationsTableSetting
            ? treatmentMedicationsTableSetting?.map(i => (
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
    }, [treatmentMedicationsTableSetting])

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

export default memo(TreatmentMedicationsTableSetting)