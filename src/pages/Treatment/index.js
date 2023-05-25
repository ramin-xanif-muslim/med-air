import { Box } from '@chakra-ui/react'
import React, { memo, useState } from 'react'
import ProfilePatientForm from '../../components/ProfilePatientForm'
import TreatmentFormBloke from './modules/components/TreatmentFormBloke'
import TreatmentTableFormBloke from './modules/components/TreatmentTableFormBloke'
import TreatmentTable from './modules/components/TreatmentTable'
import TreatmentMedicationsTable from './modules/components/TreatmentMedicationsTable'
import { Form } from 'antd'

function Treatment() {

  const [selectedRowKey, setSelectedRowKey] = useState();

  const [form] = Form.useForm()

  return (
    <>
      <ProfilePatientForm />

      <Box p='2' my='2' boxShadow='xl' bg='pink.50' borderRadius='15px'>

        <TreatmentFormBloke />

      </Box>

      <Box p='2' my='2' boxShadow='xl' bg='pink.50' borderRadius='15px'>

        <Box p='2' my='2' border='1px solid pink' borderRadius='15px' bg={selectedRowKey ? 'blue.50' : ''}>

          <TreatmentTableFormBloke selectedRowKey={selectedRowKey} setSelectedRowKey={setSelectedRowKey} form={form} />

        </Box>

        <Box p='2' my='2' border='1px solid pink' borderRadius='15px'>

          <TreatmentTable selectedRowKey={selectedRowKey} setSelectedRowKey={setSelectedRowKey} form={form} />

        </Box>

      </Box>

      <Box p='2' my='2' boxShadow='xl' bg='pink.50' borderRadius='15px'>

        <TreatmentMedicationsTable />

      </Box>

    </>
  )
}

export default memo(Treatment)