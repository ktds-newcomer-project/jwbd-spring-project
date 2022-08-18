import { Button, Form, Input, message, Select } from "antd";
import React, { useState, useEffect } from "react";
import "./addComponent.css";
import { axiosInstance } from "../api";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
/* eslint-disable no-template-curly-in-string */

const { Option } = Select;

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log("search:", value);
};

const validateMessages = {
  required: "${label} 입력해주세요.",
};

const App = () => {
  const [form] = Form.useForm();
  const [axiosErr, setAxiosErr] = useState("");
  const [axiosComplete, setAxiosComplete] = useState("");
  const [axiosPost, setAxiosPost] = useState(false);

  const onFinish = (values) => {
    if (!axiosPost) {
      setAxiosPost(true);
      axiosInstance
        .post("/api/member", values)
        .then((response) => {
          if (response.data.output === 200) {
            form.resetFields();
            setAxiosComplete(true);
          } else {
            setAxiosErr("이름은 5글자 이하로 ");
          }
        })
        .catch((error) => {
          setAxiosErr(error.message);
        })
        .finally(() => {
          setAxiosPost(false);
        });
    }
  };
  useEffect(() => {
    if (axiosErr !== "") {
      message.error("서버와 통신에 실패하였습니다.");
      setAxiosErr("");
    }
    if (axiosComplete !== "") {
      message.success("성공적으로 추가하였습니다.");
      setAxiosComplete("");
    }
  }, [axiosErr, axiosComplete]);
  return (
    <div className="layout">
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["sabun"]}
          label="사번"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["mpw"]}
          label="비밀번호"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["name"]}
          label="이름"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input maxLength={5} placeholder="(5글자 이내)" />
        </Form.Item>
        <Form.Item
          name={["roleSet"]}
          label="사용자 유형"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="시스템 관리자">시스템 관리자</Option>
            <Option value="시험 관리자">시험 관리자</Option>
            <Option value="감독 관리자">감독 관리자</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <Button block type="primary" htmlType="submit">
            사용자 추가
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
