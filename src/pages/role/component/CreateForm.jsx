import React, { useEffect } from 'react';
import { Modal, Form, Input, Slider, Select, message, DatePicker,Tree,TreeSelect  } from 'antd';
import { labelList } from '@/pages/user/minxin';
import _ from 'lodash'

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { SHOW_ALL } = TreeSelect;
const CreateForm = (props) => {
  const [form] = Form.useForm();
  const { modalVisible, onCancel, onFinish, formRecord, formRef,menuTree } = props;

  console.log(menuTree,'menuTree');

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

  const onCheck = (checkedKeys, info) => {
    // console.log('onCheck', checkedKeys, info);
    const checkedIds =  checkedKeys.map(item=>{
      return  _.toNumber(_.replace(item, 'menu:', ''))
    })
    form.setFieldsValue({ menus:checkedIds })
  };

  const checkEvent = e => {
    console.log('Upload evessssssssssssssnt:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.checkedKeys;
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
          label="角色名称"
          name="name"
          rules={[{ required: true, message: '输入角色名称!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="角色等级"
          name="level"
          rules={[{ required: true, message: '输入角色等级!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="角色描述"
          name="description"
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="权限范围"
          name="dataScope"
        >
          <Input/>
        </Form.Item>

        {/*<Form.Item*/}
        {/*  label="菜单范围"*/}
        {/*  name="menus"*/}
        {/*>*/}
        {/*  <Tree*/}
        {/*    checkable*/}
        {/*    onCheck={onCheck}*/}
        {/*    treeData={menuTree}*/}
        {/*    defaultCheckedKeys={roleCheckKeys}*/}
        {/*  />*/}
        {/*</Form.Item>*/}
        <Form.Item
          label="菜单范围"
          name="menuIds"
        >
          <TreeSelect
            showCheckedStrategy={SHOW_ALL}
            treeData={menuTree}
            treeCheckable
            placeholder='Please select'
          />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default CreateForm;


