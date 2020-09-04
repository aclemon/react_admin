
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
    },
    {
      title: '激活状态',
      dataIndex: 'enable',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    // ===============================================
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
    },
    {
      title: '修改人',
      dataIndex: 'updateBy',
    },
    // ==================================================
  ],
}
