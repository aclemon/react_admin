import request from '@/utils/request';

export const list = (params)=>{
  return request('/api/acContract/acContracts', {
    params,
  });
}

export const removeById = (param)=>{
  return request(`/api/acContract/${param}`, {
    method:'DELETE',
    // data:params.key
  });
}


export const removeBatch = (params)=>{
  console.log(params,'params');
  return request('/api/acContract/removeBatch', {
    method:'DELETE',
    data: params
  });
}

export const update = (params)=>{
  return request(`/api/acContract/${params.id}`, {
    method:'put',
    data: params
  });
}




export const add = (data)=>{
  return request('/api/acContract', {
    method: 'post',
    data
  });
}

export const importBatch = (data)=>{
  return request('/api/acContract/saveBatch', {
    method: 'post',
    data
  });
}
