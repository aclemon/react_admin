import request from '@/utils/request';

export const list = (params)=>{
  return request('/api/check/checks', {
    params,
  });
}

export const removeById = (param)=>{
  return request(`/api/check/${param}`, {
    method:'DELETE',
    // data:params.key
  });
}


export const removeBatch = (params)=>{
  console.log(params,'params');
  return request('/api/check/removeBatch', {
    method:'DELETE',
    data: params
  });
}

export const update = (params)=>{
  return request(`/api/check/${params.id}`, {
    method:'put',
    data: params
  });
}




export const add = (data)=>{
  return request('/api/check', {
    method: 'post',
    data
  });
}



export const importAcCheck = (data)=>{
  return request('/api/acCheck/saveBatch', {
    method: 'post',
    data
  });
}
