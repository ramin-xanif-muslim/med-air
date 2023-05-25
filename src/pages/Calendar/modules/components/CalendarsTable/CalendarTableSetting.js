import React, { memo, useEffect, useMemo, useState } from 'react'
import { Checkbox } from 'antd';
import { useLocalStorageStore } from '../../../../../modules/store';
import { deepCopy } from '../../../../../modules/functions/deepCopy';
import TableSetting from '../../../../../components/TableSetting';

function CalendarTableSetting({ columns }) {
    const [isOpen, setIsOpen] = useState(false)

    const calendarTableSetting = useLocalStorageStore((store) => store.calendarTableSetting)
    const setCalendarTableSetting = useLocalStorageStore((store) => store.setCalendarTableSetting)

    const onChangeCheckbox = (e) => {
        let dataIndex = e.target.id
        let isVisible = e.target.checked
        const copyCTS = deepCopy(calendarTableSetting)
        copyCTS.forEach(i => {
            if (i.dataIndex === dataIndex) {
                i.isVisible = isVisible
            }
        })
        setCalendarTableSetting([...copyCTS])
    }

    useEffect(() => {
        let colArr = columns.map(({ key, dataIndex, isVisible, title }) => ({ key, dataIndex, isVisible, title }))
        setCalendarTableSetting(colArr)
    }, [])

    const items = useMemo(() => {
        const arr = calendarTableSetting
            ? calendarTableSetting?.map(i => (
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
    }, [calendarTableSetting])

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

export default memo(CalendarTableSetting)