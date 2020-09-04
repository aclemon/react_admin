import request from '@/utils/request';

export const list = (params)=>{
  return request('/api/acDept/acDepts', {
    params,
  });
}


export const getTree = (params)=>{
  return request('/api/acDept/tree', {
  });
}

export const removeById = (param)=>{
  return request(`/api/acDept/${param}`, {
    method:'DELETE',
    // data:params.key
  });
}


export const removeBatch = (params)=>{
  console.log(params,'params');
  return request('/api/acDept/removeBatch', {
    method:'DELETE',
    data: params
  });
}

export const update = (params)=>{
  return request(`/api/acDept/${params.id}`, {
    method:'put',
    data: params
  });
}




export const add = (data)=>{
  return request('/api/acDept', {
    method: 'post',
    data
  });
}
