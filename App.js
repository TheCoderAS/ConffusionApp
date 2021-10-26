import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler'
import Main from './screens/Main';
import {NavigationContainer} from '@react-navigation/native'

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'

const store=ConfigureStore()
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar/>
      <Provider store={store}>
        <Main/>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
