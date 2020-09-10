import{renderSwitch} from '@/utils/mixin';

export const table = {
  title:'岗位管理表',
  column:[
    {
      title: '岗位名称',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      render: renderSwitch
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
