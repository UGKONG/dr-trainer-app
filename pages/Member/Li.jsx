import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Styled from "styled-components/native";


export default ({ navigation, data }) => {

  return (
    <Container onPress={() => navigation?.navigate('ViewScreen', { name: data?.USER_NM + ' 회원님', id: data?.USER_SQ })}>
      <Text style={{ fontSize: 13 }}>ID: {data?.USER_SQ} // NAME: {data?.USER_NM}</Text>
    </Container>
  )
}

const Container = Styled.TouchableOpacity`
  width: 100%;
  padding: 16px 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #eee;
`