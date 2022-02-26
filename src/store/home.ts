import { atom } from "recoil";

export const textState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: {
        num:12,
        age:34
    }, // default value (aka initial value)
  });