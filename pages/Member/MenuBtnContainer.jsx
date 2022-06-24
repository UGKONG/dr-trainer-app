import { useState, useRef } from "react";
import { ScrollView, View, Text, Modal } from "react-native";
import Styled from "styled-components/native";
import { AntDesign } from '@expo/vector-icons';
import BaseModal from "./BaseModal";
import InfoModal from './InfoModal';
import VoucherModal from './VoucherModal';
import HistoryModal from './HistoryModal';

export default ({ data }) => {
  const [isInfoModalOpen, setIsInfoModal] = useState(false);
  const [isVoucherModalOpen, setIsVoucherModal] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModal] = useState(false);

  const btns = [
    { id: 1, name: '회원정보', state: isInfoModalOpen, setState: setIsInfoModal, component: <InfoModal data={data?.info} /> },
    { id: 2, name: '이용권', state: isVoucherModalOpen, setState: setIsVoucherModal, component: <VoucherModal data={data?.voucher} /> },
    { id: 3, name: '히스토리', state: isHistoryModalOpen, setState: setIsHistoryModal, component: <HistoryModal data={data?.info?.USER_SQ} /> },
  ];

  return (
    <Container>
      {/* 버튼 */}
      {btns?.map(item => (
        <Btn.Container key={item?.id} onPress={() => item?.setState(true)}>
          <Btn.Text>{item?.name}</Btn.Text>
        </Btn.Container>
      ))}
      {/* 모달 */}
      {btns?.map(item => (
        <BaseModal key={item?.id} data={item} />
      ))}
    </Container>
  )
}

const Container = Styled.ScrollView`
  padding: 0 10px;
  height: 100%;
`
const Btn = {
  Container: Styled.TouchableOpacity`
    width: 100%;
    padding: 20px;
    background-color: #0d996fcc;
    border-radius: 8px;
    margin-bottom: 10px;
  `,
  Text: Styled.Text`
    color: #fff;
    font-size: 14px;
  `
}
const MyModal = {
  Container: Styled.Modal.attrs(
    ({ visible }) => ({
      visible: visible,
      animationType: 'slide', 
      presentationStyle: 'pageSheet'
    })
  )`

  `,
  Header: Styled.View`
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  `,
  Title: Styled.Text`
    font-size: 24px;
    font-weight: 700;
    color: #1b8e5f;
  `,
  CloseBtn: Styled.TouchableOpacity`
    width: 32px;
    height: 32px;
  `,
  CloseBtnText: Styled.Text`
    
  `,
  Contents: Styled.ScrollView`
    padding: 20px;
  `
}