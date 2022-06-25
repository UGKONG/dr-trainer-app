import React from "react";
import { TouchableOpacity, View, Text, Image,  } from "react-native";
import Styled from "styled-components/native";
import userImage from '../../../assets/user.png';

export default ({ navigation, data }) => {

  console.log(data);
  
  return (
    <Container onPress={() => navigation?.navigate('ViewScreen', { name: data?.USER_NM + ' 회원님', id: data?.USER_SQ })}>
      <UserImg source={userImage} />
      <Name>{data?.USER_NM}</Name>
    </Container>
  )
}

const Container = Styled.TouchableOpacity.attrs(
  () => ({ activeOpacity: 0.8 })
)`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #1b8e5f;
  flex-direction: row;
  align-items: center;
`
const UserImg = Styled.Image.attrs(
  ({ source }) => ({ source })
)`
  width: 36px;
  height: 36px;
  border-radius: 40px;
  margin-right: 12px;
`
const Name = Styled.Text`
  color: #fff; 
  font-size: 14px;
`
