import * as api from '@/services/menu'
import _ from 'lodash';

const MenuModel = {
  namespace: 'menu',
  state: {
    data: [],
  },
  effects: {
    *getRemote ({ payload: { param, sorter = {}, filter = {} } }, { put, call }) {
      console.log(param, sorter, filter, 'payload param');
      const {data:res} = yield call(api.getMenuTree);
      console.log(res,'res');
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
      return { ...state,data: payload};
    },
  },
  // 订阅
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/system/menu') {
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
}
export default MenuModel;
