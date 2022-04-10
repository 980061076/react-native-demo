import { atom } from "recoil";

export const topType = atom({
    //key
    key: 'topType', 
    //默认值
    default: ['jsvaScript','java','css'],
  });