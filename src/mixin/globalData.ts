interface Page {
  total?: number;
  currentPage?: number;
  pageSize?: number;
  pageSizes?: number[];
}
export function newEnum (options: any[]) {
  const res: any = {}
  options.forEach((item: any) => {
    res[item.enumMap] = item.value
  })
  return res
}
export default {
  quickDatePickerOptions: {
    shortcuts: [
      {
        text: '这周',
        onClick (picker: any) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * (end.getDay() - 1))
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '这个月',
        onClick (picker: any) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * (end.getDate() - 1))
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近一周',
        onClick (picker: any) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近一个月',
        onClick (picker: any) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近三个月',
        onClick (picker: any) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }
    ]
  },
  dataPickerWidth: '220px',
  datePickerDoubleWidth: '380px',
  page (param: Page = {}) {
    return {
      pageSize: param.pageSize || 50,
      pageSizes: [20, 50, 100, 150, 200, 300],
      total: 0,
      currentPage: 1
    }
  },
  REQSUCCESSCODE: '000000',
  dealSelect2 (options: any[]) {
    options.forEach((item) => {
      item.value = Number(item.value || item.id)
      item.label = item.label || item.name || '--'
    })
    return options
  },
  newEnum,
  // 图片url数组，如果以bold:开头则是正在上传中
  isUploadPending (urls: string[]) {
    // 几张图片中，只要有一张没上传完或者没上传，即不以https开头
    return urls.find((url: any) => url && url.indexOf('https') !== 0)
  },
  msg: {
    'requestFailed': '请求失败',
    'operateSuccess': '操作成功',
    'operateFailed': '操作失败',
    'createSuccess': '创建成功',
    'createFailure': '创建成功',
    'editorialSuccess': '编辑成功',
    'editorialFailure': '编辑成功',
    'deleteSuccess': '删除成功',
    'deleteFailure': '删除成功',
    'copySuccess': '复制成功',
    'copyFailure': '复制成功',
    'uploadSuccess': '上传成功',
    'uploadFailure': '上传失败'
  }
}
