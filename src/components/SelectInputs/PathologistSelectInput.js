import { Select } from 'antd'
import React, { memo } from 'react'
import { useQuery } from 'react-query';
import { fetchPathologistsPlace } from '../../modules/api';

function PathologistSelectInput() {

    const { data: pathologistsList, isLoading, refetch } = useQuery(["managers/pathologists"], fetchPathologistsPlace, {
        enabled: false,
    })

    return (
        <Select
            allowClear
            lazyLoad
            loading={isLoading}
            onFocus={refetch}
        >
            {pathologistsList?.map((i) => {
                return (
                    <Select.Option key={i.pathologistId} value={i.pathologistName}>
                        {i.pathologistName}
                    </Select.Option>
                );
            })}
        </Select>
    )
}

export default memo(PathologistSelectInput)