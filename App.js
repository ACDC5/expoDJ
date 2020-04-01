import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View,Button } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Developing from "./components/pages/Developing";
import RegisterSuccessfully from "./components/pages/RegisterSuccessfully";

const Stack = createStackNavigator();

export default function App(props) {

  // 声明一个新的叫做 “isLoadingComplete” 的 state 变量
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState('');
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator}
                          // options={{headerStyle:{
                          //   backgroundColor:'#f4511e'},
                            // headerRight: () => (
                            //     <Button
                            //         onPress={() => alert('This is a button!')}
                            //         title="Info"
                            //     />
                            // ),
                            // headerLeft: () => (
                            //     <Button
                            //         onPress={() => alert('This is a button!')}
                            //         title="left"
                            //     />
                            // ),
                         // }}
            />

            <Stack.Screen name="Login" component={Login}
                          options={{
                            title: '登录'}}
            />

            <Stack.Screen name="Register" component={Register}
                          options={{title:'注册'}}
            />

            <Stack.Screen name="Developing" component={Developing}
                          options={{title:'开发中'}}
            />

            <Stack.Screen name="RegisterSuccessfully" component={RegisterSuccessfully}
                          options={{title:'注册成功'}}/>

          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
