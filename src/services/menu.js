import request from '@/utils/request';

export const list = (params)=>{
  return request('/api/menu/menus', {
    params,
  });
}

export const removeById = (param)=>{
  return request(`/api/menu/${param}`, {
    method:'DELETE',
    // data:params.key
  });
}


export const removeBatch = (params)=>{
  console.log(params,'params');
  return request('/api/menu/removeBatch', {
    method:'DELETE',
    data: params
  });
}

export const update = (params)=>{
  return request(`/api/menu/${params.id}`, {
    method:'put',
    data: params
  });
}

export const getMenuTree = ()=>{
  return request(`/api/menu/currentUser/tree`, {
    method:'get',
  });
}

export const getAllTree = ()=>{
  return request(`/api/menu/trees`, {
    method:'get',
  });
}



export const add = (data)=>{
  return request('/api/menu', {
    method: 'post',
    data
  });
}
