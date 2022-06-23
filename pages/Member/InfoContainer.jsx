import { useMemo, useRef } from "react";
import Styled from "styled-components/native";
import { View, Text, Image } from "react-native";
import useNumber from '../../hooks/useNumber';
import userImage from '../../assets/user.png';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default ({ data }) => {

  const iconStyle = useRef({ marginRight: 5, color: '#fff' });

  const lastBodyCheck = useMemo(() => {
    let pose = data?.poseDate ?? [];
    let rom = data?.romDate ?? [];
    let dateArr = pose.concat(rom);
    if (dateArr?.length === 0) return 0;
    dateArr?.sort((a, b) => {
      let _a = (new Date(a?.REG_DT ?? (new Date()))).getTime();
      let _b = (new Date(b?.REG_DT ?? (new Date()))).getTime();
      return _a - _b;
    });
    let nowDate = (new Date()).getTime();
    let lastDate = (new Date(dateArr[0]?.REG_DT ?? (new Date()))).getTime();
    let calc = Math.floor((nowDate - lastDate) / 1000 / 60 / 60 / 24);
    return calc;
  }, [data?.poseDate, data?.romDate]);

  const totalPay = useMemo(() => {
    let arr = data?.voucherPayHistory ?? [];
    if (arr?.length === 0) return 0;
    let result = 0;
    arr?.forEach(item => {
      result += Number(item?.PAY_AMOUNT);
    });
    result = (result ?? 0);
    return result;
  }, [data?.voucherPayHistory, useNumber]);

  return (
    <Container>
      <ProfileImage source={data?.info?.USERIMAGE || userImage} />
      <Name>{data?.info?.USER_NM || '-'}</Name>
      <BoxWrap>
        <Box>
          <BoxTitle>
            <AntDesign name='gift' size={14} style={iconStyle?.current} /> 이용권
          </BoxTitle>
          <BoxContent>{data?.voucher?.length || 0}</BoxContent>
        </Box>
        <Box style={{ marginHorizontal: 10 }}>
          <BoxTitle style={{ marginTop: -1 }}>
            <AntDesign name='camerao' size={16} style={iconStyle?.current} /> 측정
          </BoxTitle>
          <BoxContent>{lastBodyCheck ? ('D⁺' + lastBodyCheck) : '-'}</BoxContent>
        </Box>
        <Box>
          <BoxTitle style={{ marginTop: -1 }}>
            <MaterialCommunityIcons name='hand-coin-outline' size={16} style={iconStyle?.current} /> 결제
          </BoxTitle>
          <BoxContent style={{ marginTop: 1 }}>{useNumber(totalPay)}</BoxContent>
        </Box>
      </BoxWrap>
    </Container>
  )
}

const Container = Styled.View`
  border-radius: 8px;
  background-color: #1b8e5f;
  padding: 20px;
  align-items: center;
  margin: 10px;
`
const ProfileImage = Styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 120px;
  margin-top: 30px;
  margin-bottom: 20px;
`
const Name = Styled.Text`
  font-size: 28px;
  font-weight: 500;
  color: #fff;
`
const BoxWrap = Styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 30px;
`
const Box = Styled.View`
  border-radius: 5px;
  background-color: #ffffff20;
  flex: 1;
  padding: 10px;
`
const BoxTitle = Styled.Text`
  font-size: 13px;
  color: #ffffff99;
  justify-content: flex-start;
`
const BoxContent = Styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  padding: 5px 1px 0;
`