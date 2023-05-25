import React, { memo, useState } from 'react'
import { familyMembersSelectOptions } from '../../../../../modules/consts'
import { Alert, Button, Form, Select, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDisclosure } from '@chakra-ui/react'
import ModalFamilyMemberForm from './ModalFamilyMemberForm'
import { useGlobalContext } from '../../../../../modules/context/index.js'


const arrSeveralAdd = [
    "Brother",
    "Sister",
    "Father's-brother",
    "Mother's-brother",
    "Father's-sister",
    "Mother's-sister",
];

function HeaderFamilyMembersList() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { familyMembersList, setFamilyMembersList } = useGlobalContext()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [selectedMember, setSelectedMember] = useState()
    const [countAddedFM, setCountAddedFM] = useState({});
    const [isShowAlert, setIsShowAlert] = useState(false)

    const [form] = Form.useForm();

    const handleAdd = (memberData) => {
        memberData.familyMember = selectedMember
        let id = new Date().getTime()
        memberData.Id = id
        setFamilyMembersList(prev => [...prev, memberData])
        onClose()
    }

    const onChange = (e) => {
        setIsShowAlert(false)
        setSelectedMember(e)
    }

    const handleCloseAlert = () => {
        setIsShowAlert(false)
    }

    const onClick = () => {
        if (!selectedMember) {
            return
        } else {
            const findEl = familyMembersList.find((i) => i.familyMember === selectedMember)

            if (!findEl) {
                setSelectedMember(selectedMember)
                onOpen()
            } else if (arrSeveralAdd.includes(selectedMember)) {
                let s = selectedMember;
                let count = countAddedFM[selectedMember] || 2;
                let newSelectedMember = s + "_" + count;
                count += 1;
                setCountAddedFM({ [selectedMember]: count });
                setSelectedMember(newSelectedMember)
                onOpen()
            } else {
                setIsShowAlert(true)
            }
        }
    }



    return (
        <>

            <Form.Item labelAlign='left' label="Family members">
                <Space.Compact style={{ width: '100%' }}>
                    <Select
                        onChange={onChange}
                        allowClear
                        ref={finalRef}
                    >
                        {familyMembersSelectOptions.map(i => {
                            return (
                                <Select.Option key={i} value={i}>{i}</Select.Option>
                            )
                        })}
                    </Select>
                    <Button disabled={!selectedMember} onClick={onClick}><PlusOutlined /></Button>
                </Space.Compact>
            </Form.Item>

            {isShowAlert && <Alert
                closable
                afterClose={handleCloseAlert} 
                message="Selected family member already added" type="info"

            />}

            <ModalFamilyMemberForm
                isOpen={isOpen}
                onClose={onClose}
                initialRef={initialRef}
                finalRef={finalRef}
                title={selectedMember}
                handleAdd={handleAdd}
                form={form}
            />
        </>
    )
}

export default memo(HeaderFamilyMembersList)