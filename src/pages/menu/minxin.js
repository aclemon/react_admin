import * as api from '@/services/menu.js';
import { removeEmptyParam } from '@/utils/formater';
import { message } from 'antd';
import React from 'react';
import XLSX from 'xlsx';
import { table } from './table';

// method======================================================



export const menuList = [
  { id: 1, value: '菜单' },
  { id: 2, value: '按钮' },
]

export const importExcel = (files) => {
  return new Promise(function (resolve, reject) {
    // 获取上传的文件对象
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
    fileReader.onload = (event) => {
      try {
        const {result} = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, {type: 'binary', cellDates: true});
        let data = []; // 存储获取到的数据
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        // eslint-disable-next-line no-restricted-syntax
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        resolve(data);
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        message.error(e);
      }
    };
  });
};

// 新建菜单->选择父级菜单时的数据->格式化
export const formatData = data => {
  console.log('formatData',data);
  if (Array.isArray(data)) {
    return filterData(data).map(item => {
      return item.children
        ? {
          title: item.title,
          // value: item.treeId,
          key: item.key,
          children: formatData(item.children),
        }
        : {
          title: item.title,
          // value: item.treeId,
          key: item.key,
        };
    });
  }
  return [];
};
// 新建按钮级权限->选择页面时的数据->格式化
export const formatPageData = data => {
  if (Array.isArray(data)) {
    return data.map(item => {
      return {
        title: item.name,
        value: item.id,
        key: item.id,
        children: item.resourceType === 'button' ? null : formatPageData(item.children),
        selectable: item.resourceType === 'button',
      };
    });
  }
  return [];
};
// const treeData = allmenus.length === 0 ? [] : formateData(allmenus);
// const pageData = allmenus.length === 0 ? [] : formatePageData(allmenus);




const filterData = array => {
  return array.filter(item => {
    //  1代表menu
    return item.type === 1 ;
  });
};









/**
 * 查询
 * @param params
 * @param sorter
 * @param filter
 * @returns {Promise<{}>}
 *
 */
export const handleQuery = async (params, sorter = {}, filter = {}) => {
  const resp = {}
  try {
    console.log(params, sorter, filter, 'params, sorter, filter');
    removeEmptyParam(params);
    // todo 后端添加sorter 和filter
    const {data:result} = await api.list({...params});
    console.log(result,'result');
    resp.data = result.records

    // 没key报错
    resp.data.forEach((item) => {
      item.key = item.menuId;
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
  const data = await handleQuery({
    current: 1,
    pageSize: exportFlag ? 1000 : 1,
    _timestamp: new Date().getTime(),
  });
  exportExcel(table.column, data.data, exportFlag);
};






export function exportExcel (headers, data, exportFlag) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const fileName = exportFlag ? 'crud.xlsx' : 'template.xlsx';
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
        if (next.dataIndex === 'progress') {
          param[next.position] = { v: `${next.content}%` };
        } else if (next.dataIndex === 'status') {
          param[next.position] = { v: valueEnum[next.content].text };
          console.log(param, 'param');
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
