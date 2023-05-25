import React, { memo, useState } from 'react'
import { Form, List } from 'antd'
import { Box, Flex, IconButton, Spacer, useDisclosure } from '@chakra-ui/react'
import HeaderFamilyMembersList from './HeaderFamilyMembersList'
import ModalFamilyMemberForm from './ModalFamilyMemberForm'
import { useGlobalContext } from '../../../../../modules/context/index.js'

function FamilyMembersList() {

    const { familyMembersList, setFamilyMembersList } = useGlobalContext()

    const [selectedListItem, setSelectedListItem] = useState()

    const [form] = Form.useForm();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)


    const onClick = (item) => {
        form.setFieldsValue(item)
        setSelectedListItem(item)
        onOpen()
    }

    const handleEdit = (memberData) => {
        const newList = familyMembersList.map(i => {
            if (i.Id === memberData.Id) return memberData
            else return i
        })
        onClose()
        setFamilyMembersList([...newList])
    }

    const handleDelete = (e,item) => {
        e.preventDefault()
        e.stopPropagation()
        const newList = familyMembersList.filter(i => i.Id !== item.Id)
        setFamilyMembersList([...newList])
    }


    return (
        <Form.Item noStyle >

            <List
                size="small"
                header={<HeaderFamilyMembersList />}
                bordered
                dataSource={familyMembersList}
                renderItem={(item, index) => {
                    return (
                        <Box
                            key={item.Id}
                            onClick={() => onClick(item)}
                            _hover={{ bg: 'pink.200' }}
                            cursor='pointer'
                        >
                            <List.Item>
                                <Flex w='100%'>
                                    <Box>{index + 1}. {item.familyMember}</Box>
                                    <Spacer />
                                    <IconButton
                                        isRound
                                        variant='ghost'
                                        fontWeight='bold'
                                        size='xs'
                                    >
                                        <Box onClick={(e) => handleDelete(e,item)} color='pink.500'>X</Box>
                                    </IconButton>
                                </Flex>
                            </List.Item>
                        </Box>
                    )
                }}
            />

            <ModalFamilyMemberForm
                isOpen={isOpen}
                onClose={onClose}
                initialRef={initialRef}
                finalRef={finalRef}
                title={selectedListItem?.familyMember}
                isEdit={true}
                handleEdit={handleEdit}
                form={form}
            />

        </Form.Item>
    )
}

export default memo(FamilyMembersList)