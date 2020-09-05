import { stringify } from 'querystring';
import { history } from 'umi';
import { accountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import {encrypt} from '@/utils/rsaEncrypt';
import { setToken } from '@/utils/cookies';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      console.log(payload,"payload");
      let param = {}
      param = payload
      param.password = encrypt(param.password);
      const response = yield call(accountLogin, param);
      const {data,code} = response
      localStorage.setItem('token',data.token)
      console.log(data.token,'data.token');
      setToken(data.token)
      yield put({
        type: 'changeLoginStatus',
        payload: data,
      }); // Login successfully

      if (code=== '000000') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority('admin');

      return { ...state, status: 'ok', type: 'account' };
    },
  },
};
export default Model;
