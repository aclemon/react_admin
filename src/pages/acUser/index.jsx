import React, { useState, useRef } from 'react';
import { Card, Typography, Alert, Button, message, Popconfirm, Divider, Row, Col, Tree, Input, Upload } from 'antd';
import { connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import { table } from './table';
import { handleQuery, handleRemove, handleExport,importExcel } from './minxin';
import CreateForm from './component/CreateForm';
import * as api from '@/services/acUser.js';
import moment from "moment";
import _ from 'lodash';
import {
  PlusOutlined,
  DownloadOutlined, UploadOutlined,
} from '@ant-design/icons';

const { Search } = Input;
const TableList = ({ acUser,acDept,user, dispatch }) => {
// hook========================================================
  const formRef = useRef();
  const actionRef = useRef();
  // ModelForm
  const createFormRef = useRef();
  const [createForm, setCreateForm] = useState({});
  const [modalVisible, handleModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  const handleUploading = async () => {
    setUploading(true)
    const hide = message.loading('正在导入');
    const data = await importExcel(fileList)

    data.forEach((item)=>{
       item.birthday = new Date(item.birthday)
    })
    try {

      await api.importAcUser(data);
      hide();
      message.success('导入成功');
      setFileList(preFile => {
        const index = fileList.indexOf(fileList[0]);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        return newFileList
      })
      actionRef.current.reload();
      setUploading(false)
      return true;
    } catch (error) {
      hide();
      message.error(error);
      return false;
    }
  }

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

          {user.permission.indexOf('acUser:delete')>-1&&
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
          <Divider type="vertical"/></>}
          {user.permission.indexOf('acUser:update')>-1&&<a
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
          }
        </>
      ),
    };

  const   treeOnChange = e => {

    const { value } = e.target;
    console.log(value,e,'treeOnChange');
    // const expandedKeys = dataList
    // .map(item => {
    //   if (item.title.indexOf(value) > -1) {
    //     return getParentKey(item.key, gData);
    //   }
    //   return null;
    // })
    // .filter((item, i, self) => item && self.indexOf(item) === i);
    // this.setState({
    //   expandedKeys,
    //   searchValue: value,
    //   autoExpandParent: true,
    // });
  };
  const uploadProps = {
    onRemove: file => {
      setFileList(deletedFile => {
        const index = fileList.indexOf(deletedFile);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: file => {
      fileList.length === 0 ?
        setFileList((preFile) => {
          preFile.push(file)
          return preFile
        }) : message.error("仅支持单文件上传")
      // 刷新
      actionRef.current.reload();
      // console.log(fileList, 'beforeUpload')
      return false;
    },
    multiple: false,
    fileList,
  };



  const onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const toolbar=(action, { selectedRows }) => [
    user.permission.indexOf('acUser:add')>-1&&  <Button type="primary" onClick={() => {
      setCreateForm({});
      handleModalVisible(true);
    }}>
      <PlusOutlined/> 新建
    </Button>,
    user.permission.indexOf('acUser:export')>-1&&  <Button type="primary" onClick={() => handleExport(true)}>
      <DownloadOutlined/> 导出
    </Button>,
    user.permission.indexOf('acUser:import')>-1&&  <Button type="primary" onClick={() => handleExport(false)}>
      <DownloadOutlined/> 导入模板
    </Button>,
    user.permission.indexOf('acUser:import')>-1&&  <Upload {...uploadProps}>
      <Button type="primary">
        <UploadOutlined/> 导入文件
      </Button>
    </Upload>,
    fileList.length > 0 && <Button
      type="primary"
      onClick={handleUploading}
      disabled={fileList.length === 0}
      loading={uploading}
    >
      {uploading ? '导入中' : '开始导入'}
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
  ]
  return (
    <>
      <Row>
        <Col span={6} >
          <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={treeOnChange} />
          {/*<Tree*/}
          {/*  onExpand={onExpand}*/}
          {/*  // expandedKeys={expandedKeys}*/}
          {/*  // autoExpandParent={autoExpandParent}*/}
          {/*  // treeData={loop(gData)}*/}
          {/*/>*/}
          <Tree
            onSelect={onSelect}
            onCheck={onCheck}
            treeData={acDept.data}
          />
        </Col>
        <Col span={18} >
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
            toolBarRender={toolbar}
          />
        </Col>
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
const mapStateToProps = ({ acUser,acDept, user,loading }) => {
  return {
    acUser,acDept,user
  };
};


export default connect(mapStateToProps)(TableList);
