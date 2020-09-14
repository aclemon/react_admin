import React, { useState, useRef } from 'react';
import { Card, Typography, Alert, Button, message, Popconfirm, Divider,Upload,Dropdown,Menu } from 'antd';
import { connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import { table } from './table';
import { handleQuery, handleRemove, handleExport } from './minxin';
import CreateForm from './component/CreateForm';
import * as api from '@/services/acContract.js';
import {importExcel} from '@/mixin'
import {
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined,
  DownOutlined
} from '@ant-design/icons';

const TableList = ({ user, dispatch }) => {
// hook========================================================
  const formRef = useRef();
  const actionRef = useRef();
  // ModelForm
  const createFormRef = useRef();
  const [uploading, setUploading] = useState(false);
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


  const onCancel = () => {
    handleModalVisible(false);
    setCreateForm({});
  };
  // key
  const onFinish = async (values) => {

    const { key } = createForm;
    let res;
    if (key) {
      let param = {};
      param = values;
      param.key = key;
      res = await handleUpdate(param);
    } else {
      res = await handleAdd(values);
    }
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

      await api.importBatch(data);
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
    try {
      const res = await api.add(fields);

      hide();
      handleModalVisible(false);
      message.success('添加成功');
      actionRef.current.reload();
      return true;
    } catch (error) {
      hide();
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
      message.success('更新成功');
      actionRef.current.reload();
      return resp.data;
    } catch (error) {
      hide();
      message.error('更新失败请重试！');
      return false;
    }
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

  const menu = (text, record)=>(
    <Menu>
      <Menu.Item>
        <a
          onClick={
            async ()=>{
              const param = {}
              param.id = record.contractId
              param.status = 1
              const resp =   await api.update(param)
              if (resp.code =='000000'){
                actionRef.current.reload()
              }
            }}>
          通过{text}---- {record.contractId}
        </a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={
          async ()=>{
           const param = {}
           param.id = record.contractId
           param.status = 2
           const resp =   await api.update(param)
            if (resp.code =='000000'){
              actionRef.current.reload()
            }
          }}>
          回退
        </a>
      </Menu.Item>

    </Menu>
  );

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
          {user.permission.indexOf('acContract:delete')>-1&&
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
          </>}

          {
            user.permission.indexOf('acContract:update')>-1&&
              <>
            <a
              onClick={() => {
                handleModalVisible(true);
                record.time = [];
                // record.time[0] = moment(record.startAt);
                // record.time[1] = moment(record.endAt);
                setCreateForm(record);
              }}
                >
              修改
            </a>
             <Divider type="horizontal"/>
             </>
          }
          {user.permission.indexOf('acContract:approve')>-1&&
          <Dropdown overlay={menu(text, record)} >
           <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
             审批<DownOutlined />
            </a>
          </Dropdown>

          }


        </>
      ),
    };
  return (
    <div>
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


        rowSelection={{

          // type:'radio',
          // 选择下拉框
          // selections:[
          //
          // ]
        }
        }
        request={(params, sort, filter) => {
          const data = handleQuery(params, sort, filter);
          return data;
        }}
        // 菜单栏
        toolBarRender={(action, { selectedRows }) => [
          user.permission.indexOf('acContract:add')>-1&&  <Button type="primary" onClick={() => {
            setCreateForm({});
            handleModalVisible(true);
          }}>
            <PlusOutlined/> 新建
          </Button>,
          user.permission.indexOf('acContract:export')>-1&&  <Button type="primary" onClick={() => handleExport(true)}>
            <DownloadOutlined/> 导出
          </Button>,
          user.permission.indexOf('acContract:import')>-1&& <Button type="primary" onClick={() => handleExport(true)}>
            <DownloadOutlined/> 导入模板
          </Button>,
          user.permission.indexOf('acContract:import')>-1&& <Upload {...uploadProps}>
            <Button type="primary">
              <UploadOutlined/> 导入文件
            </Button>
          </Upload>,
          user.permission.indexOf('acContract:delete')>-1&& selectedRows && selectedRows.length > 0 && (
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
      <CreateForm
        formRef={createFormRef}
        formRecord={createForm}
        modalVisible={modalVisible}
        onCancel={onCancel}
        onFinish={onFinish}
      />
    </div>);
};

// 1.将仓库的 CrudModal 传递
const mapStateToProps = ({ user, loading }) => {
  return {
    user,
  };
};


export default connect(mapStateToProps)(TableList);
