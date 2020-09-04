import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/user/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function queryUser(params) {
  return request('/api/user/users', {
    params,
  });
}

export const list = (params)=>{
  return request('/api/user/users', {
    params,
  });
}

export const removeById = (param)=>{
  return request('/api/user/'+param, {
    method:'DELETE',
    // data:params.key
  });
}


export const removeBatch = (params)=>{
  console.log(params,'params');
  return request('/api/user/removeBatch', {
    method:'DELETE',
    data: params
  });
}

export const update = (params)=>{
  return request('/api/user/'+params.id, {
    method:'put',
    data: params
    // data:params.key
  });
}




export const add = (data)=>{
  return request('/api/user', {
    method: 'post',
    data
  });
}
