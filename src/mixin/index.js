import XLSX from 'xlsx'


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
