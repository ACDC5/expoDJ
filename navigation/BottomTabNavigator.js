import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
// import HomeScreen from '../screens/HomeScreen';
// import LinksScreen from '../screens/LinksScreen';
import MineScreen from "../screens/MineScreen";
import BaseScreen from "../screens/BaseScreen";
import Popular from "../screens/Popular";
import Notice from "../screens/Notice";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';


export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={BaseScreen}
        options={{
          title: '首页',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />

        <BottomTab.Screen
            name="Popular"
            component={Popular}
            options={{
                title: '时下流行',
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-bonfire" />,
            }}
        />

      <BottomTab.Screen
        name="Notifications"
        component={Notice}
        options={{
          title: '通告',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-bonfire" />,
        }}
      />

      <BottomTab.Screen
          name="Mine"
          component={MineScreen}
          options={{title:'我的',
          tabBarIcon:({focused}) => <TabBarIcon focused={focused} name="md-person"/>
          }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return '首页';
    case 'Popular':
      return '时下流行';
    case 'Notifications':
      return '通告';
    case 'Mine':
      return '个人中心';
  }
}

