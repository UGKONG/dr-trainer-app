import { useState, useRef, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import BaseModal from "../../Common/BaseModal";
import VoucherHistoryModalContents from "./VoucherHistoryModal";

export default ({ data, historyList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [voucherHistoryList, setVoucherHistoryList] = useState([]);
  const statusNameList = useRef(['이용전', '이용중', '만료', '이용정지', '오류']);
  const OptionBtnList = useRef([
    { id: 1, name: '사용', field: 'use' },
    { id: 2, name: '결제', field: 'pay' },
    { id: 3, name: '정지', field: 'stop' },
  ]);

  const statusName = useMemo(() => statusNameList.current[Number(data?.USE_STATUS || 5) - 1], [data]);
  const type = useMemo(() => Number(data?.VOUCHER_TYPE), [data]);
  const name = useMemo(() => data?.VOUCHER_NAME, [data]);
  const teacherName = useMemo(() => data?.TRAINER_NM || data?.SELLER_NM, [data]);
  const startDate = useMemo(() => data?.USE_STARTDATE.split(' ')[0], [data]);
  const endDate = useMemo(() => data?.USE_LASTDATE.split(' ')[0], [data]);
  const reservCount = useMemo(() => Number(data?.RESERV_COUNT), [data]);
  const totalCount = useMemo(() => Number(data?.COUNT), [data]);
  const useCount = useMemo(() => Number(data?.USEDCOUNT), [data]);
  const totalDate = useMemo(() => {
    let result = new Object();
    let now = (new Date()).getTime();
    let end = (new Date(endDate || (new Date()))).getTime();
    let start = (new Date(startDate || (new Date()))).getTime();
    result.total = Math.floor((end - start) / 1000 / 60 / 60 / 24);
    result.now = Math.floor((now - start) / 1000 / 60 / 60 / 24);
    result.now = result.now < 0 ? 0 : result.now >= result.total ? result.total : result.now;
    return result;
  }, [data]);
  const percent = useMemo(() => {
    let result = new Object();
    result.date = Math.round(totalDate?.now / totalDate?.total * 100);
    result.count = Math.round(useCount / totalCount * 100);
    if (isNaN(result.date)) result.date = 0;
    if (isNaN(result.count)) result.count = 0;
    result.date = 100 - result.date;
    result.count = 100 - result.count;
    return result;
  }, [data]);

  const optionBtnClick = useCallback(item => {
    setIsModalOpen(true);
    setModalName(item?.name);
    setVoucherHistoryList(historyList[item?.field]);
  }, [setIsModalOpen, setModalName, setVoucherHistoryList]);

  const VoucherInfo = useCallback(() => (
    <>
    <Header>
      <Name>
        <TypeIcon name={type === 1 ? 'user-alt' : 'users'} />{' '}{name || '-'}
      </Name>
      <Status>
        <StatusText>{statusName || 'statusName'}</StatusText>
      </Status>
    </Header>
    <Body>
      <Row>
        <RowTitle>기간</RowTitle>
        <RowContent>{startDate} ~ {endDate}</RowContent>
      </Row>
      <Row>
        <RowTitle>강사</RowTitle>
        <RowContent>{teacherName}</RowContent>
      </Row>
      <Row>
        <RowTitle>예약</RowTitle>
        <RowContent>{reservCount} 회</RowContent>
      </Row>
      <ProgressRow>
        <Progress><ProgressBar percent={percent?.date} /></Progress>
        <ProgressContent>
          <ProgressResult>잔여기간 {totalDate?.total - totalDate?.now}일</ProgressResult>
          <TotalCountText>총 {totalDate?.total}일</TotalCountText>
        </ProgressContent>
      </ProgressRow>
      <ProgressRow style={{ marginTop: 10 }}>
        <Progress><ProgressBar percent={percent?.count} /></Progress>
        <ProgressContent>
          <ProgressResult>잔여횟수 {totalCount - useCount}회</ProgressResult>
          <TotalCountText>총 {totalCount}회</TotalCountText>
        </ProgressContent>
      </ProgressRow>
    </Body>
    </>
  ), [data]);


  return (
    <Container>
      <VoucherInfo />
      <OptionOpenBtn onPress={() => setIsOpen(!isOpen)}>
        <OptionOpenBtnText>
          <OptionOpenBtnIcon name='book' /> 히스토리 {isOpen ? '닫기 ' : '열기 '} 
          <OptionOpenBtnIcon name={isOpen ? 'up' : 'down'} size={12} />
        </OptionOpenBtnText>
      </OptionOpenBtn>
      {isOpen && <OptionBtnContainer>
        {OptionBtnList?.current?.map(item => (
          <OptionBtn key={item?.id} onPress={() => optionBtnClick(item)}>
            <OptionBtnText>{item?.name}</OptionBtnText>
          </OptionBtn>
        ))}
      </OptionBtnContainer>}

      {/* 이용권 히스토리 모달 */}
      <BaseModal data={{
        name: modalName,
        state: isModalOpen,
        setState: setIsModalOpen,
        component: <VoucherHistoryModalContents list={voucherHistoryList} />
      }} />
    </Container>
  )
}

const Container = Styled.View`
  display: flex;
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #1b8e5f;
  overflow: hidden;
`
const Header = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0;
  margin-bottom: 20px;
`
const Name = Styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`
const TypeIcon = Styled(FontAwesome5).attrs(
  ({ name }) => ({
    name: name,
    size: 18,
    color: '#fff'
  })
)`
  margin-right: 5px;
`
const Status = Styled.View`
  border-width: 1px;
  border-color: #ffffff60;
  border-radius: 1000px;
  padding: 6px 10px;
`
const StatusText = Styled.Text`
  font-size: 14px;
  color: #fff;
`
const Body = Styled.View`
  padding: 20px;
`
const Row = Styled.View`
  flex-direction: row;
  margin-bottom: 6px;
`
const RowTitle = Styled.Text`
  color: #ffffff70;
  width: 50px;
`
const RowContent = Styled.Text`
  color: #ffffff;
`
const ProgressRow = Styled(Row)`
  margin-top: 20px;
  flex-direction: column;
`
const Progress = Styled.View`
  background-color: #ffffff20;
  width: 100%;
  overflow: hidden;
  border-radius: 100px;
`
const ProgressBar = Styled.View`
  background-image: linear-gradient(to right, #97bc62bb, #ee91a2bb);
  background-color: #97bc62;
  width: ${x => x.percent ?? 0}%;
  height: 10px;
  border-radius: 100px;
`
const ProgressContent = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`
const ProgressResult = Styled(RowContent)`
  font-weight: 700;
`
const TotalCountText = Styled.Text`
  color: #ffffff60;
`
const OptionOpenBtn = Styled.TouchableOpacity.attrs(
  () => ({ activeOpacity: 0.5 })
)`
  padding: 14px 0 20px;
  width: 100%;
  min-height: 50px;
  max-height: 50px;
  justify-content: center;
  align-items: center;
`
const OptionOpenBtnIcon = Styled(AntDesign).attrs(
  ({ name, size }) => ({ name: name, size: size ?? 14, color:'#fff' })
)`
  margin: 0 4px;
`
const OptionOpenBtnText = Styled.Text`
  color: #fff;
  font-size: 13px;
`
const OptionBtnContainer = Styled.View`
  flex-direction: row;
  padding: 10px 5px;
`
const OptionBtn = Styled.TouchableOpacity.attrs(
  () => ({ activeOpacity: 0.8 })
)`
  flex: 1;
  margin: 0 5px;
  align-items: center;
  padding: 10px 0;
  background-color: #29ac75;
  border-radius: 4px;
`
const OptionBtnText = Styled.Text`
  font-size: 12px;
  color: #fff;
`