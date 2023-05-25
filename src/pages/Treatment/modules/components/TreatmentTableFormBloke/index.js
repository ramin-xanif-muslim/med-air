import React, { memo, useState } from 'react'
import { Button, DatePicker, Form, Input, InputNumber, Radio, Select, Space } from 'antd'
import { SimpleGrid } from '@chakra-ui/react'
import { useStore } from '../../../../../modules/store';
import dayjs from 'dayjs';
import { fetchPathologistsPlace } from '../../../../../modules/api';
import { useQuery } from 'react-query';

function TreatmentTableFormBloke(props) {

    const { selectedRowKey, setSelectedRowKey, form } = props

    const [isBenign, setIsBenign] = useState(false)

    const dataSourceTreatmentTable = useStore((store) => store.dataSourceTreatmentTable)
    const setDataSourceTreatmentTable = useStore((store) => store.setDataSourceTreatmentTable)

    const setIsFieldsChange = useStore((store) => store.setIsFieldsChange)

    const onFinish = (values) => {
        setIsFieldsChange(true)
        try {
            if (selectedRowKey) {
                let newData = dataSourceTreatmentTable.map((i) => {
                    if (i.id === values.id) {
                        values.treatmentDate = dayjs(values.treatmentDate).format('YYYY-MM-DD HH:mm')
                        return { ...values }

                    }
                    else return i
                })
                setDataSourceTreatmentTable(newData)
            } else {
                let id = new Date().getTime()
                values.id = id
                values.key = id
                values.treatmentDate = dayjs(values.treatmentDate).format('YYYY-MM-DD HH:mm')
                setDataSourceTreatmentTable([...dataSourceTreatmentTable, values])
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

    const onFieldsChange = ([{ name, value }]) => {
        const nameFormInput = name && name[0]
        if (nameFormInput === 'treatmentTypeName') setIsBenign(value === 'benign')
    }

    const { data: pathologistsList } = useQuery(["managers/pathologists"], fetchPathologistsPlace)

    return (

        <SimpleGrid columns={['1', '2']} gap='1' >

            <Form
                onFinish={onFinish}
                id='treatmentTableFormBlok'
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

                <Form.Item label="Date" name="treatmentDate">
                    <DatePicker
                        format="YYYY-MM-DD HH:mm"
                        defaultValue={dayjs()}
                        showTime
                    />
                </Form.Item>

                <Form.Item
                    label="Urgent Histology"
                    name="histologyUrgent"
                >
                    <Input.TextArea showCount maxLength={3000} rows={3} />
                </Form.Item>

                <Form.Item
                    label="Histology Final"
                    name="histologyFinal"
                >
                    <Input.TextArea showCount maxLength={3000} rows={3} />
                </Form.Item>

                {isBenign ? '' : (
                    <>

                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.treatmentTypeName !== currentValues.treatmentTypeName}
                        >
                            {({ getFieldValue }) => getFieldValue('treatmentTypeName') !== 'benign' ? (
                                <Form.Item label="SLNB" name="SLNB">
                                    <Radio.Group>
                                        <Radio value={1}>Yes</Radio>
                                        <Radio value={2}>No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            ) : ''
                            }
                        </Form.Item>

                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.SLNB !== currentValues.SLNB}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('SLNB') === 1 ? (
                                    <>
                                        <Form.Item
                                            label="Reactive"
                                            name="slnbReactive"
                                        >
                                            <InputNumber
                                                min={0}
                                                defaultValue={0}
                                            />
                                        </Form.Item>

                                        <Form.Item label="MTS" name="slnbMts">
                                            <InputNumber
                                                min={0}
                                                defaultValue={0}
                                            />
                                        </Form.Item>
                                    </>
                                ) : ''}
                        </Form.Item>

                        <Form.Item
                            label="Axilla dissection"
                            name="axillaDesection"
                        >
                            <Radio.Group>
                                <Radio value={1}>Yes</Radio>
                                <Radio value={2}>No</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.axillaDesection !== currentValues.axillaDesection}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('axillaDesection') === 1 ? (
                                    <>
                                        <Form.Item
                                            label="Reactive"
                                            name="axillaDesectionReactive"
                                        >
                                            <InputNumber
                                                min={0}
                                                defaultValue={0}
                                            />
                                        </Form.Item>

                                        <Form.Item label="MTS" name="axillaDesectionMts">
                                            <InputNumber
                                                min={0}
                                                defaultValue={0}
                                            />
                                        </Form.Item>
                                    </>
                                ) : ''}
                        </Form.Item>

                    </>

                )}

            </Form>

            <Form
                onFinish={onFinish}
                id='treatmentTableFormBlok'
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
                onFieldsChange={onFieldsChange}
            >

                <Form.Item label="ER" >
                    <Form.Item noStyle name="ihkEr">
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value={1}>Positive</Radio>
                                <Radio value={2}>Negative</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.ihkEr !== currentValues.ihkEr}
                    >
                        {({ getFieldValue }) => {
                            if (getFieldValue('ihkEr') === 1) {
                                return (
                                    <Form.Item noStyle name="erN">
                                        <InputNumber />
                                    </Form.Item>
                                )
                            } else return ''
                        }}
                    </Form.Item>
                </Form.Item>

                <Form.Item label="PR" >
                    <Form.Item noStyle name="ihkPr">
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value={1}>Positive</Radio>
                                <Radio value={2}>Negative</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.ihkPr !== currentValues.ihkPr}
                    >
                        {({ getFieldValue }) => {
                            if (getFieldValue('ihkPr') === 1) {
                                return (
                                    <Form.Item noStyle name="prN">
                                        <InputNumber />
                                    </Form.Item>
                                )
                            } else return ''
                        }}
                    </Form.Item>
                </Form.Item>

                <Form.Item label="HER2" >
                    <Form.Item noStyle name="her2">
                        <InputNumber
                            min={0}
                            max={3}
                            defaultValue={0}
                        />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.her2 !== currentValues.her2}
                    >
                        {({ getFieldValue }) => {
                            if (getFieldValue('her2') === 2) {
                                return (
                                    <Form.Item noStyle name="her2FT">
                                        <InputNumber addonBefore="FT" />
                                    </Form.Item>
                                )
                            } else {
                                form.setFieldValue?.({ her2FT: '' })
                                return ''
                            }
                        }}
                    </Form.Item>
                </Form.Item>

                <Form.Item label="K67" name="k67">
                    <InputNumber min={0} defaultValue={0} />
                </Form.Item>

                <Form.Item label="Pathologist" name="pathologist">
                    <Select
                        allowClear
                    >
                        {pathologistsList?.map((i) => {
                            return (
                                <Select.Option key={i.pathologistId} value={i.pathologistName}>
                                    {i.pathologistName}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>


                <Form.Item label="Brest type" name="breastType">
                    <Select allowClear>
                        <Select.Option value="Missing">Missing</Select.Option>
                        <Select.Option value="Right">Right</Select.Option>
                        <Select.Option value="Left">Left</Select.Option>
                        <Select.Option value="Both">Both</Select.Option>
                        <Select.Option value="Post mastectomy right">Post mastectomy right</Select.Option>
                        <Select.Option value="Post mastectomy left">Post mastectomy left</Select.Option>
                        <Select.Option value="Axilla right">Axilla right</Select.Option>
                        <Select.Option value="Axilla left">Axilla left</Select.Option>
                        <Select.Option value="Extra breast right">Extra breast right</Select.Option>
                        <Select.Option value="Extra breast left">Extra breast left</Select.Option>
                        <Select.Option value="Both extra breasts">Both extra breasts</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Type of treatment" name="treatmentTypeName">
                    <Select allowClear>
                        <Select.Option value="benign">Benign</Select.Option>
                        <Select.Option value="malign">Malignant</Select.Option>
                        <Select.Option value="Nak">Nak</Select.Option>
                        <Select.Option value="AK">AK</Select.Option>
                        <Select.Option value="RT">RT</Select.Option>
                        <Select.Option value="target">Target</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.treatmentTypeName !== currentValues.treatmentTypeName}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('treatmentTypeName') === 'malign' ? (
                            <>
                                <Form.Item label="Əməliyyat növü" name="treatmentSubType">
                                    <Select allowClear>
                                        <Select.Option value="Organgoruyucu">Organoprotector</Select.Option>
                                        <Select.Option value="Masektamiya">Masectomy</Select.Option>
                                        <Select.Option value="SLNB">SLNB</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="TB" name="treatmentSubSubType">
                                    <Select allowClear>
                                        <Select.Option value="lumA">Lum A</Select.Option>
                                        <Select.Option value="lumB">Lum B</Select.Option>
                                        <Select.Option value="tripleN">Triple negative</Select.Option>
                                        <Select.Option value="hormoneP">Hormone positive Her positive</Select.Option>
                                        <Select.Option value="hormoneN">Hormone negative Her positive</Select.Option>
                                        <Select.Option value="prN">PR negative</Select.Option>
                                    </Select>
                                </Form.Item>
                            </>
                        ) : ''}
                </Form.Item>

                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.treatmentTypeName !== currentValues.treatmentTypeName}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('treatmentTypeName') === 'benign' ? (
                            <>
                                <Form.Item label="Alt növ" name="treatmentSubType">
                                    <Select allowClear>
                                        <Select.Option value="lumpektamiya">Lumpectamia</Select.Option>
                                        <Select.Option value="reduksiya">Reduction</Select.Option>
                                        <Select.Option value="mastopeksiya">Mastopexy</Select.Option>
                                        <Select.Option value="augumentasiya">Augmentation</Select.Option>
                                        <Select.Option value="Extra breast">Extra breast</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Alt alt növ" name="treatmentSubSubType">
                                    <Select allowClear >
                                        <Select.Option value="right">Right</Select.Option>
                                        <Select.Option value="left">Left</Select.Option>
                                        <Select.Option value="both">Both</Select.Option>
                                        <Select.Option value="sectoral">Sectoral</Select.Option>
                                        <Select.Option value="sectoral round block">
                                            Sectoral round block
                                        </Select.Option>
                                        <Select.Option value="expander">Expander</Select.Option>
                                    </Select>
                                </Form.Item>
                            </>
                        ) : ''}
                </Form.Item>

                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.treatmentTypeName !== currentValues.treatmentTypeName}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('treatmentTypeName') === 'Nak' || getFieldValue('treatmentTypeName') === 'RT' ? (
                            <Form.Item label="patamarfoz" name="treatmentSubType">
                                <Select allowClear>
                                    <Select.Option value="1">&#8544;</Select.Option>
                                    <Select.Option value="2">&#8545;</Select.Option>
                                    <Select.Option value="3">&#8546;</Select.Option>
                                    <Select.Option value="4">&#8547;</Select.Option>
                                </Select>
                            </Form.Item>
                        ) : ''}
                </Form.Item>

                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.treatmentTypeName !== currentValues.treatmentTypeName}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('treatmentTypeName') ? (
                            <Form.Item label="Description" name="treatmentTypeDesc">
                                <Input.TextArea showCount maxLength={3000} rows={3} />
                            </Form.Item>
                        ) : ''}
                </Form.Item>

                <Form.Item>
                    <Space>

                        <Button
                            form='treatmentTableFormBlok'
                            htmlType='submit'
                            type="primary"
                        >
                            {selectedRowKey ? 'Edit' : 'Add'}
                        </Button>

                        <Button onClick={handleClear} danger>{selectedRowKey ? "Close" : "Clear"}</Button>


                    </Space>
                </Form.Item>

            </Form>

        </SimpleGrid>
    )
}

export default memo(TreatmentTableFormBloke)