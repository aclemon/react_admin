
export const table = {
  title:'部门管理表',
  column:[
    {
      title: '合同ID',
      dataIndex: 'contractId',
    },
    {
      title: '部门Id',
      dataIndex: 'deptId',
    },
    {
      title: '岗位Id',
      dataIndex: 'jobId',
    },
    {
      title: '合同提供商',
      dataIndex: 'contractProvider',
    },
    {
      title: '合同开始日期',
      dataIndex: 'contractStartTime',
    },
    {
      title: '合同结束日期',
      dataIndex: 'contractEndTime',
    },
    {
      title: '自动延期',
      dataIndex: 'autoDelay',
    },
    {
      title: '购买外包保险',
      dataIndex: 'enabledInsurance',
    },
    {
      title: '保险结束日期',
      dataIndex: 'insuranceEndTime',
    },
    {
      title: '集中采购日期',
      dataIndex: 'purchaseStartTime',
    },
    {
      title: '集中采购到期日',
      dataIndex: 'purchaseEndTime',
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
