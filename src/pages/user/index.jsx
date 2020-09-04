import React, { useState, useRef } from 'react';
import { Card, Typography, Alert, Button, message, Popconfirm, Divider } from 'antd';
import { connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import { table } from './table';
import { handleQuery, handleRemove, handleExport } from './minxin';
import CreateForm from './component/CreateForm';
import * as api from '@/services/user.js';



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
      createdAt: { show: false },
      finishedAt: { show: false },
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
              record.time = [];
              // record.time[0] = moment(record.startAt);
              // record.time[1] = moment(record.endAt);
              setCreateForm(record);
            }}
          >
            修改
          </a>
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
