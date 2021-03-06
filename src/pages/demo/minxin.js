import * as api from '@/services/acUser.js';
import { removeEmptyParam } from '@/utils/formater';
import { message,Image  } from 'antd';
import React from 'react';
import XLSX from 'xlsx';
import { table } from './table';
import _ from 'lodash'

// method======================================================
/**
 * 查询
 * @param params
 * @param sorter
 * @param filter
 * @returns {Promise<{}>}
 *
 */

export const genderList = [
  { id: 1, value: '男' },
  { id: 2, value: '女' },
  { id: 3, value: 'o_o ....' },
]

export const trainingList = [
  { id: 0, value: '关闭' },
  { id: 1, value: '进行中' },
  { id: 2, value: '完成' },
  { id: 3, value: '异常' },
];

export function renderImg(value, row, index) {
  const data = value;
  return  (data?<Image  width={50} height={50} src={data} />:'--');
}

export function getGenderLabel(value, row, index) {
  if (_.isNull(value)) return '--'
  const res =   genderList.find((item)=>{return  item.id === value});
  return  res.value;
}
export function getTrainingLabel(value, row, index) {
  if (_.isNull(value)) return '--'
  const res =   trainingList.find((item)=>{return  item.id === value});
  return  res.value;
}



export const handleQuery = async (params, sorter = {}, filter = {}) => {
  const resp = {}
  try {
    console.log(params, sorter, filter, 'params, sorter, filter');
    removeEmptyParam(params);
    // todo 后端添加sorter 和filter
    const {data:result} = await api.list({ ...params});

    console.log(result,'result');
    resp.data = result.records;
    // 没key报错
    resp.data.forEach((item) => {
      item.key = item.userId;
    });
    resp.pageSize = result.size
    resp.total = result.total
    resp.current = result.current
  } catch (e) {
    message.error(e);
  }
  return resp;
};

/**
 * 删除
 * @param exportFlag
 * @returns {Promise<boolean>}
 */
export const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  console.log(selectedRows, 'selectedRows')
  const s = new Set();
  Array.isArray(selectedRows) ? selectedRows.forEach((item) => s.add(item)) : s.add(selectedRows);
  const param = Array.from(s);
  try {
    let apiFn = ()=>{};
    if (param.length===1){
      apiFn = api.removeById
    }else{
      apiFn = api.removeBatch
    }
    const resp =  await apiFn(param.map((row) => row.key))
    hide();
    message.success('删除成功，即将刷新');
    return resp.data;
  } catch (e) {
    hide();
    message.error(e);
    return false;
  }
};

/**
 * 导出
 * @param exportFlag
 * @returns {Promise<void>}
 */
export const handleExport = async (exportFlag) => {
  const resp = await handleQuery({
    current: 1,
    // 导出或者导出模板
    pageSize: exportFlag ? 1000 : 1,
    _timestamp: new Date().getTime(),
  });
  exportExcel(table.column, resp.data, exportFlag);
};


export function exportExcel (headers, data, exportFlag) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const fileName = exportFlag ? '外包人员信息表.xlsx' : 'template.xlsx';
  const cHeaders = headers
    .map((item, i) => ({
      key: item.key,
      title: item.title,
      dataIndex: item.dataIndex,
      position: String.fromCharCode(65 + i) + 1,
    }))
    .reduce((prev, next) => ({
      ...prev,
      [next.position]: { key: next.dataIndex, v: exportFlag ? next.title : next.dataIndex },
    }), {});
  console.log(cHeaders, 'cHeaders');

  const cData = data
    .map((item, i) =>
      headers.map((key, j) => ({
        dataIndex: key.dataIndex,
        content: item[key.dataIndex],
        position: String.fromCharCode(65 + j) + (i + 2),
      })),
    )
  // 对刚才的结果进行降维处理（二维数组变成一维数组）
    .reduce((prev, next) => prev.concat(next))
  // 转换成 worksheet 需要的结构
    .reduce((prev, next) => {
      const param = {};
      if (exportFlag) {
      // else if (next.dataIndex === 'status') {
      //     param[next.position] = { v: trainingList[next.content].value };
      //     console.log(param, 'param');
      //   }
        if (next.dataIndex === 'progress') {
          param[next.position] = { v: `${next.content}%` };
        } else {
          param[next.position] = { v: next.content };
        }
      } else {
        param[next.position] = { v: next.content };
      }
      return {
        ...prev, ...param,
      };
    }, {});
  console.log(cData, 'cData');

  // 合并 headers 和 data
  const output = { ...cHeaders, ...cData };
  console.log(output, 'output');
  // 获取所有单元格的位置
  const outputPos = Object.keys(output);
  // 计算出范围 ,["A1",..., "H2"]
  const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;

  // 构建 workbook 对象
  const wb = {
    SheetNames: ['mySheet'],
    Sheets: {
      mySheet: {
        ...output,
        '!ref': ref,
        '!cols': [
          { wpx: 100 },
          { wpx: 100 },
          { wpx: 100 },
          { wpx: 100 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
        ],
      },
    },
  };
  // 导出 Excel
  XLSX.writeFile(wb, fileName);
}
