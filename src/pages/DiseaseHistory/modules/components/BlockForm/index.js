import { SimpleGrid } from '@chakra-ui/react'
import { Input, Radio, Select, Form } from 'antd';
import React, { memo } from 'react'
import FamilyMembersList from '../FamilyMembersList';
import { useGlobalContext } from '../../../../../modules/context/index.js';
import { useStore } from '../../../../../modules/store';

function BlockForm() {

    const { diseaseHistoryForm } = useGlobalContext()

    const onFieldsChange = useStore((store) => store.onFieldsChange)

    return (
        <SimpleGrid columns={['1', '2']} gap='1' >

            <Form
                form={diseaseHistoryForm}
                labelWrap
                labelAlign="right"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                onFieldsChange={onFieldsChange}
            >

                <Form.Item label="Allergies" name="allergyAvailability">
                    <Input.TextArea showCount maxLength={3000} rows={3} />
                </Form.Item>

                <Form.Item label="Receved treatement" name="medicationTaken">
                    <Input.TextArea showCount maxLength={3000} rows={3} />
                </Form.Item>

                <Form.Item label="Initial diagnosis" name="preliminaryDiagnosis">
                    <Input.TextArea showCount maxLength={3000} allowClear rows={3} />
                </Form.Item>

                <Form.Item label="Received traumas" name="receivedTraumas">
                    <Radio.Group
                    >
                        <Radio value={1}>Yes</Radio>
                        <Radio value={2}>No</Radio>
                    </Radio.Group>
                </Form.Item>


                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.receivedTraumas !== currentValues.receivedTraumas}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('receivedTraumas') === 1 ? (
                            <Form.Item label="Description" name="ownInjuryReason">
                                <Input.TextArea showCount maxLength={3000} />
                            </Form.Item>
                        ) : ''}
                </Form.Item>

                <Form.Item label="Malignant" name="maliqan">
                    <Select allowClear>
                        <Select.Option value="Right">Right</Select.Option>
                        <Select.Option value="Left">Left</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Benign" name="beniqen">
                    <Select>
                        <Select.Option value="Right">Right</Select.Option>
                        <Select.Option value="Left">Left</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Malignant?" name="maliqanQuestion">
                    <Select allowClear>
                        <Select.Option value="Right">Right</Select.Option>
                        <Select.Option value="Left">Left</Select.Option>
                    </Select>
                </Form.Item>

            </Form>


            <Form
                form={diseaseHistoryForm}
                labelWrap
                labelAlign="right"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                onFieldsChange={onFieldsChange}
            >

                <FamilyMembersList />

            </Form>

        </SimpleGrid>
    )
}

export default memo(BlockForm)



