import { React, useState, useEffect } from "react";
import { Card, Button, Checkbox, Form, Input } from "antd";
import { useHelpStore } from "../states";
import "../App.css";
import "./LoginForm.css";
import LableError from "./LableError";

const LoginForm = ({ LoginFunc }) => {
  const cardTitle = "K-xam Management System.";
  const footerMessage = "ⓒ 2022 직원병동 Corp. All Rights Reserved.";
  const { qryString } = useHelpStore();
  const [error, setError] = useState();
  useEffect(() => {
    const value = qryString;
    if (value === "wrong1") {
      setError("아이디와 비밀번호를 다시 확인해주세요.");
    }
  }, [qryString]);
  const onFinish = (values) => {
    let { username, password } = values;
    LoginFunc(username, password);
  };

  return (
    <Form
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Card title={cardTitle} bordered={true} className="login-form-card">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "아이디를 입력해주세요." }]}
        >
          <Input placeholder="사용자" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
        >
          <Input.Password placeholder="비밀번호" />
        </Form.Item>
        {error && <LableError>{error}</LableError>}
        <Form.Item>
          <Button
            className="login-form-button"
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
        </Form.Item>
      </Card>
      <div className="login-form-footer">
        <p>{footerMessage}</p>
      </div>
    </Form>
  );
};

export default LoginForm;
