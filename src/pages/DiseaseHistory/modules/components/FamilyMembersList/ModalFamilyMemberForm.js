import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Button, Form, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { deepCopy } from '../../../../../modules/functions/deepCopy'
import { useStore } from '../../../../../modules/store'

function ModalFamilyMemberForm(props) {

    const { isOpen, onClose, initialRef, finalRef, title, handleEdit, isEdit, handleAdd, form } = props

    const setIsFieldsChange = useStore((store) => store.setIsFieldsChange)



    const onFinish = () => {
        setIsFieldsChange(true)
        try {
            const values = form.getFieldsValue()
            const copyValues = deepCopy(values)
            if (isEdit) {
                handleEdit(copyValues)
            }
            else {
                handleAdd(copyValues)
            }
            form.resetFields()
        } catch (error) {
            console.log('%c error', 'background: red; color: dark', error);
        }
    }

    const handleClose = () => {
        form.resetFields()
        onClose()
    }

    return (

        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>


                    <Form
                        form={form}
                        labelWrap
                        labelAlign="left"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                    >

                        <Form.Item hidden name="Id">
                            <Input />
                        </Form.Item>

                        <Form.Item hidden name="familyMember">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Trauma" name="familyMemberInjury">
                            <Input
                                ref={initialRef}
                                allowClear
                            />
                        </Form.Item>

                        <Form.Item label="Deceased of cancer" name="familyMemberDied">
                            <Input
                                allowClear
                            />
                        </Form.Item>

                        <Form.Item label="Living with cancer" name="familyMemberCurrentCancer">
                            <Input
                                allowClear
                            />
                        </Form.Item>

                        <Form.Item label="Description" name="familyMemberDesc">
                            <Input.TextArea showCount maxLength={3000}
                                rows={3}
                            />
                        </Form.Item>

                    </Form>

                </ModalBody>

                <ModalFooter>
                    <Button
                        type='primary'
                        block
                        icon={<PlusOutlined />}
                        onClick={onFinish}
                    >
                        {isEdit ? 'Edit' : 'Add'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalFamilyMemberForm