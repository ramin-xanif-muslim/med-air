import React, { memo } from "react";
import { Form, Space, Input, InputNumber } from "antd";
import { useGlobalContext } from "../../modules/context/index.js";
import { SimpleGrid } from "@chakra-ui/react";
import useSavePatient from "../../modules/hooks/useSavePatient.js";
import { useStore } from "../../modules/store/index.js";

function ProfilePatientForm() {
    const { patientForm } = useGlobalContext();

    const { handleSave } = useSavePatient();

    const onFieldsChange = useStore((store) => store.onFieldsChange);

    return (
        <>
            <Form
                id="patientForm"
                onFinish={handleSave}
                form={patientForm}
                labelWrap
                labelAlign="right"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFieldsChange={onFieldsChange}
            >
                <SimpleGrid
                    gap={[1, 2]}
                    columns={[1, 3]}
                    p="2"
                    my="2"
                    boxShadow="xl"
                    bg="pink.50"
                    borderRadius="15px"
                >
                    <Form.Item label="Name">
                        <Space.Compact>
                            <Form.Item
                                key="patientName"
                                name="patientName"
                                noStyle
                            >
                                <Input placeholder="Name" />
                            </Form.Item>

                            <Form.Item name="patientId" noStyle>
                                <InputNumber
                                    readOnly
                                    addonBefore="№"
                                    placeholder="Patient №"
                                />
                            </Form.Item>
                        </Space.Compact>
                    </Form.Item>
                    <Form.Item
                        key="patientSurName"
                        name="patientSurName"
                        label="Suriname"
                    >
                        <Input placeholder="Suriname" />
                    </Form.Item>

                    <Form.Item
                        key="patientPatronymic"
                        label="Patronymic"
                        name="patientPatronymic"
                    >
                        <Input />
                    </Form.Item>
                </SimpleGrid>
            </Form>
        </>
    );
}

export default memo(ProfilePatientForm);
