import request from '@/utils/request';

export const list = (params)=>{
  return request('/api/acInterview/acInterviews', {
    params,
  });
}

export const removeById = (param)=>{
  return request(`/api/acInterview/${param}`, {
    method:'DELETE',
    // data:params.key
  });
}


export const removeBatch = (params)=>{
  console.log(params,'params');
  return request('/api/acInterview/removeBatch', {
    method:'DELETE',
    data: params
  });
}

export const update = (params)=>{
  return request(`/api/acInterview/${params.id}`, {
    method:'put',
    data: params
  });
}




export const add = (data)=>{
  return request('/api/acInterview', {
    method: 'post',
    data
  });
}
