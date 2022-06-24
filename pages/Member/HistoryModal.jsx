import { useState, useRef, useEffect } from "react";
import { ScrollView, View, Text, Modal } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import useAxios from "../../hooks/useAxios";
import Styled from 'styled-components/native';

export default ({ data }) => {

  const [list, setList] = useState([]);

  const getList = () => {
    // useAxios.post('/flow_controller.php?task=GetUserHistoryList', { START_DT: '2000-01-01', END_DT: '3000-01-01', MEMBER_SQ: data }).then(({ data }) => {
      // let _data = '[{"HIST_SQ":"71511","CENTER_SQ":"2","USER_SQ":"1458","USER_NM":"정미고원장","DEVICE_SQ":"-1","IP":"59.16.154.75","ACTION":"<span class='member'>김민희(010-5460-2454,43세)</span>회원님의 <span class='voucher'>그룹레슨 60회</span>이용권의 담당강사를 <span class='trainer'>정미고 원장</span>트레이너로 지정하였습니다.","GROUP":"1","GROUP_NAME":"담당강사관리","CATEGORY":"1","CATEGORY_NAME":"담당강사등록","REG_DT":"2022-05-06 11:28:26"},{"HIST_SQ":"71509","CENTER_SQ":"2","USER_SQ":"1458","USER_NM":"정미고 원장","DEVICE_SQ":"-1","IP":"59.16.154.75","ACTION":"<span class='member'>김민희(010-5460-2454,43세)</span>회원님의 <span class='voucher'>공동구매 그룹레슨 20회</span>이용권의 담당강사를 <span class='trainer'>정미고 원장</span>트레이너로 지정하였습니다.","GROUP":"1","GROUP_NAME":"담당강사관리","CATEGORY":"1","CATEGORY_NAME":"담당강사등록","REG_DT":"2022-05-06 11:27:46"},{"HIST_SQ":"71510","CENTER_SQ":"2","USER_SQ":"1458","USER_NM":"정미고 원장","DEVICE_SQ":"-1","IP":"59.16.154.75","ACTION":"<span class='member'>김민희(010-5460-2454,43세)</span>회원님이 <span class='voucher'>그룹레슨 60회</span>이용권을 구매하였습니다.","GROUP":"3","GROUP_NAME":"이용권관리","CATEGORY":"31","CATEGORY_NAME":"이용권구매","REG_DT":"2022-05-06 11:28:26"},{"HIST_SQ":"71508","CENTER_SQ":"2","USER_SQ":"1458","USER_NM":"정미고 원장","DEVICE_SQ":"-1","IP":"59.16.154.75","ACTION":"<span class='member'>김민희(010-5460-2454,43세)</span>회원님이 <span class='voucher'>공동구매 그룹레슨 20회</span>이용권을 구매하였습니다.","GROUP":"3","GROUP_NAME":"이용권관리","CATEGORY":"31","CATEGORY_NAME":"이용권구매","REG_DT":"2022-05-06 11:27:46"},{"HIST_SQ":"71630","CENTER_SQ":"2","USER_SQ":"1458","USER_NM":"정미고 원장","DEVICE_SQ":"-1","IP":"59.16.154.75","ACTION":"<span class='member'>김민희(010-5460-2454,43세)</span>회원님이 <span class='class'>오후A (캐딜락)( 룸:캐딜락, 시간:2022/05/02 18:30 )</span> 수업에 <span class='voucher'>그룹레슨 60회</span> 이용권으로 예약하셨습니다.","GROUP":"4","GROUP_NAME":"예약출석관리","CATEGORY":"41","CATEGORY_NAME":"수업예약","REG_DT":"2022-05-06 12:57:40"}]|[{"COMMON_SQ":"99","BASE_CD":"CD017","CODE":"1","NAME":"Trainer","DESCRIPTION":"\ub2f4\ub2f9\uac15\uc0ac\uad00\ub9ac"},{"COMMON_SQ":"100","BASE_CD":"CD017","CODE":"2","NAME":"Class","DESCRIPTION":"\uc218\uc5c5\uad00\ub9ac"},{"COMMON_SQ":"101","BASE_CD":"CD017","CODE":"3","NAME":"Voucher","DESCRIPTION":"\uc774\uc6a9\uad8c\uad00\ub9ac"},{"COMMON_SQ":"102","BASE_CD":"CD017","CODE":"4","NAME":"Attend","DESCRIPTION":"\uc608\uc57d\ucd9c\uc11d\uad00\ub9ac"},{"COMMON_SQ":"103","BASE_CD":"CD017","CODE":"5","NAME":"Setting","DESCRIPTION":"\uc124\uc815"},{"COMMON_SQ":"104","BASE_CD":"CD017","CODE":"6","NAME":"Members","DESCRIPTION":"\ud68c\uc6d0\uad00\ub9ac"},{"COMMON_SQ":"105","BASE_CD":"CD017","CODE":"7","NAME":"ETC","DESCRIPTION":"\uae30\ud0c0"}]|[{"COMMON_SQ":"107","BASE_CD":"CD018","CODE":"1","NAME":"1","DESCRIPTION":"\ub2f4\ub2f9\uac15\uc0ac\ub4f1\ub85d"},{"COMMON_SQ":"108","BASE_CD":"CD018","CODE":"2","NAME":"1","DESCRIPTION":"\ub2f4\ub2f9\uac15\uc0ac\ubcc0\uacbd"},{"COMMON_SQ":"109","BASE_CD":"CD018","CODE":"21","NAME":"2","DESCRIPTION":"\uc218\uc5c5\ub4f1\ub85d"},{"COMMON_SQ":"110","BASE_CD":"CD018","CODE":"22","NAME":"2","DESCRIPTION":"\uc218\uc5c5\uba54\ubaa8\uc218\uc815"},{"COMMON_SQ":"111","BASE_CD":"CD018","CODE":"23","NAME":"2","DESCRIPTION":"\uc218\uc5c5\uc0ad\uc81c"},{"COMMON_SQ":"112","BASE_CD":"CD018","CODE":"31","NAME":"3","DESCRIPTION":"\uc774\uc6a9\uad8c\uad6c\ub9e4"},{"COMMON_SQ":"113","BASE_CD":"CD018","CODE":"32","NAME":"3","DESCRIPTION":"\uc774\uc6a9\uad8c\ud658\ubd88"},{"COMMON_SQ":"114","BASE_CD":"CD018","CODE":"33","NAME":"3","DESCRIPTION":"\uc774\uc6a9\uad8c\uc591\ub3c4"},{"COMMON_SQ":"115","BASE_CD":"CD018","CODE":"34","NAME":"3","DESCRIPTION":"\uc774\uc6a9\uad8c\uc815\uc9c0"},{"COMMON_SQ":"116","BASE_CD":"CD018","CODE":"35","NAME":"3","DESCRIPTION":"\ubbf8\ub0a9\uae08\ub0a9\uc785"},{"COMMON_SQ":"124","BASE_CD":"CD018","CODE":"36","NAME":"3","DESCRIPTION":"\uc77c\ubd80\ud658\ubd88"},{"COMMON_SQ":"125","BASE_CD":"CD018","CODE":"37","NAME":"3","DESCRIPTION":"\uacb0\uc81c\uba54\ubaa8\uc218\uc815"},{"COMMON_SQ":"117","BASE_CD":"CD018","CODE":"41","NAME":"4","DESCRIPTION":"\uc218\uc5c5\uc608\uc57d"},{"COMMON_SQ":"118","BASE_CD":"CD018","CODE":"42","NAME":"4","DESCRIPTION":"\uc218\uc5c5\uc608\uc57d\ucde8\uc18c"},{"COMMON_SQ":"119","BASE_CD":"CD018","CODE":"43","NAME":"4","DESCRIPTION":"\ucd9c\uc11d"},{"COMMON_SQ":"120","BASE_CD":"CD018","CODE":"44","NAME":"4","DESCRIPTION":"\uacb0\uc11d"},{"COMMON_SQ":"121","BASE_CD":"CD018","CODE":"51","NAME":"5","DESCRIPTION":"\uc124\uc815"},{"COMMON_SQ":"122","BASE_CD":"CD018","CODE":"61","NAME":"6","DESCRIPTION":"\ud68c\uc6d0\uad00\ub9ac"},{"COMMON_SQ":"123","BASE_CD":"CD018","CODE":"71","NAME":"7","DESCRIPTION":"\uae30\ud0c0"}]';
      // _data = _data?.split('|')[0];
      let _data = `[{"HIST_SQ":"71511","CENTER_SQ":"2","USER_SQ":"1458","USER_NM":"정미고원장","DEVICE_SQ":"-1","IP":"59.16.154.75","ACTION":"<span class='member'>김민희(010-5460-2454,43세)</span>회원님의 <span class='voucher'>그룹레슨 60회</span>이용권의 담당강사를 <span class='trainer'>정미고 원장</span>트레이너로 지정하였습니다.","GROUP":"1","GROUP_NAME":"담당강사관리","CATEGORY":"1","CATEGORY_NAME":"담당강사등록","REG_DT":"2022-05-06 11:28:26"},{"HIST_SQ":"71509","CENTER_SQ":"2","USER_SQ":"1458","USER_NM":"정미고 원장","DEVICE_SQ":"-1","IP":"59.16.154.75","ACTION":"<span class='member'>김민희(010-5460-2454,43세)</span>회원님의 <span class='voucher'>공동구매 그룹레슨 20회</span>이용권의 담당강사를 <span class='trainer'>정미고 원장</span>트레이너로 지정하였습니다.","GROUP":"1","GROUP_NAME":"담당강사관리","CATEGORY":"1","CATEGORY_NAME":"담당강사등록","REG_DT":"2022-05-06 11:27:46"},{"HIST_SQ":"71510","CENTER_SQ":"2","USER_SQ":"1458","USER_NM":"정미고 원장","DEVICE_SQ":"-1","IP":"59.16.154.75","ACTION":"<span class='member'>김민희(010-5460-2454,43세)</span>회원님이 <span class='voucher'>그룹레슨 60회</span>이용권을 구매하였습니다.","GROUP":"3","GROUP_NAME":"이용권관리","CATEGORY":"31","CATEGORY_NAME":"이용권구매","REG_DT":"2022-05-06 11:28:26"},{"HIST_SQ":"71508","CENTER_SQ":"2","USER_SQ":"1458","USER_NM":"정미고 원장","DEVICE_SQ":"-1","IP":"59.16.154.75","ACTION":"<span class='member'>김민희(010-5460-2454,43세)</span>회원님이 <span class='voucher'>공동구매 그룹레슨 20회</span>이용권을 구매하였습니다.","GROUP":"3","GROUP_NAME":"이용권관리","CATEGORY":"31","CATEGORY_NAME":"이용권구매","REG_DT":"2022-05-06 11:27:46"},{"HIST_SQ":"71630","CENTER_SQ":"2","USER_SQ":"1458","USER_NM":"정미고 원장","DEVICE_SQ":"-1","IP":"59.16.154.75","ACTION":"<span class='member'>김민희(010-5460-2454,43세)</span>회원님이 <span class='class'>오후A (캐딜락)( 룸:캐딜락, 시간:2022/05/02 18:30 )</span> 수업에 <span class='voucher'>그룹레슨 60회</span> 이용권으로 예약하셨습니다.","GROUP":"4","GROUP_NAME":"예약출석관리","CATEGORY":"41","CATEGORY_NAME":"수업예약","REG_DT":"2022-05-06 12:57:40"}]`;
      _data = JSON.parse(_data);
      _data?.sort((a, b) => Number(b?.HIST_SQ) - Number(a?.HIST_SQ));
      console.log(_data);
      setList(_data);
    // })
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