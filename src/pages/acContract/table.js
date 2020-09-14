import {renderSwitch} from '@/utils/mixin'
export const table = {
  title:'部门管理表',
  column:[
    {
      title: '合同ID',
      dataIndex: 'contractId',
    },
    {
      title: '部门名称',
      dataIndex: 'deptName',
    },
    {
      title: '岗位名称',
      dataIndex: 'jobName',
    },

    {
      title: '审批状态',
      dataIndex: 'status',
    },
    {
      title: '合同提供商',
      dataIndex: 'contractProvider',
    },
    {
      title: '外包项目',
      dataIndex: 'project',
    },
    {
      title: '合同开始日期',
      dataIndex: 'contractStartTime',
      valueType:'dateTime'
    },
    {
      title: '合同结束日期',
      dataIndex: 'contractEndTime',
      valueType:'dateTime'
    },
    {
      title: '自动延期',
      dataIndex: 'autoDelay',
      render: renderSwitch
    },
    {
      title: '购买外包保险',
      dataIndex: 'enabledInsurance',
      render: renderSwitch
    },
    {
      title: '保险结束日期',
      dataIndex: 'insuranceEndTime',
      valueType: 'dateTime'
    },
    {
      title: '集中采购日期',
      dataIndex: 'purchaseStartTime',
      valueType: 'dateTime'
    },
    {
      title: '集中采购到期日',
      dataIndex: 'purchaseEndTime',
      valueType: 'dateTime'
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
