import React from "react";
import { ScrollView, View, Text } from "react-native";
import Styled from "styled-components/native"
import useStore from '../../hooks/useStore';

export default () => {
  const isLogin = useStore(x => x?.isLogin);

  return (
    <Container>
      <Text>대시보드</Text>
      {/* <Text>로그인 강사 ID : {isLogin?.id}</Text> */}
    </Container>
  )
}

const Container = Styled.View`
  padding: 10px;
  flex: 1;
  align-items: center;
  justify-content: center;
`