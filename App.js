import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler'
import Main from './screens/Main';
import {NavigationContainer} from '@react-navigation/native'

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'
import { PersistGate } from 'redux-persist/integration/react';
import { Loading } from './screens/components/Loading';

const {store, persistor}=ConfigureStore()
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar/>
      <Provider store={store}>
        <PersistGate
          loading={<Loading/>}
          persistor={persistor}
        >
          <Main/>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
