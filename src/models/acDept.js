import * as api from '@/services/acDept';
import _ from 'lodash'

const AcDeptModel = {
  namespace: 'acDept',
  state: {
    data: [],
  },
  effects: {
    *getRemote ({ payload: { param, sorter = {}, filter = {} } }, { put, call }) {
      console.log(param, sorter, filter, 'payload param');
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

      return {...state,data:payload};
    },
  },
  // 订阅
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/mnt/acDept') {
          dispatch({
            type: 'getRemote',
            payload: {
              param: {

              },
            },
          });
        }
      });
    },
  },
};
export default AcDeptModel;
