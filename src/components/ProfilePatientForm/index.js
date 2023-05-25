import React, { memo } from 'react'
import { Button, Form, Space, Input, InputNumber } from 'antd'
import { useGlobalContext } from '../../modules/context/index.js'
import { ArrowsAltOutlined, ShrinkOutlined } from "@ant-design/icons";
import { Box, Collapse, useMediaQuery } from "@chakra-ui/react";
import useResetProfilePatient from '../../modules/hooks/useResetProfilePatient.js'
import useSavePatient from '../../modules/hooks/useSavePatient.js'
import { useStore } from '../../modules/store/index.js';


function ProfilePatientForm() {

    const {
        patientForm,
        inPatientCollapse,
        setInPatientCollapse,
    } = useGlobalContext()


    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')

    const { resetProfilePatient } = useResetProfilePatient();

    const handleClear = () => {
        resetProfilePatient()
    }

    const { handleSave, isLoading } = useSavePatient()

    const onFieldsChange = useStore((store) => store.onFieldsChange)

    return (
        <Box boxShadow='xl' p='2' bg='pink.100' borderRadius='15px' >
            <Form
                id='patientForm'
                onFinish={handleSave}
                form={patientForm}
                layout={isLargerThan600 ? "inline" : "vertical"}
                onFieldsChange={onFieldsChange}
            >
                <Form.Item
                    label="Name"
                >
                    <Space.Compact>

                        <Form.Item
                            noStyle
                            key="patientName"
                            name="patientName"
                        >
                            <Input placeholder="Name" />
                        </Form.Item>

                        <Form.Item
                            name="patientId"
                            noStyle
                        >
                            <InputNumber readOnly addonBefore='№' placeholder="Patient №" />
                        </Form.Item>

                        <Button
                            type='ghost'
                            onClick={() => setInPatientCollapse(prev => !prev)}
                            icon={inPatientCollapse ? <ArrowsAltOutlined /> : <ShrinkOutlined />}

                        />

                    </Space.Compact>
                </Form.Item>

                <Collapse in={inPatientCollapse} animateOpacity>
                    <Form
                        form={patientForm}
                        layout={isLargerThan600 ? "inline" : "vertical"}
                        onFieldsChange={onFieldsChange}
                    >

                        <Form.Item key="patientSurName" name="patientSurName" label="Suriname">
                            <Input placeholder="Suriname" />
                        </Form.Item>

                        <Form.Item key="patientPatronymic" label="Patronymic" name="patientPatronymic">
                            <Input />
                        </Form.Item>

                    </Form>
                </Collapse>

                <Form.Item noStyle>
                    <Space>
                        <Button
                            onClick={handleSave}
                            form='patientForm'
                            type="primary"
                            htmlType='submit'
                            loading={isLoading}
                        >
                            Save
                        </Button>

                        <Button onClick={handleClear} danger>
                            Clear
                        </Button>
                    </Space>

                </Form.Item>
            </Form>
        </Box>
    )
}

export default memo(ProfilePatientForm)