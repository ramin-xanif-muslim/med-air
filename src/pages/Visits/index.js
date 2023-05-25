import React, { memo, useState } from 'react'
import { Box } from '@chakra-ui/react'
import VisitsTable from './modules/components/VisitsTable';
import VisitsFormBloke from './modules/components/VisitsFormBloke';
import ProfilePatientForm from '../../components/ProfilePatientForm';
import { Form } from 'antd';

function Visits() {

    const [selectedRowKey, setSelectedRowKey] = useState();

    const [form] = Form.useForm()

    return (
        <>
            <ProfilePatientForm />

            <Box p='2' my='2' boxShadow='xl' bg='pink.50' borderRadius='15px'>

                <Box p='2' my='2' border='1px solid pink' borderRadius='15px' bg={selectedRowKey ? 'blue.50' : ''}>

                    <VisitsFormBloke selectedRowKey={selectedRowKey} setSelectedRowKey={setSelectedRowKey} form={form} />

                </Box>

                <Box p='2' my='2' border='1px solid pink' borderRadius='15px'>

                    <VisitsTable selectedRowKey={selectedRowKey} setSelectedRowKey={setSelectedRowKey} form={form} />

                </Box>

            </Box>
        </>
    )
}

export default memo(Visits)