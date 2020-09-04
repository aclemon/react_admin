import request from '@/utils/request';

export const list = (params)=>{
  return request('/api/acUser/acUsers', {
    params,
  });
}

export const removeById = (param)=>{
  return request(`/api/acUser/${param}`, {
    method:'DELETE',
    // data:params.key
  });
}


export const removeBatch = (params)=>{
  console.log(params,'params');
  return request('/api/acUser/removeBatch', {
    method:'DELETE',
    data: params
  });
}

export const update = (params)=>{
  return request(`/api/acUser/${params.id}`, {
    method:'put',
    data: params
  });
}
export const upload = (params)=>{
  console.log(params,'params');
  return request(`/api/minio/upload`, {
    method:'Post',
    data: params
  });
}



export const add = (data)=>{
  return request('/api/acUser', {
    method: 'post',
    data
  });
}


