import React, { useEffect, useMemo, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { PlusOutlined } from '@ant-design/icons'
import EditTableComponent from '../../components/EditTableComponent'
import { Button, Tooltip, message } from 'antd'
import sendRequest from '../../modules/api/sendRequest'
import DeleteTableRow from '../../components/DeleteTableRow'
import { useQuery } from 'react-query'



const fetchManagersPlace = async () => {
    let res = await sendRequest("managers/places");
    if(res?.data) {
        res.data.forEach(i => i.Id = i.visitPlaceId)
        return res.data
    }
};

function ReceptionLocations() {

    const [disabledShowButton, setDisabledShowButton] = useState(true)
    const [loading, setLoading] = useState(false)
    
    const { data, isFetching, refetch } = useQuery("managers/places",fetchManagersPlace)
    
    const [list, setList] = useState(data || [])

    useEffect(() => {
        if(!isFetching && data){
            setList(data)
        }
    },[isFetching])

    const columns = useMemo(() => {
        return [
            {
                title: "Name",
                dataIndex: "placeName",
                key: "placeName",
                ellipsis: true,
                editable: true,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "City",
                dataIndex: "placeCity",
                key: "placeCity",
                inputType: 'select',
                ellipsis: true,
                editable: true,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Country",
                dataIndex: "placeCountry",
                key: "placeCountry",
                inputType: 'select',
                ellipsis: true,
                editable: true,
                render: (value) => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: "Delete",
                dataIndex: "delete",
                width: 50,
                key: "delete",
                ellipsis: true,
                align: 'center',
                render: (value, row, index) => {
                    const handleDelete = () => {
                        deletePlace(row)
                    }
                    return (
                        <DeleteTableRow onClick={handleDelete} />
                    );
                },
            },
        ];
    }, [list]);

    const deleteItem = (delItem) => {
        let newList =  list.filter(i => i.Id !== delItem.Id)
        setList(newList)
        message.success('Deleted')
    }
    const deletePlace = async (delItem) => {
        let Id = delItem.visitPlaceId;
        if(!Id){
            return deleteItem(delItem)
        }
        let res = await sendRequest("managers/places/" + Id, {}, "delete");
        if(res?.data === 'success'){
            message.success('Deleted!')
            let newData = list.filter(i => i.Id !== delItem.Id)
            setList(newData)
            refetch()
        }else {
            message.warning('Something get wrong')
        }
    };

    const handleSave = async () => {
        setLoading(true);
        for (let i = 0; i < list.length; i++) {
            let sendObj = { ...list[i] };
            let res = await sendRequest("managers/places", sendObj, "post");
            if (res) {
                message.success({
                    content: 'Saved',
                    key: 'save_manager'
                })
                refetch()
            } else {
                message.error('Error')
            }
        }
        setLoading(false)
        setDisabledShowButton(true)
    };

    const handleAddNewMedications = () => {
        let key = new Date().getTime()
        let newData = { key, Id: key };
        setList(prev => [...prev, newData]);
        setDisabledShowButton(false)
    }

    const onChange = () => {
        setDisabledShowButton(false)
    }

    return (
        <Box boxShadow='xl' p='2' bg='pink.100' borderRadius='15px' >

            <Box display='flex' flexDirection='column'>

                <Button
                    disabled={disabledShowButton}
                    loading={loading}
                    block
                    onClick={handleSave}
                    type='primary'
                >
                    Save
                </Button>

                <EditTableComponent
                    dataSource={list}
                    setDataSource={setList}
                    defaultColumns={columns}
                    onChange={onChange}
                />

                <Button
                    block
                    icon={<PlusOutlined />}
                    onClick={handleAddNewMedications}
                >
                    New medications
                </Button>

            </Box>

        </Box>
    )
}

export default ReceptionLocations