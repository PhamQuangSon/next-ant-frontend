'use client'
import React from 'react';
import { Button, Col, Divider, Form, Input, notification, Row, Layout, Typography } from 'antd'; // Import Layout, Typography
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import loginImage from "../../../public/login.svg";
import styles from "./login.module.css"; // Import styles from login.module.css

const { Content } = Layout;
const { Title } = Typography;

const Register = () => {
    const router = useRouter()

    const onFinish = async (values: any) => {
        const { email, password, name } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
            method: "POST",
            body: {
                email, password, name
            }
        })
        if (res?.data) {
            router.push(`/verify/${res?.data?._id}`);
        } else {
            notification.error({
                message: "Register error",
                description: res?.message
            })
        }
    };

    return (
        <Layout className={styles.layout}>
            <Content>
                <Row justify="center" className={styles.container}>
                    <Col xs={24} md={6} className={styles.formContainer}>
                        <div className={styles.formWrapper}>
                            <Image
                                src={loginImage}
                                alt="Login"
                                className={styles.loginImage}
                            />
                            <div className={styles.bgWrapper}>
                                <Title level={2} className={styles.title}>
                                    Đăng Ký,
                                </Title>
                                <Form
                                    name="basic"
                                    onFinish={onFinish}
                                    autoComplete="off"
                                    layout='vertical'
                                    className={styles.form} // Apply form styling from login
                                >
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your email!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item
                                        label="Name"
                                        name="name"
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <Link href={"/"}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
                                <Divider />
                                <div style={{ textAlign: "center" }}>
                                    Đã có tài khoản? <Link href={"/auth/login"}>Đăng nhập</Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                    {/* Remove illustration section */}
                    <Col xs={24} md={8} className={styles.illustrationContainer}>
                        <Image
                            src={loginImage}
                            alt="Education illustration"
                            className={styles.illustration}
                        />
                    </Col>
                </Row>

                <div className={styles.footer}>Bản quyền thuộc về BKS.</div>
            </Content>
        </Layout>
    );
};

export default Register;
