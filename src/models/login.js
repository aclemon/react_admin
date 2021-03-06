import { stringify } from 'querystring';
import { history } from 'umi';
import { accountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import {encrypt} from '@/utils/rsaEncrypt';
import { removeToken, setToken } from '@/utils/cookies';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      // console.log(payload,"payload");
      let param = {}
      param = payload
      param.password = encrypt(param.password);
      const response = yield call(accountLogin, param);
      const {data,code} = response
      if (code=== '000000') {
        yield put({
          type: 'changeLoginStatus',
          payload: { data,code },
        });
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
      }else {
        yield put({
          type: 'changeLoginStatus',
          payload: {data,code}
        });
      }

    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      removeToken()

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
      if (payload.code === '000000'){
        localStorage.setItem('token',payload.data.token)
        setToken(payload.data.token)
        setAuthority('admin');
        return { ...state, status: 'ok', type: 'account' };
      }else {
        return {
          ...state,status: 'error',type: 'account'
        }
      }

    },
  },
};
export default Model;
