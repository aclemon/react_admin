import React, { useEffect } from 'react';
import { Modal, Form, Input, Slider, Select, message, DatePicker } from 'antd';
import { labelList } from '@/pages/user/minxin';
import _ from 'lodash'

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const CreateForm = (props) => {
  const [form] = Form.useForm();
  const { modalVisible, onCancel, onFinish, formRecord, formRef } = props;

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
          label="部门名称"
          name="nickName"
          rules={[{ required: true, message: '输入昵称!' }]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="岗位ID"
          name="username"
          rules={[{ required: true, message: '输入账号!' }]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="合同提供商"
          name="contractProvider"
          rules={[{ required: true, message: '输入密码!' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="外包项目"
          name="project"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="合同开始日期"
          name="contractStartTime"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="合同结束日期"
          name="contractEndTime"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="自动延期"
          name="autoDelay"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="购买保险"
          name="enabledInsurance"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="保险结束日期"
          name="insuranceEndTime"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="集中采购日期"
          name="purchaseStartTime"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="集中采购到期日"
          name="purchaseEndTime"
        >
          <Input/>
        </Form.Item>


      </Form>
    </Modal>
  );
};

export default CreateForm;


