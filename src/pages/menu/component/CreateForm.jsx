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
          label="父级菜单"
          name="pid"
          rules={[{ required: true, message: '输入父级菜单!' }]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="菜单类型"
          name="type"
          rules={[{ required: true, message: '输入菜单类型!' }]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="菜单标题"
          name="title"
          rules={[{ required: true, message: '输入菜单标题!' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="组件名称"
          name="name"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="组件位置"
          name="component"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="组件排序"
          name="menuSort"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="图标"
          name="icon"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="path"
          name="地址"
        >
          <Input/>
        </Form.Item>


      </Form>
    </Modal>
  );
};

export default CreateForm;


