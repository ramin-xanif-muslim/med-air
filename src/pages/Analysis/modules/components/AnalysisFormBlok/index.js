import React, { memo, useState } from 'react'
import { Button, DatePicker, Form, Input, Select, Space, message } from 'antd'
import { SimpleGrid } from '@chakra-ui/react'
import UploadForm from '../UploadForm';
import { useStore } from '../../../../../modules/store';
import dayjs from 'dayjs';
import sendRequest from '../../../../../modules/api/sendRequest';

const breastSelectOpnions = [
    "USM",
    "Mammography",
    "Tomosynthesis",
    "MRT",
    "KT",
    "Biopsy",
    "Сlips",
];
const other = [
    "Blood analysis",
    "USM",
    "X-ray",
    "Bone osten",
    "Bone naf",
    "KT",
    "Pet",
    "Echocardiography",
    "Electrocardiography",
    "PET-CT",
    "PET-MRI",
];

const fetchAnalysisId = async () => {
  let res = await sendRequest('analysid')
  if (res?.data) {
    message.success()
    return res.data
  } else return 0
}

function AnalysisFormBlok(props) {

    const { selectedRowKey, setSelectedRowKey, form } = props

    const [isLoading, setIsLoading] = useState(false)

    const dataSourceAnalysisTable = useStore((store) => store.dataSourceAnalysisTable)
    const setDataSourceAnalysisTable = useStore((store) => store.setDataSourceAnalysisTable)

    const onFinish = async (values) => {
        try {
            if (selectedRowKey) {
                let newData = dataSourceAnalysisTable.map((i) => {
                    if (i.id === values.id) {
                        const { date } = values
                        return { 
                            ...values,
                            date: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
                         }

                    }
                    else return i
                })
                setDataSourceAnalysisTable(newData)
            } else {
                setIsLoading(true)
                let analyzesId = await fetchAnalysisId()
                values.analyzesId = analyzesId
                values.id = analyzesId
                values.key = analyzesId
                values.date = dayjs().format('YYYY-MM-DD HH:mm:ss')
                setDataSourceAnalysisTable([...dataSourceAnalysisTable, values])
                setIsLoading(false)
            }
            form.resetFields()
            setSelectedRowKey()
        } catch (error) {
            console.log('%c error', 'background: red; color: dark', error);
        }
    }

    const handleClear = () => {
        form.resetFields()
        setSelectedRowKey()
    }

    return (

        <SimpleGrid columns={['1', '2']} gap='1' >

            <Form
                onFinish={onFinish}
                id='analysisTableFormBlok'
                form={form}
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
            >

                <Form.Item hidden name='id'>
                    <Input />
                </Form.Item>

                <Form.Item hidden name='date'>
                    <DatePicker />
                </Form.Item>

                <Form.Item label='Analyzes type' name="analyzesType">
                    <Select
                        allowClear
                    >
                        <Select.Option value="Breast">Breast</Select.Option>
                        <Select.Option value="Other analysis">Other analysis</Select.Option>
                        <Select.Option value="Other healthcare area">
                            Other healthcare area
                        </Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.analyzesType !== currentValues.analyzesType}
                >
                    {({ getFieldValue }) => {

                        let selectOptions = []

                        if (getFieldValue('analyzesType') === 'Breast') {
                            selectOptions = breastSelectOpnions
                        } else if (getFieldValue('analyzesType') === 'Other analysis') {
                            selectOptions = other
                        } else if (getFieldValue('analyzesType') === 'Other healthcare area') {
                            return ''
                        }

                        return (
                            <Form.Item label="Analysis sub type" name="analyzesSubType">

                                <Select allowClear >
                                    {
                                        selectOptions.map((i) => (
                                            <Select.Option key={i} value={i}>
                                                {i}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>

                            </Form.Item>
                        )
                    }
                    }

                </Form.Item>

                <Form.Item label="Description" name="analyzesDesc">
                    <Input.TextArea showCount maxLength={3000} rows={3} />
                </Form.Item>

                <Form.Item hidden name="analyzesContentUrl">
                    <Input />
                </Form.Item>

                <Form.Item hidden name="analyzesContentName">
                    <Input />
                </Form.Item>

            </Form>

            <Form
                onFinish={onFinish}
                id='analysisTableFormBlok'
                form={form}
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
            >


                <Form.Item hidden name='analyzesContentName'>
                    <Input />
                </Form.Item>

                <Form.Item hidden name='analyzesContentUrl'>
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Space>

                        <Button
                            form='analysisTableFormBlok'
                            htmlType='submit'
                            type="primary"
                            loading={isLoading}
                        >
                            {selectedRowKey ? 'Edit' : 'Add'}
                        </Button>

                        <Button onClick={handleClear} danger>{selectedRowKey ? "Close" : "Clear"}</Button>


                    </Space>
                </Form.Item>

                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.analyzesSubType !== currentValues.analyzesSubType}
                >
                    {({ getFieldValue }) => {
                        let isShow = getFieldValue('analyzesSubType')

                        if (isShow) {
                            return (
                                <UploadForm form={form} selectedRowKey={selectedRowKey} />
                            )
                        } else return ''
                    }
                    }
                </Form.Item>

            </Form>

        </SimpleGrid>
    )
}

export default memo(AnalysisFormBlok)