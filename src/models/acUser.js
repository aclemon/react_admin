import * as api from '@/services/acDept';
import _ from 'lodash'

const AcDeptModel = {
  namespace: 'acUser',
  state: {
    data: [],
  },
  effects: {
    *getRemote ({ payload: { param, sorter = {}, filter = {} } }, { put, call }) {
      const {data:res} = yield call(api.getTree);
      console.log(res,'resres');
      if (!_.isEmpty(res) ) {
        yield put({
          type: 'getList',
          payload: res,
        });
      }
    },
  },
  reducers: {
    getList(state, { payload }) {
      console.log('reduces 同步->', payload);
      return payload;
    },
  },
  // 订阅
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/mnt/user') {
          dispatch({
            type: 'getRemote',
            payload: {
            },
          });
        }
      });
    },
  },
};
export default AcDeptModel;
