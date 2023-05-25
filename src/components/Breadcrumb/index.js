import { Breadcrumb } from 'antd'
import React, { memo, useMemo } from 'react'
import { useStore } from '../../modules/store'
import { Box } from '@chakra-ui/react'

function BreadcrumbComponent() {
    const breadcrumbItems = useStore((store) => store.breadcrumbItems)

    const items = useMemo(() => {
        return breadcrumbItems.map(i => ({ title: i }))
    }, [breadcrumbItems])

    return (
        <Box my='16px'>
            <Breadcrumb
                items={items}
            />
        </Box>
    )
}

export default memo(BreadcrumbComponent)