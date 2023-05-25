import React, { memo, useState } from 'react'
import { Box } from '@chakra-ui/react'
import AnalysisTable from './modules/components/AnalysisTable';
import AnalysisFormBlok from './modules/components/AnalysisFormBlok';
import ProfilePatientForm from '../../components/ProfilePatientForm';
import { Form } from 'antd';

function Analysis() {

    const [selectedRowKey, setSelectedRowKey] = useState();

    const [form] = Form.useForm()

    return (
        <>
            <ProfilePatientForm />

            <Box p='2' my='2' boxShadow='xl' bg='pink.50' borderRadius='15px'>

                <Box p='2' my='2' border='1px solid pink' borderRadius='15px' bg={selectedRowKey ? 'blue.50' : ''}>

                    <AnalysisFormBlok selectedRowKey={selectedRowKey} setSelectedRowKey={setSelectedRowKey} form={form} />

                </Box>

                <Box p='2' my='2' border='1px solid pink' borderRadius='15px'>

                    <AnalysisTable selectedRowKey={selectedRowKey} setSelectedRowKey={setSelectedRowKey} form={form} />

                </Box>

            </Box>
        </>
    )
}

export default memo(Analysis)