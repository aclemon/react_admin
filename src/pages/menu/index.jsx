import React, { useState, useRef } from 'react';
import { Card, Typography, Alert, Button, message, Popconfirm, Divider,Tree,Row,Col,Table,Modal,Upload   } from 'antd';
import { connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import { table } from './table';
import { handleQuery, handleRemove, handleExport,importExcel } from './minxin';
import CreateForm from './component/CreateForm';
import * as api from '@/services/menu.js';
import IconPreview from '@/components/IconPreview';

import {
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined
} from '@ant-design/icons';
import _ from 'lodash';

const TableList = ({ menu,user, dispatch }) => {
  console.log(menu,'mmmmmmmmmmmmmmmmmmmmmmm');
  //
  const allmenus = menu.allData

// hook========================================================
  const formRef = useRef();
  const actionRef = useRef();
  // ModelForm
  const createFormRef = useRef();
  const [createForm, setCreateForm] = useState({});
  const [modalVisible, handleModalVisible] = useState(false);
  const [iconVisible, handleIconVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
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
    console.log(fields,'fields');

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


  /**
   * 新增
   * @param fields
   * @returns {Promise<boolean>}
   */
  // const handleAdd = async (fields) => {
  //   const hide = message.loading('正在添加');
  //   try {
  //     const res = await api.add(fields);
  //
  //     hide();
  //     handleModalVisible(false);
  //     message.success('添加成功');
  //     actionRef.current.reload();
  //     return true;
  //   } catch (error) {
  //     hide();
  //     message.error('添加失败请重试！');
  //     return false;
  //   }
  // };
  //
  // /**
  //  * 更新createForm
  //  * @param fields
  //  * @returns {Promise<boolean>}
  //  */
  // const handleUpdate = async (fields) => {
  //   const hide = message.loading('正在更新');
  //   console.log(fields, 'fields');
  //   const param = fields;
  //   param.id = fields.key;
  //   delete param.key;
  //   try {
  //     const resp = await api.update(param);
  //     hide();
  //     message.success('更新成功');
  //     actionRef.current.reload();
  //     return resp.data;
  //   } catch (error) {
  //     hide();
  //     message.error('更新失败请重试！');
  //     return false;
  //   }
  // };

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
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

          {user.permission.indexOf('menu:delete')>-1 &&<>
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
          {user.permission.indexOf('menu:update')>-1&&

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
          }
        </>
      ),
    };

  const [checkStrictly, setCheckStrictly] = React.useState(false);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
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
  const handleUploading = async () => {
    setUploading(true)
    const hide = message.loading('正在导入');
    const data = await importExcel(fileList)

    try {

      await api.importMenu(data);
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

  return (
    <div>

      <Row>
        <Col span={6}>
          <Tree
            checkable
            onSelect={onSelect}
            onCheck={onCheck}
            treeData={menu.data}
          />

        </Col>
        <Col span={18}>

          {/*<Table*/}
          {/*  columns={table.column}*/}
          {/*  rowSelection={{ ...rowSelection, checkStrictly }}*/}
          {/*  dataSource={menu.data}*/}
          {/*/>*/}
          <ProTable
          pagination={false}
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
          }}
          request={(params, sort, filter) => {
            const data = handleQuery(params, sort, filter);
            return data;
          }}
          // 菜单栏
          toolBarRender={(action, { selectedRows }) => [
            user.permission.indexOf('menu:add')>-1&&  <Button type="primary" onClick={() => {
              setCreateForm({});
              handleModalVisible(true);
            }}>
              <PlusOutlined/> 新建
            </Button>,
            user.permission.indexOf('menu:export')>-1&& <Button type="primary" onClick={() => handleExport(true)}>
              <DownloadOutlined/> 导出
            </Button>,
            user.permission.indexOf('menu:import')>-1&& <Button type="primary" onClick={() => handleExport(false)}>
              <DownloadOutlined/> 导入模板
            </Button>,
            user.permission.indexOf('menu:import')>-1&& <Upload {...uploadProps}>
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
          ]}
        />

        </Col>
      </Row>
      <CreateForm
        formRef={createFormRef}
        // formRecord={createForm}
        currentRecord={createForm}
        modalVisible={modalVisible}
        showModal={()=>{
          handleIconVisible(true)
        }}
        allmenus={allmenus}
        onCancel={onCancel}
        onFinish={onFinish}

      />

      <Modal width={900} visible={iconVisible} onCancel={()=>{
        handleIconVisible(false)
      }} footer={null}>
        <IconPreview onCancel={()=>{
          handleIconVisible(false)
        }} />
      </Modal>
    </div>);
};

// 1.将仓库的 CrudModal 传递
const mapStateToProps = (state) => {
  console.log(state,'state');
  const  { menu,user } = state
  return {
    menu,user
  };
};


export default connect(mapStateToProps)(TableList);
