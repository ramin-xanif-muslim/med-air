import React, { memo } from 'react'
import DeleteTableRow from '../../../../../components/DeleteTableRow'

function DeleteDiseaseHistoryTableRow({handleDelete}) {
  return (
    <DeleteTableRow onClick={handleDelete}/>
  )
}

export default memo(DeleteDiseaseHistoryTableRow)