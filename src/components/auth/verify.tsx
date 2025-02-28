'use client'
import React from 'react';
import { Button, Col, Divider, Form, Input, message, notification, Row, Layout, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import loginImage from "../../../public/login.svg"; // Import the login image
import styles from "./login.module.css"; // Import styles from login.module.css

const { Content } = Layout;
const { Title } = Typography;

const Verify = (props: any) => {
    const { id } = props;

    const router = useRouter()

    const onFinish = async (values: any) => {
        const { _id, code } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
            method: "POST",
            body: {
                _id, code
            }
        })
        if (res?.data) {
            message.success("Kích hoạt tài khoản thành công.")
            router.push(`/auth/login`);
        } else {
            notification.error({
                message: "Verify error",
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
                                    Kích hoạt tài khoản
                                </Title>
                                <div>
                                    Mã code đã được gửi tới email đăng ký, vui lòng kiểm tra email.
                                </div>
                                <Divider />
                                <Form
                                    name="basic"
                                    onFinish={onFinish}
                                    autoComplete="off"
                                    layout='vertical'
                                    className={styles.form}
                                >
                                    <Form.Item
                                        name="_id"
                                        initialValue={id}
                                        hidden
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label="Code"
                                        name="code"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your code!',
                                            },
                                        ]}
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

export default Verify;
