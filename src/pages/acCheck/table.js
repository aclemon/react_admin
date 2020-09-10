
export const table = {
  title:'营运外包检查情况表',
  column:[

    {
      title: '工作部门',
      dataIndex: 'deptName',
    },
    {
      title: '工作岗位',
      dataIndex: 'jobName',
    },
    {
      title: '外包项目',
      dataIndex: 'project',
    },
    {
      title: '检查人员',
      dataIndex: 'checkUser',
    },
    {
      title: '检查日期',
      dataIndex: 'checkTime',
      valueType:'dateTime'
    },
    {
      title: '检查次数',
      dataIndex: 'checkNumber',
    },
    {
      title: '问题个数',
      dataIndex: 'questionNumber',
    },
    {
      title: '经济处罚',
      dataIndex: 'financialPenalty',
    },
    {
      title: '调研次数',
      dataIndex: 'surveysNumber',
    },
    // ===============================================
    {
      title: '创建时间',
      dataIndex: 'createTime',
      // 控制列显示与隐藏需要进行设置
      key:'createTime'
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key:'updateTime'
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      key: 'createBy'
    },
    {
      title: '修改人',
      dataIndex: 'updateBy',
      key: 'updateBy'
    },
    // ==================================================
  ],
}
