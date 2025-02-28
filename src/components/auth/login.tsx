"use client";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  notification,
  Row,
  Typography,
  Layout,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { authenticate } from "@/utils/actions";
import { useRouter } from "next/navigation";
import ModalReactive from "./modal.reactive";
import { useState } from "react";
import ModalChangePassword from "./modal.change.password";
import Image from "next/image"; // Import Image component

import loginImage from "../../../public/login.svg";
import styles from "./login.module.css";

const { Title } = Typography;
const { Content } = Layout;

const Login = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [changePassword, setChangePassword] = useState(false);

  const onFinish = async (values: any) => {
    const { username, password } = values;
    setUserEmail("");
    //trigger sign-in
    const res = await authenticate(username, password);

    if (res?.error) {
      //error
      if (res?.code === 2) {
        setIsModalOpen(true);
        setUserEmail(username);
        return;
      }
      notification.error({
        message: "Error login",
        description: res?.error,
      });
    } else {
      //redirect to /dashboard
      router.push("/dashboard");
    }
  };

  return (
    <>
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
                  Xin chào,
                </Title>
                <Form
                  name="basic"
                  onFinish={onFinish}
                  autoComplete="off"
                  layout="vertical"
                >
                  <Form.Item
                    label="Email"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
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
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Login
                      </Button>
                      <Button
                        type="link"
                        onClick={() => setChangePassword(true)}
                      >
                        Quên mật khẩu ?
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
                <Link href={"/"}>
                  <ArrowLeftOutlined /> Quay lại trang chủ
                </Link>
                <Divider />
                <div style={{ textAlign: "center" }}>
                  Chưa có tài khoản?
                  <Link href={"/auth/register"}>Đăng ký tại đây</Link>
                </div>
									</div>
              </div>
            </Col>

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

      <ModalReactive
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userEmail={userEmail}
      />
      <ModalChangePassword
        isModalOpen={changePassword}
        setIsModalOpen={setChangePassword}
      />
    </>
  );
};

export default Login;
