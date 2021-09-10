import React from 'react'
import { Provider } from 'react-redux'
import Store from './src/redux/Store'
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Screens from './src/screens/Screens'
import { rootNav } from './src/common/RootNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Colors from './src/styles/Colors';
import { Provider as ContextProvider } from './src/context/FilterContext'
import { Provider as AddressProvider } from './src/context/AddressContext'
import { Provider as CartProvider } from './src/context/CartContext'
import { Provider as ClickProvider } from './src/context/ClickContext'
import { Provider as UserProvider } from './src/context/AuthContext'

// import ADummy from './ADummy'

const App = () => {
  return (
    <Provider store={Store}>
      <StatusBar barStyle='light-content' color={Colors.primary} />
      <SafeAreaProvider>
        <NavigationContainer ref={rootNav}>
          <StatusBar backgroundColor={Colors.primaryDark} />
          <UserProvider>
            <CartProvider>
              <AddressProvider>
                <ContextProvider>
                  <ClickProvider>
                    <Screens />
                  </ClickProvider>
                </ContextProvider>
              </AddressProvider>
            </CartProvider>
          </UserProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App