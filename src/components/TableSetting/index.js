import { Box, IconButton } from '@chakra-ui/react'
import { Dropdown } from 'antd'
import React, { memo } from 'react'
import { SettingOutlined } from "@ant-design/icons";

function TableSetting({ items, isOpen, onOpenChange }) {
  return (
    <Box cursor='pointer'>
      <Dropdown
        trigger={["click"]}
        menu={{ items }}
        open={isOpen}
        onOpenChange={onOpenChange}
      >
        <IconButton
          variant='ghost'
          color='pink.500'
          size='sm'
          isRound
          aria-label='Search database'
          icon={<SettingOutlined />}
        />
      </Dropdown>
    </Box>
  )
}

export default memo(TableSetting)