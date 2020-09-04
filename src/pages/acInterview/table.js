
export const table = {
  title:'合同管理表',
  column:[
    {
      title: '访谈ID',
      dataIndex: 'interviewId',
    },
    {
      title: '访谈日期',
      dataIndex: 'interviewDate',
    },
    {
      title: '访谈人员',
      dataIndex: 'Interviewer',
    },
    {
      title: '项目',
      dataIndex: 'project',
    },
    {
      title: '部门Id',
      dataIndex: 'deptId',
    },
    {
      title: '岗位ID',
      dataIndex: 'jobId',
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
