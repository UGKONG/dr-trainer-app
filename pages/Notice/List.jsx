import { useEffect, useState, useCallback } from "react";
import { ScrollView, Text, View, Modal } from "react-native";
import Styled from "styled-components/native";
import BaseModal from "../Common/BaseModal";
import useAxios from "../../hooks/useAxios";

export default ({ navigation }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectData, setSelectData] = useState({});
  const [list, setList] = useState([]);

  const getList = () => {
    let form = new FormData();
        form.append('NOTICE_TYPE', 1);

    useAxios.post('flow_controller.php?task=getNoticeList', form).then(({ data }) => {
      setList(data);
    })
  }

  const noticeClick = clickData => {
    setIsOpen(true);
    setSelectData(clickData);
    console.log(clickData);
  }

  useEffect(getList, []);

  const NoticeView = useCallback(({ data }) => (
    <NoticeViewContainer visible={isOpen} animationType='slide'>
      <Text>작성자: {data?.CREATEDBY}</Text>
      <Text>작성일: {data?.CREATEDDT}</Text>
      <Text>내용{data?.NOTICE_CONTENTS}</Text>
    </NoticeViewContainer>
  ), [isOpen]);


  return (
    <Container>
      {list?.map((item, idx) => (
        <NoticeLi key={idx} onPress={() => noticeClick(item)}>
          <NoticeLiText>{idx}. {item?.NOTICE_TITLE}</NoticeLiText>
        </NoticeLi>
      ))}
      <BaseModal data={{
        state: isOpen, setState: setIsOpen, 
        name: '공지사항 상세보기', component: <NoticeView data={selectData} />
      }}/>
    </Container>
  )
}

const Container = Styled.ScrollView`
  padding: 10px;
`
const NoticeLi = Styled.TouchableOpacity.attrs(
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
const NoticeLiText = Styled.Text`
  color: #fff;
  font-size: 14px;
`
const NoticeViewContainer = Styled.View`

`