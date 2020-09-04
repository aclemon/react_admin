import request from '@/utils/request';

export const list = (params)=>{
  return request('/api/role/roles', {
    params,
  });
}

export const removeById = (param)=>{
  return request(`/api/role/${param}`, {
    method:'DELETE',
    // data:params.key
  });
}


export const removeBatch = (params)=>{
  console.log(params,'params');
  return request('/api/role/removeBatch', {
    method:'DELETE',
    data: params
  });
}

export const update = (params)=>{
  return request(`/api/role/${params.id}`, {
    method:'put',
    data: params
  });
}




export const add = (data)=>{
  return request('/api/role', {
    method: 'post',
    data
  });
}


