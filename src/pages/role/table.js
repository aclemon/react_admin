
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
