import React, { useEffect } from 'react';
import { Modal, Form, Input, Slider, Select, message, DatePicker } from 'antd';
import { labelList } from '@/pages/user/minxin';
import _ from 'lodash'
import { trainingList } from '@/pages/acUser/minxin';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const CreateForm = (props) => {

  const [form] = Form.useForm();
  const { modalVisible, onCancel, onFinish, formRecord, formRef,roles } = props;
  const onOkTime = () => {
  };
  const onChange = () => {
  };

  const onOK = () => {
    form.submit();
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    message.error(errorInfo.errorFields[0].errors[0]);
  };

  /**
   * 根据接收到的参数进行判断
   */
  useEffect(() => {
    console.log('userEfeect',formRecord);
    if (_.isEmpty(formRecord)) {
      form.resetFields();
    } else {
      form.setFieldsValue(formRecord);
    }
  }, [modalVisible]);

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }

  return (
    <Modal
      maskClosable={false}
      title={_.isEmpty(formRecord)? '新增记录' : '修改记录'}
      visible={modalVisible}
      getContainer={false}
      onOk={onOK}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      layout="horizontal"
    >
      <Form
        name="basic"
        ref={formRef}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...{
          labelCol: { span: 5 },
          wrapperCol: { span: 17 },
        }}
      >
        <Form.Item
          label="昵称"
          name="nickName"
          rules={[{ required: true, message: '输入昵称!' }]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="账号"
          name="username"
          rules={[{ required: true, message: '输入账号!' }]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '输入密码!' }]}
        >
          <Input type= "password"/>
        </Form.Item>


        <Form.Item
          label="手机号码"
          name="phone"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="角色"
          name="roleIds"
          rules={[
            {
              required: true,
              message: 'Please select your roles!',
              type: 'array',
            },
          ]}
        >
          <Select             mode="multiple"
            allowClear
            placeholder="Please select role">
            {roles.map((item, index) => (
              <Select.Option key={index} value={item.roleId}>
                {item.name}
              </Select.Option>
            ))}
          </Select>

        </Form.Item>


      </Form>
    </Modal>
  );
};

export default CreateForm;


