import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import useStore from '../../hooks/useStore';

export default () => {
  const isLogin = useStore(x => x?.isLogin);

  return (
    <SafeAreaView>
      <Text>Home View</Text>
      <Text>로그인 강사 ID : {isLogin?.id}</Text>
    </SafeAreaView>
  )
}