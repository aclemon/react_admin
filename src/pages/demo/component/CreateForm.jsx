import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Slider, Select, message, DatePicker, Steps, Button,Radio,Upload ,Row,Col,TreeSelect } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { genderList,trainingList } from '@/pages/acUser/minxin';
import _ from 'lodash';
import * as api from '@/services/acUser'

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Step } = Steps;
const { TreeNode } = TreeSelect;
const CreateForm = (props) => {

  const [form] = Form.useForm();
  const { modalVisible, onCancel, onFinish, formRecord, formRef } = props;




  const onOK = () => {
    form.submit();
  };


  const uploadFile = e => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    message.error(errorInfo.errorFields[0].errors[0]);
  };


  const selectOnChange = value => {
    console.log(value);
    // this.setState({ value });
  };
  /**
   * 根据接收到的参数进行判断
   */
  useEffect(() => {
    console.log('userEfeect', formRecord);
    if (_.isEmpty(formRecord)) {
      form.resetFields();
    } else {
      form.setFieldsValue(formRecord);
    }
  }, [modalVisible]);
  return (

    <Modal
      maskClosable={false}
      width = "60%"
      title={_.isEmpty(formRecord) ? '新增记录' : '修改记录'}
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
        <Row>
          <Col span={12}>

            <Form.Item
              label="编号"
              name="numbering"
              rules={[{ required: true, message: '输入昵称!' }]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="姓名"
              name="username"
              rules={[{ required: true, message: '输入姓名!' }]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="生日"
              name="birthday"
              rules={[{ required: true, message: '选择' +
                  '生日!' }]}
            >
              <DatePicker/>
            </Form.Item>


            <Form.Item
              label="性别"
              name="gender"
            >
              <Radio.Group>
                {genderList.map(item =>
                  (<Radio value={item.id} key={item.id}>{item.value}</Radio>)
                )}
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="手机号"
              name="phone"
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="身份证号"
              name="idcard"
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="毕业学校"
              name="graduateSchool"
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="到岗时间"
              name="arrivalTime"
            >
              <DatePicker/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="合同"
              name="contract"
              valuePropName="fileList"
              getValueFromEvent={uploadFile}
            >
              <Upload name="file" action='/api/minio/upload' listType="picture" multiple={false} >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="保密协议"
              name="confidentialityAgreement"
              valuePropName="fileList"
              getValueFromEvent={uploadFile}
            >
              <Upload name="file" action='/api/minio/upload' listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="政治审查"
              name="politicalReview"
            >
              <Input/>
            </Form.Item>
            <Form.Item label="培训情况" name="trainingSituation">
              <Select>
                {trainingList.map((item, index) => (
                  <Select.Option key={index} value={item.id}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="健康证明"
              name="healthStatus"
              valuePropName="fileList"
              getValueFromEvent={uploadFile}
            >
              <Upload name="file" action='/api/minio/upload' listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="学历"
              name="education"
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="离岗时间"
              name="exitTime"
            >
              <DatePicker/>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="状态"
          name="status"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="备注"
          name="remarks"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="部门"
          name="deptId"
        >
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            value="parentValue 1-0"
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={selectOnChange}
          >
            <TreeNode value="parent 1" title="parent 1">
              <TreeNode value="parentValue 1-0" title="parent 1-0">
                <TreeNode value="leaf1" title="my leaf" />
                <TreeNode value="leaf2" title="your leaf" />
              </TreeNode>
              <TreeNode value="parent 1-1" title="parent 1-1">
                <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
              </TreeNode>
            </TreeNode>
          </TreeSelect>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default CreateForm;


