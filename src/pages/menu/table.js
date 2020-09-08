import { renderIcon } from '@/utils/mixin'
export const table = {
  title:'菜单表',
  column:[
    {
      title: '标题',
      dataIndex: 'title',
      width: 200
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '地址',
      dataIndex: 'component',
    },
    {
      title: '排序',
      dataIndex: 'menuSort',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      render: renderIcon
    },
    {
      title: '访问路径',
      dataIndex: 'path',
    },
    {
      title: '缓存',
      dataIndex: 'cache',
    },
    {
      title: '权限',
      dataIndex: 'permission',
    },
    // ===============================================
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime'
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
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
