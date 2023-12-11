import { Tabs } from "expo-router";
import React from "react";
import Colors from "../../constants/Colors";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: { fontFamily: "Nova" },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='search' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='whislist'
        options={{
          tabBarLabel: "Wishlist",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='heart' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='trips'
        options={{
          tabBarLabel: "Stories",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='hiking' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='inbox'
        options={{
          tabBarLabel: "Inbox",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='message-outline'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='account' color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
