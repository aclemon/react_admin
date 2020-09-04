import request from '@/utils/request';

export const list = (params)=>{
  return request('/api/acJob/acJobs', {
    params,
  });
}

export const removeById = (param)=>{
  return request(`/api/acJob/${param}`, {
    method:'DELETE',
    // data:params.key
  });
}


export const removeBatch = (params)=>{
  console.log(params,'params');
  return request('/api/acJob/removeBatch', {
    method:'DELETE',
    data: params
  });
}

export const update = (params)=>{
  return request(`/api/acJob/${params.id}`, {
    method:'put',
    data: params
  });
}




export const add = (data)=>{
  return request('/api/acUser', {
    method: 'post',
    data
  });
}
