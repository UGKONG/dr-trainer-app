import { useState, useRef, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusNameList = useRef(['이용전', '이용중', '만료', '이용정지', '오류']);
  const statusName = statusNameList.current[Number(data?.USE_STATUS || 5) - 1];
  const type = Number(data?.VOUCHER_TYPE);
  const name = data?.VOUCHER_NAME;
  const teacherName = data?.TRAINER_NM || data?.SELLER_NM;
  const startDate = data?.USE_STARTDATE.split(' ')[0];
  const endDate = data?.USE_LASTDATE.split(' ')[0];
  const reservCount = Number(data?.RESERV_COUNT);
  const totalCount = Number(data?.COUNT);
  const useCount = Number(data?.USEDCOUNT);

  const totalDate = useMemo(() => {
    let result = new Object();
    let now = (new Date()).getTime();
    let end = (new Date(endDate || (new Date()))).getTime();
    let start = (new Date(startDate || (new Date()))).getTime();
    result.total = Math.floor((end - start) / 1000 / 60 / 60 / 24);
    result.now = Math.floor((now - start) / 1000 / 60 / 60 / 24);
    result.now = result.now < 0 ? 0 : result.now >= result.total ? result.total : result.now;
    return result;
  }, [startDate, endDate]);

  const percent = useMemo(() => {
    let result = new Object();
    result.date = Math.round(totalDate?.now / totalDate?.total * 100);
    result.count = Math.round(useCount / totalCount * 100);
    if (isNaN(result.date)) result.date = 0;
    if (isNaN(result.count)) result.count = 0;
    result.date = 100 - result.date;
    result.count = 100 - result.count;
    return result;
  }, [startDate, endDate, totalCount, useCount]);

  return (
    <Container onPress={() => setIsOpen(!isOpen)}>
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

      {isOpen && (
        <OptionBtnContainer>
          <OptionBtn onPress={() => ''}>
            <OptionBtnText><OptionBtnIcon name='calendar' /> 기간 횟수 조정</OptionBtnText>
          </OptionBtn>
          <OptionBtn onPress={() => ''}>
            <OptionBtnText><OptionBtnIcon name='user' /> 강사 변경</OptionBtnText>
          </OptionBtn>
          <OptionBtn onPress={() => ''}>
            <OptionBtnText><OptionBtnIcon name='book' /> 히스토리</OptionBtnText>
          </OptionBtn>
          <OptionBtn onPress={() => ''}>
            <OptionBtnText><OptionBtnIcon name='pause' /> 이용권 정지</OptionBtnText>
          </OptionBtn>
          <OptionBtn onPress={() => ''}>
            <OptionBtnText><OptionBtnIcon name='close' /> 이용권 삭제</OptionBtnText>
          </OptionBtn>
          <OptionBtn onPress={() => setIsOpen(false)}>
            <OptionBtnText><OptionBtnIcon name='back' /> 닫 기</OptionBtnText>
          </OptionBtn>
        </OptionBtnContainer>
      )}
    </Container>
  )
}

const Container = Styled.TouchableOpacity.attrs(
  () => ({ activeOpacity: 0.8 })
)`
  display: flex;
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #1b8e5f;
  cursor: pointer;
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
  height: 14px;
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
const OptionBtnContainer = Styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff90;
  padding: 20px 15px;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;
`
const OptionBtn = Styled.TouchableOpacity.attrs(
  () => ({ activeOpacity: 0.9 })
)`
  padding: 10px;
  margin: 0 5px 10px
  background-color: #1b8e5f;
  border-radius: 8px;
  flex: 1;
  max-width: 50%;
  min-width: 40%;
  min-height: 40px;
  justify-content: center;
`
const OptionBtnIcon = Styled(AntDesign).attrs(
  ({ name }) => ({ name: name, size: 16, color:'#fff' })
)`
  margin-right: 4px;
`
const OptionBtnText = Styled.Text`
  color: #fff;
  font-size: 13px;
`