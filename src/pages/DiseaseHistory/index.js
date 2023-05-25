import React, { memo, useState } from 'react'
import DiseaseHistoryFormBloke from './modules/components/DiseaseHistoryFormBloke'
import ProfilePatientForm from '../../components/ProfilePatientForm'
import BlockForm from './modules/components/BlockForm'
import BlockCanvas from './modules/components/BlockCanvas'
import { Box } from '@chakra-ui/react'
import DiseaseHistoryTable from './modules/components/DiseaseHistoryTable'
import { Form } from 'antd'

function DiseaseHistory() {

    const [selectedRowKey, setSelectedRowKey] = useState();

    const [form] = Form.useForm()

    return (
        <>
            <ProfilePatientForm />

            <Box p='2' my='2' boxShadow='xl' bg='pink.50' borderRadius='15px'>

                <Box p='2' my='2' border='1px solid pink' borderRadius='15px' bg={selectedRowKey ? 'blue.50' : ''}>

                    <DiseaseHistoryFormBloke form={form} selectedRowKey={selectedRowKey} setSelectedRowKey={setSelectedRowKey} />

                </Box>

                <Box p='2' my='2' border='1px solid pink' borderRadius='15px'>

                    <DiseaseHistoryTable form={form} selectedRowKey={selectedRowKey}
                        setSelectedRowKey={setSelectedRowKey} />

                </Box>

            </Box>

            <Box p='2' my='2' boxShadow='xl' bg='pink.50' borderRadius='15px'>

                <BlockForm />

            </Box>

            <Box p='2' my='2' boxShadow='xl' bg='pink.50' borderRadius='15px'>

                <BlockCanvas />

            </Box>
        </>
    )
}

export default memo(DiseaseHistory)