import { queryCurrent, query as queryUsers,list } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    data: [],
    meta: {
      total: 100,
      pageSize: 5,
      current: 1,
    }
  },
  effects: {
    *fetch(_, { call, put }) {
      console.log('userModel=============Fetch');
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *getRemote({ payload: { param,sorter={},filter={} } }, { put, call }) {

      console.log(param,sorter,filter,'payload param')
      const data = yield call(list, { ...param,sorter,filter });
      console.log(data,'data')
      if (data) {
        yield put({
          type: 'getList',
          payload: data,
        });
      }
    },
    *fetchCurrent(_, { call, put }) {
      console.log('fetchCurrent');
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    getList(state, { payload }) {
      console.log('reduces 同步->', payload);
      return payload;
    },
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
