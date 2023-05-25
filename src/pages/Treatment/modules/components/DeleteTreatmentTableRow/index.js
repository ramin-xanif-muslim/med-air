import React, { memo } from 'react'
import DeleteTableRow from '../../../../../components/DeleteTableRow'

function DeleteTreatmentTableRow({handleDelete}) {
  return (
    <DeleteTableRow onClick={handleDelete}/>
  )
}

export default memo(DeleteTreatmentTableRow)