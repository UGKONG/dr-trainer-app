import { useState, useRef, useEffect } from "react";
import { ScrollView, View, Text, Modal } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Styled from 'styled-components/native';
import useAxios from "../../../hooks/useAxios";

export default ({ data }) => {

  const [list, setList] = useState([]);

  const getList = () => {
    useAxios.post('/flow_controller.php?task=GetUserHistoryList', { START_DT: '2000-01-01', END_DT: '3000-01-01', MEMBER_SQ: data }).then(({ data }) => {
      let _data = data?.split('|')[0];
      _data = JSON.parse(_data);
      _data?.sort((a, b) => Number(b?.HIST_SQ) - Number(a?.HIST_SQ));
      console.log(_data);
      setList(_data);
    });
  }

  useEffect(getList, []);

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