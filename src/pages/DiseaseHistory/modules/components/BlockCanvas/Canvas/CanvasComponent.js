import { Box, Circle } from '@chakra-ui/react'
import { Button, Form, Input, Select, Space } from 'antd'
import React, { memo, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'


function CanvasComponent({ img }) {

    const [colorCanvas, setColorCanvas] = useState()

    const onFieldsChange = ([{ name, value }]) => {
        const nameFormInput = name && name[0]
        if (nameFormInput === 'colorCanvas') setColorCanvas(value)
    }

    return (
        <Box bg='pink.100' p='1' borderRadius='10px'>

            <Form
                onFieldsChange={onFieldsChange}
                labelAlign='left'
                style={{ width: '100%' }}
            >

                <Space.Compact width='100%' style={{ width: "100%", alignItems: 'center' }}>

                    <Form.Item
                        shouldUpdate={(prevValues, currentValues) => prevValues.colorCanvas !== currentValues.colorCanvas}
                        style={{ width: "100%" }}
                    >
                        {({ getFieldValue }) => (
                            <Form.Item noStyle name="colorCanvas">
                                <Select
                                    allowClear
                                    suffixIcon={<Circle mr='4' size='20px' bg={getFieldValue('colorCanvas')} />}
                                    style={{ width: "100%" }}
                                >
                                    <Select.Option value="green">Benign tumor</Select.Option>
                                    <Select.Option value="red">Maligan tumor</Select.Option>
                                    <Select.Option value="black">Maligan ?</Select.Option>
                                    <Select.Option value="blue">My operation</Select.Option>
                                    <Select.Option value="#AA00FF">Operated not by me</Select.Option>
                                </Select>
                            </Form.Item>
                        )
                        }
                    </Form.Item>

                    <Form.Item>
                        <Button>Edit</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button>Save</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button>Clear</Button>
                    </Form.Item>

                </Space.Compact>

                <Form.Item label='Description' name='description'>
                    <Input.TextArea showCount maxLength={3000} />
                </Form.Item>

            </Form>

            <Box
                w="100%"
                h="100%"
                position="relative"
                paddingBottom="100%"
            >
                <CanvasDraw
                    disabled={colorCanvas ? false : true}
                    brushColor={colorCanvas}
                    className="canvas-draw"
                    imgSrc={img}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                />
            </Box>

        </Box>
    )
}

export default memo(CanvasComponent)