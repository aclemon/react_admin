import {renderImg,getTrainingLabel,getGenderLabel} from '@/pages/acUser/minxin';
import _ from 'lodash'

export const table = {
  title:'外包人员信息表',
  column:[
    {
      title: '序号',
      dataIndex: 'numbering',
      width:70,
      fixed:'left',
    },
    {
      title: '姓名',
      dataIndex: 'username',
      width:70,
      fixed:'left',
    },
    {
      title: '岗位',
      dataIndex: 'acJobPos',
      width:100,
      render: (value, row, index)=>{
        console.log(value,'value');
        return _.isNull(value)?'--':value[0].name
      }
    },
    {
      title: '部门',
      dataIndex: 'acDeptPos',
      width:100,
      render: (value, row, index)=>{
        return _.isNull(value)?'--':value[0].name
      }
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      width:100,
      valueType: 'date'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      width:100,
      render: getGenderLabel
    },
    {
      title: '身份证号码',
      dataIndex: 'idcard',
      width:100,
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      width:100,
    },
    {
      title: '毕业学校',
      dataIndex: 'graduateSchool',
      width:100,
    },
    {
      title: '学历',
      dataIndex: 'education',
      width:100,
    },
    {
      title: '合同',
      dataIndex: 'contract',
      width: 100,
      render: renderImg
    },
    {
      title: '保密协议',
      dataIndex: 'confidentialityAgreement',
      width: 100,
      render: renderImg
    },
    {
      title: '政治审查情况',
      dataIndex: 'politicalReview',
      width:100,

    },
    {
      title: '培训情况',
      dataIndex: 'trainingSituation',
      width:100,
      render: getTrainingLabel
    },
    {
      title: '健康证明状态',
      dataIndex: 'healthStatus',
      width: 100,
      render: renderImg
    },
    {
      title: '到岗时间',
      dataIndex: 'arrivalTime',
      width:100,
      valueType: 'dateTime'
    },
    {
      title: '退出时间',
      dataIndex: 'exitTime',
      width:100,
      valueType: 'dateTime'
    },
    {
      title: '状态',
      dataIndex: 'status',
      width:100,
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      width:100,
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
      valueType: 'dateTime'
    },
    {
      title: '修改人',
      dataIndex: 'updateBy',
      key: 'updateBy',
      valueType: 'dateTime'
    },
    // ==================================================
  ],
}
