import React, { memo, useEffect, useMemo, useState } from 'react'
import { Checkbox } from 'antd';
import { useLocalStorageStore } from '../../../../modules/store';
import { deepCopy } from '../../../../modules/functions/deepCopy';
import TableSetting from '../../../../components/TableSetting';

function VisitsTableSetting({ columns }) {
    const [isOpen, setIsOpen] = useState(false)

    const visitsTableSetting = useLocalStorageStore((store) => store.visitsTableSetting)
    const setVisitsTableSetting = useLocalStorageStore((store) => store.setVisitsTableSetting)

    const onChangeCheckbox = (e) => {
        let dataIndex = e.target.id
        let isVisible = e.target.checked
        const copyCTS = deepCopy(visitsTableSetting)
        copyCTS.forEach(i => {
            if (i.dataIndex === dataIndex) {
                i.isVisible = isVisible
            }
        })
        setVisitsTableSetting([...copyCTS])
    }

    useEffect(() => {
        let colArr = columns.map(({ key, dataIndex, isVisible, title }) => ({ key, dataIndex, isVisible, title }))
        setVisitsTableSetting(colArr)
    }, [])

    const items = useMemo(() => {
        const arr = visitsTableSetting
            ? visitsTableSetting?.map(i => (
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
    }, [visitsTableSetting])

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

export default memo(VisitsTableSetting)