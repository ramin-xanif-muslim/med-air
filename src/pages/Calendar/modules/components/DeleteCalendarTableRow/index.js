import React, { memo } from 'react'
import DeleteTableRow from '../../../../../components/DeleteTableRow'

function DeleteCalendarTableRow({handleDelete}) {
  return (
    <DeleteTableRow onClick={handleDelete}/>
  )
}

export default memo(DeleteCalendarTableRow)