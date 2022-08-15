import { React, useState, useEffect } from "react";

import { Card, Button, Checkbox, Form, Input } from "antd";
import "../App.css";
import "./LoginForm.css";

const LoginForm = ({ LoginFunc }) => {
  const cardTitle = "K-xam Management System.";
  const footerMessage = "ⓒ 2022 직원병동 Corp. All Rights Reserved.";
  const onFinish = (values) => {
    let { username, password, remember } = values;
    LoginFunc(username, password, remember);
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
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="사용자" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="비밀번호" />
        </Form.Item>

        <Form.Item
          className="login-form-padding"
          name="remember"
          valuePropName="checked"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
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
