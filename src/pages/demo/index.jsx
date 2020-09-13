import React, { useState, useRef } from 'react';
import { Card, Typography, Alert, Button, message, Popconfirm, Divider } from 'antd';
import { connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import { table } from './table';
import { handleQuery, handleRemove, handleExport } from './minxin';
import CreateForm from './component/CreateForm';
import * as api from '@/services/acUser.js';
import moment from "moment";
import _ from 'lodash';


import {
  PlusOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

const TableList = ({ user, dispatch }) => {
// hook========================================================
  const formRef = useRef();
  const actionRef = useRef();
  // ModelForm
  const createFormRef = useRef();
  const [createForm, setCreateForm] = useState({});
  const [modalVisible, handleModalVisible] = useState(false);
  // 文件上传文件列表
  const [fileList, setFileList] = useState([]);
  const [columnsStateMap, setColumnsStateMap] = useState(
    {
      createBy: { show: false,fixed: "right" },
      createTime: { show: false,fixed: "right" },
      updateBy: { show: false },
      updateTime: { show: false },
    });
  // 关闭Modal
  const onCancel = () => {
    handleModalVisible(false);
    setCreateForm({});
  };
  // key
  const onFinish = async (values) => {
    console.log(values,'values');
    // values.birthday = moment(values.birthday).format('YYYY-MM-DD')
    const { key } = createForm;
    let res;
    if (key) {
      let param = {};
      param = values;
      param.key = key;
      res = await handleUpdate(param);
    } else {
      // 修改需要
      values.userId = values.id
      res = await handleAdd(values);
    }
    // 根据是否成功判断是否需要关闭Modal
    res ? onCancel() : '';
  };


  /**
   * 新增
   * @param fields
   * @returns {Promise<boolean>}
   */
  const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');
    fields.healthStatus = _.isEmpty(fields.healthStatus)?'':fields.healthStatus[0].response
    fields.contract = _.isEmpty(fields.contract)?'':fields.contract[0].response
    fields.confidentialityAgreement = _.isEmpty(fields.confidentialityAgreement)?'':fields.confidentialityAgreement[0].response

    try {
      const res = await api.add(fields);
      hide();
      if (res.data){
        message.success('添加成功');
        handleModalVisible(false);
        actionRef.current.reload();
      }else {
        message.error('添加失败请重试！');
      }
      return res.data;
    } catch (error) {
      message.error('添加失败请重试！');
      return false;
    }
  };

  /**
   * 更新createForm
   * @param fields
   * @returns {Promise<boolean>}
   */
  const handleUpdate = async (fields) => {
    const hide = message.loading('正在更新');
    console.log(fields, 'fields');
    const param = fields;
    param.id = fields.key;
    delete param.key;
    try {
      const resp = await api.update(param);
      hide();
      if(resp.data){
        message.success('更新成功');
        actionRef.current.reload();
      } else {
        message.error('后端更新失败失败请重试！');
      }
      return resp.data;
    } catch (error) {
      hide();
      message.error('更新失败请重试！');
      return false;
    }
  };


  const Option =
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (text, record) => (
        <>
          <Popconfirm
            title="你确定要删除这条记录吗？"
            onConfirm={async () => {
              await handleRemove(record);
              actionRef.current.reload();

            }}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>

          <Divider type="vertical"/>
          <a
            onClick={() => {
              handleModalVisible(true);
              // record.time[0] = moment(record.startAt);
              // record.time[1] = moment(record.endAt);
              record.birthday = _.isEmpty(record.birthday)?'':moment(record.birthday)
              record.exitTime = _.isEmpty(record.exitTime)?'':moment(record.exitTime)
              record.arrivalTime = _.isEmpty(record.arrivalTime)?'':moment(record.arrivalTime)
              record.contract =_.isEmpty(record.contract)?'':[{url:record.contract,uid:-1,status:'done',name:'1.png'}]
              record.confidentialityAgreement =_.isEmpty(record.confidentialityAgreement)?'':[{url:record.confidentialityAgreement,uid:-2,status:'done',name:'2.png'}]
              record.healthStatus =_.isEmpty(record.healthStatus)?'':[{url:record.healthStatus,uid:-3,status:'done',name:'3.png'}]
              // record.contract = fileList
              // record.healthStatus =_.isEmpty(record.healthStatus)?'':[{url:record.healthStatus,uid:-7,status:'done',name:'12.png'}]
              record.deptId = 'sss'
              console.log(record,'record');
              setCreateForm(record);
            }}
          >
            修改
          </a>
        </>
      ),
    };
  return (
    <>

      <Row>
        <Col span={18} push={6}>

        </Col>
<col>
      <ProTable
        headerTitle={table.title}
        columns={[...table.column, Option]}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={(map) => setColumnsStateMap(map)}
        formRef={formRef}
        scroll={{ x: 'calc(700px + 50%)', y: 400 }}
        //  如果 dataSource[i].key 没有提供需要提供此选项
        // rowKey="key"
        // 进行表格操作
        actionRef={actionRef}
        //  自定义 table 的 alert设置或者返回false 即可关闭
        // tableAlertRender={false}
        // 开启多选功能
        rowSelection={{
        }}
        // 请求数据
        request={(params, sort, filter) => {
          const data = handleQuery(params, sort, filter);
          return data;
        }}
        // 菜单栏
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => {
            setCreateForm({});
            handleModalVisible(true);
          }}>
            <PlusOutlined/> 新建
          </Button>,
          <Button type="primary" onClick={() => handleExport(true)}>
            <DownloadOutlined/> 导出
          </Button>,

          selectedRows && selectedRows.length > 0 && (
            <Popconfirm
              title="你确定要删除这些记录吗？"
              onConfirm={async () => {
                await handleRemove(selectedRows);
                action.reload(true);
                action.resetPageIndex();
              }}

              okText="确定"
              cancelText="取消"
            >
              <Button key="remove">批量删除</Button>
            </Popconfirm>
          ),
        ]}
      />
</col>
      </Row>
      <CreateForm
        formRef={createFormRef}
        formRecord={createForm}
        modalVisible={modalVisible}
        onCancel={onCancel}
        onFinish={onFinish}
      />
    </>);
};

// 1.将仓库的 CrudModal 传递
const mapStateToProps = ({ acUser, loading }) => {
  console.log(acUser,'mapStateToProps');
  return {
    acUser,
  };
};


export default connect(mapStateToProps)(TableList);
