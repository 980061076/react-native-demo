/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Home from '@pages/home';
import TextView from '@pages/text';

const App = () => {

  return (
    <RecoilRoot>
      <Home />
      <TextView/>
    </RecoilRoot>
  );
};

export default App;
