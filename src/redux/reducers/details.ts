import Taro from '@tarojs/taro'
import { DETAILS, DETAILS_DATA } from '../constants/details'

// 获取登录状态
const getDetails = () => {
  return  Taro.getStorageSync(DETAILS_DATA) || null
}

const INITIAL_STATE = {
  details: getDetails()
}

export default function details (state = INITIAL_STATE, action) {
  switch (action.type) {
    case DETAILS:
      return {
        ...state,
        details: action.data
      }
     default:
       return state
  }
}
