import moment from 'moment'
import {Icon,Switch,Tag} from 'antd'
import React from 'react';
import _ from 'lodash'


const colorList = ["purple","magenta","red","volcano","green","cyan","blue","geekblue"]

export function  renderDateTime (value,row,index) {
  console.log(value,'dateValue');
  return moment(value).format();
}



export function renderSwitch (value,row,index) {
  return  (<Switch defaultChecked={value} disabled/>)

}
export function renderTags (value,row,index) {

  const valueTags = value.map((item,itemIndex)=> (<Tag color={colorList[itemIndex]} key={itemIndex}>
     {item}
  </Tag>
  ))

  return  valueTags

}


export function renderIcon (value,row,index) {
  // <Icon/>
}
