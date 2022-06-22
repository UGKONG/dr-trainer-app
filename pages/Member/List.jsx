import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Styled from "styled-components/native";
import useAxios from "../../hooks/useAxios";
import Li from "./Li";

export default ({ navigation }) => {
  const [list, setList] = useState([]);

  const getList = () => {
    useAxios.get('/flow_controller.php?task=getUserList').then(({ data }) => {
      setList(JSON.parse(data?.split('|')[0]));
    }).catch(() => alert('서버와 연결을 실패했습니다.'));
  }

  useEffect(getList);

  return (
    <List>
      {list?.map(item => <Li key={item?.USER_SQ} data={item} navigation={navigation} />)}
    </List>
  )
}

const List = Styled.ScrollView`
  padding: 10px;
`