import React, { memo, useEffect, useMemo, useState } from 'react'
import { Checkbox } from 'antd';
import { useLocalStorageStore } from '../../../../../modules/store';
import { deepCopy } from '../../../../../modules/functions/deepCopy';
import TableSetting from '../../../../../components/TableSetting';

function AnalysisTableSetting({ columns }) {
    const [isOpen, setIsOpen] = useState(false)

    const analysisTableSetting = useLocalStorageStore((store) => store.analysisTableSetting)
    const setAnalysisTableSetting = useLocalStorageStore((store) => store.setAnalysisTableSetting)

    const onChangeCheckbox = (e) => {
        let dataIndex = e.target.id
        let isVisible = e.target.checked
        const copyCTS = deepCopy(analysisTableSetting)
        copyCTS.forEach(i => {
            if (i.dataIndex === dataIndex) {
                i.isVisible = isVisible
            }
        })
        setAnalysisTableSetting([...copyCTS])
    }

    useEffect(() => {
        let colArr = columns.map(({ key, dataIndex, isVisible, title }) => ({ key, dataIndex, isVisible, title }))
        setAnalysisTableSetting(colArr)
    }, [])

    const items = useMemo(() => {
        const arr = analysisTableSetting
            ? analysisTableSetting?.map(i => (
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
    }, [analysisTableSetting])

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

export default memo(AnalysisTableSetting)