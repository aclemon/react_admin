import * as api from '@/services/role'
import _ from 'lodash';

const RoleModel = {
  namespace: 'role',
  state: {
    data: [],
    pageSize: 10,
    total:100,
    current:1
  },
  effects: {
    *fetchRoles({ payload: { param, sorter = {}, filter = {} } }, { put, call }){
      const {data:res} = yield call(api.list,param);
      if (!_.isEmpty(res) ) {
        yield put({
          type: 'getList',
          payload: res.records,
        });
      }

    }
  },
  reducers: {
    getList(state, { payload }) {
      console.log('reduces 同步->', payload);
      return { ...state,data: payload};
    },
  },
  // 订阅
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/system/role') {
          dispatch({
            type: 'menu/getAllRemote',
            payload: {
              param: {
              },
            },
          });
        }
      });
    },
  },
}
export default RoleModel;
