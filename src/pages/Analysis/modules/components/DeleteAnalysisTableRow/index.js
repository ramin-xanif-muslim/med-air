import React, { memo } from 'react'
import DeleteTableRow from '../../../../../components/DeleteTableRow'

function DeleteVisitsTableRow({handleDelete}) {
  return (
    <DeleteTableRow onClick={handleDelete}/>
  )
}

export default memo(DeleteVisitsTableRow)