import React, { useEffect } from 'react';
import { Modal, Form, Input, Slider, Select, message, DatePicker, TreeSelect, Col } from 'antd';
import { menuList,formatData } from '@/pages/menu/minxin';
import _ from 'lodash'
import func from '@/utils/Func.js';
import { trainingList } from '@/pages/acUser/minxin';





const { Option } = Select;
const { TextArea,Search } = Input;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const CreateForm = (props) => {
  const [form] = Form.useForm();
  const { modalVisible, onCancel, onFinish, formRecord, formRef,isPageAuth,allmenus,showModal } = props;



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

  const treeData = formatData(allmenus);
  console.log(treeData,allmenus,'treeData');
  treeData.unshift({
    title: '无',
    // value: -1,
    key: -1,
  });



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
          <TreeSelect

            // value={this.state.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
            placeholder="请选择"
            treeDefaultExpandAll
          />
        </Form.Item>


        <Form.Item label="菜单类型" name="type" rules={[{ required: true, message: '选择菜单类型!' }]}>
          <Select >
            {menuList.map((item, index) => (
              <Select.Option key={index} value={item.id} >
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="菜单标题"
          name="title"
          rules={[{ required: true, message: '输入菜单标题!' }]}
        >
          <Input />
        </Form.Item>

        {/* 用于locals */}
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
          label="访问地址"
          name="path"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="图标"
          name="icon"
        >
          <Search
            // prefix={
            //   <AntdIcon type={'setting'} />
            // }
            placeholder="请选择菜单图标"
            onSearch={showModal}
            enterButton
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;


