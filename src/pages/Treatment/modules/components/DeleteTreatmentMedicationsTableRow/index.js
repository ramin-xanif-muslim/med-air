import React, { memo } from 'react'
import DeleteTableRow from '../../../../../components/DeleteTableRow'

function DeleteTreatmentMedicationsTableRow({handleDelete}) {
  return (
    <DeleteTableRow onClick={handleDelete}/>
  )
}

export default memo(DeleteTreatmentMedicationsTableRow)