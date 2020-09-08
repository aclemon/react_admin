import { renderSwitch } from '@/utils/mixin';

export const table = {
  title:'用户表',
  column:[
    {
      title: '昵称',
      dataIndex: 'nickName',
      sorter:true,
      filterMultiple:true,
      filters:[{text:'123',value:'123'},{text:'234',value:'234'}]
    },
    {
      title: '账号',
      dataIndex: 'username',
    },
    {
      title: '管理员',
      dataIndex: 'isAdmin',
      render: renderSwitch
    },
    {
      title: '激活状态',
      dataIndex: 'enabled',
      render: renderSwitch
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    // ===============================================
    // ===============================================
    {
      title: '创建时间',
      dataIndex: 'createTime',
      // 控制显示与隐藏需要进行设置
      key:'createTime',
      valueType: 'dateTime'
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key:'updateTime',
      valueType: 'dateTime'
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      key: 'createBy',
    },
    {
      title: '修改人',
      dataIndex: 'updateBy',
      key: 'updateBy',
    },
    // ==================================================
  ],
}
