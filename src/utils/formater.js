import React  from 'react';
import XLSX from 'xlsx';

// 格式化日期
export function renderTime(value, row, index) {
  let data = value;
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(data)) return data;
  data = data.replace(' ', ' \n ');
  data = data.replace('T', ' \n ');
  data = data.substring(0, 21);
  return <pre>{data}</pre>;
}

export function removeEmptyParam(o, noDeleteStrLen0) {
  trimStr(o);
  // eslint-disable-next-line no-restricted-syntax
  for (const key in o) {
    const type = Object.prototype.toString.call(o[key]).slice(8, -1);
    if (type === 'Object') {
      removeEmptyParam(o[key]);
    } else if (o[key] === '' && !noDeleteStrLen0) {
      delete o[key];
    } else if (
      o[key] === -1 ||
      o[key] === undefined ||
      o[key] === null ||
      (type === 'Number' && Number.isNaN(Number(o[key])))
    ) {
      delete o[key];
    }
  }

  return o;
}

function trimStr(o) {
  for (const key in o) {
    const type = Object.prototype.toString.call(o[key]).slice(8, -1);
    // console.log(type,Object.prototype.toString.call(o[key]),'============')
    if (type === 'String') {
      o[key] = o[key].trim();
    } else if (type === 'Object') {
      trimStr(o[key]);
    } else if (type === 'Array') {
      for (let i = 0; i < o[key].length;  i += 1) {
        trimStr(o[key][i]);
      }
    }
  }
}

export function setState(newState, changeStateFn, callback) {
  changeStateFn((state, props) => {
    console.log(state, state.constructor, state.constructor === Array, 'state');
    if (state.constructor === Object) {
      state = { ...state, ...newState };
    }
    if (state.constructor === Array) {
      state = newState.slice();
      // newState.foreach((itme)=>{
      //   state.push(item)
      // })
      // console.log(state, props, 'Array');
    }
    callback(state);
    return state;
  });
}
const valueEnum= {
  0: {text: '关闭', status: 'Default'},
  1: {text: '进行中', status: 'Processing'},
  2: {text: '完成', status: 'Success'},
  3: {text: '异常', status: 'Error'},
}


export function exportExcel(headers, data, exportFlag) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const fileName =  exportFlag?'crud.xlsx':'template.xlsx'
  const cHeaders = headers
  .map((item, i) => ({
    key: item.key,
    title: item.title,
    dataIndex: item.dataIndex,
    position: String.fromCharCode(65 + i) + 1,
  }))
  .reduce((prev, next) => ({ ...prev, [next.position]: { key: next.dataIndex, v: exportFlag?next.title:next.dataIndex } }), {});
  console.log(cHeaders,'cHeaders')

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
    const param={}
    if (exportFlag){
      if (next.dataIndex==="progress"){
        param[next.position]={v:`${next.content}%`}
      }else if(next.dataIndex==="status"){
        param[next.position]={v:valueEnum[next.content].text}
        console.log(param,'param')
      }else{
        param[next.position]={v:next.content}
      }
    }else{
      param[next.position]={v:next.content}
    }
    return {
      ...prev,...param
    }
  }, {});
  console.log(cData, 'cData');

  // 合并 headers 和 data
  const output = { ...cHeaders, ...cData };
  console.log(output,'output')
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

export function formatDate(numb, format) {
  let time = new Date((numb - 1) * 24 * 3600000 + 1);
  time = time.setYear(time.getFullYear() - 70)
  const year = `${time.getFullYear()}`;
  const month = `${time.getMonth() + 1}`;
  const date = `${time.getDate() - 1}`;
  if (format && format.length === 1) {
    return year + format + month + format + date;
  }
  return year + (month < 10 ? `0${month}` : month) + (date < 10 ? `0${date}` : date);
}
