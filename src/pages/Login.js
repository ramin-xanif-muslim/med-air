import { Form, Input, Button, message } from "antd";
import sendRequest from "../modules/api/sendRequest";
import React, { useState } from "react";
import { useLocalStorageStore } from "../modules/store";
import { Box, Center, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from '../modules/images/MedAir.jpg'

const Login = () => {

    const setToken = useLocalStorageStore((store) => store.setToken)

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            setIsLoading(true)
            let result = await sendRequest('login', values, 'post')
            if (result.data.token) {
                const { token } = result.data
                localStorage.setItem('token', token)
                setToken(token)
                navigate('/calendar')
            } else {
                message.warning({
                    content: 'Login or password not correct',
                    key: "warning_message",
                    duration: 4,
                });
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <Box h='100vh' bg='black'>

            <Center p='8'>
                <Image
                    boxSize='250px'
                    className='circle'
                    src={logo}
                    alt='medAir'
                />
            </Center>

            <Center >
                <Box p='4' my='2' boxShadow='xl' bg='pink.100' borderRadius='15px' maxWidth='600px'>
                    <Form
                        layout="vertical"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Username"
                            name="userName"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="userPass"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item noStyle
                        >
                            <Button block loading={isLoading} type="primary" htmlType="submit">
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>
                </Box>
            </Center>
        </Box>
    );
};
export default Login;
