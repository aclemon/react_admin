import moment from 'moment'
import {Icon,Switch} from 'antd'
import React from 'react';
export function  renderDateTime (value,row,index) {
  console.log(value,'dateValue');
  return moment(value).format();
}


export function renderSwitch (value,row,index) {
  return  (<Switch defaultChecked={value} disabled/>)

}


export function renderIcon (value,row,index) {
  // <Icon/>
}
