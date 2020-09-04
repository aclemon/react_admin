
export const table = {
  title:'用户表',
  column:[
    {
      title: '角色',
      dataIndex: 'name',
      sorter:true,
      filterMultiple:true,
      filters:[{text:'123',value:'123'},{text:'234',value:'234'}]
    },
    {
      title: '等级',
      dataIndex: 'level',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '数据权限',
      dataIndex: 'dataScope',
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
