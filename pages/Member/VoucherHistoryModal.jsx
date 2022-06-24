import { useState, useRef, useEffect } from "react";
import { ScrollView, View, Text, Modal } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Styled from 'styled-components/native';

export default ({ list }) => {

  return (
    <>
      {list?.map(item => (
        <Li key={item?.HIST_SQ}>
          <Header>
            <Category>{item?.CATEGORY_NAME ?? '-'}</Category>
            <Date>{item?.REG_DT ?? '-'}</Date>
          </Header>
          <Description>{item?.ACTION ?? '-'}</Description>
        </Li>
      ))}
    </>
  )
}

const Li = Styled.View`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  padding: 10px;
`;
const Header = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`
const Category = Styled.Text`
  font-size: 16px;
  font-weight: 700;
`
const Date = Styled.Text`
  
`
const Description = Styled.Text`
  
`