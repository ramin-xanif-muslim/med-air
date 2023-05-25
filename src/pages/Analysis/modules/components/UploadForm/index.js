import { Button, Image, Spin, Upload } from "antd";
import React, { memo, useEffect, useState } from "react";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import sendRequest from "../../../../../modules/api/sendRequest";
import { Box, Flex } from "@chakra-ui/react";


const UploadForm = ({ form, selectedRowKey }) => {

    const [imageUrl, setImageUrl] = useState();
    const [imagePdfUrl, setImagePdfUrl] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const showImage = (url) => {
        if (url) {
            const lastDotIndex = url.lastIndexOf(".");
            const result = url.substring(lastDotIndex + 1);
            if (result === 'pdf') {
                setImageUrl(null)
                setImagePdfUrl(url)
            } else {
                setImagePdfUrl(null)
                setImageUrl(url)
            }
        }
    }

    useEffect(() => {
        if (selectedRowKey) {
            const url = form.getFieldsValue().analyzesContentUrl
            showImage(url)
        } else {
            setImageUrl(null)
            setImagePdfUrl(null)
        }
    }, [selectedRowKey])

    const beforeUpload = async (file) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("file", file);

        let res = await sendRequest("analysesImage", formData, "post");
        if (res?.data) {
            const url = res.data
            showImage(url)
            form.setFieldsValue({ analyzesContentName: file.name });
            form.setFieldsValue({ analyzesContentUrl: res.data });
        }
        setIsLoading(false)
        return false;
    };

    const handleDeleteImg = () => {
        try {
            setImageUrl(null)
            setImagePdfUrl(null)
            form.setFieldsValue({ analyzesContentName: '', analyzesContentUrl: '' })
        } catch (error) {
            console.log('%c error', 'background: red; color: dark', error);
        }
    }

    if(isLoading) {
        return <Spin />
    }

    return (
        <>
            {
                imageUrl ? (

                    <Flex gap='1' m='3'>

                        <Image width={200} src={imageUrl} />

                        <Box onClick={handleDeleteImg} _hover={{ color: 'red' }} ml='-1' cursor='pointer' >
                            <CloseCircleOutlined />
                        </Box>

                    </Flex>

                ) : imagePdfUrl ? (

                    <Flex gap='1' m='3'>

                        <embed src={imagePdfUrl} type="application/pdf" width="100%" height="600px" 
                        />

                        <Box onClick={handleDeleteImg} _hover={{ color: 'red' }} ml='-1' cursor='pointer' >
                            <CloseCircleOutlined />
                        </Box>

                    </Flex>

                ) : (

                    <Upload
                        accept=".png,.pdf,.jpeg,.jpg"
                        listType="picture"
                        beforeUpload={beforeUpload}
                    >
                        {!imageUrl ? (
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        ) : (
                            ""
                        )}
                    </Upload>

                )}
        </>
    );
};
export default memo(UploadForm);
