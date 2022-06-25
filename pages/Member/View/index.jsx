import React, { useEffect, useMemo, useState } from "react";
import Styled from "styled-components/native";
import { Platform, SafeAreaView, View, Image } from "react-native";
import InfoContainer from "./InfoContainer";
import MenuBtnContainer from "./MenuBtnContainer";
import useAxios from '../../../hooks/useAxios';

const os = Platform?.OS;

export default ({ navigation, route }) => {
  const id = route?.params?.id;
  const [data, setData] = useState(null);
  if (!id) {
    navigation?.goBack();
    return null;
  }

  const getData = () => {
    useAxios.get('flow_controller.php?task=getUserData&u_seq=' + id).then(({ data }) => {
      let _data = data?.split('|');
      _data = {
        info: JSON.parse(_data[0]),
        bodyDate: JSON.parse(_data[1]),
        poseDate: JSON.parse(_data[2]),
        romDate: JSON.parse(_data[3]),
        desaDate: JSON.parse(_data[4]),
        bodyData: JSON.parse(_data[5]),
        poseData: JSON.parse(_data[6]),
        romData: JSON.parse(_data[7]),
        desaData: JSON.parse(_data[8]),
        poseRange: JSON.parse(_data[9]),
        romRange: JSON.parse(_data[10]),
        poseImage: JSON.parse(_data[11]),
        voucher: JSON.parse(_data[12]),
        voucherUseHistory: JSON.parse(_data[13]),
        voucherPayHistory: JSON.parse(_data[14]),
        voucherStopHistory: JSON.parse(_data[15]),
      }
      setData({..._data});
      os === 'web' && console.log(_data);
    }).catch(() => alert('서버의 상태가 원활하지 않습니다.'));
  }

  useEffect(getData, []);

  return (
    <Container>
      <InfoContainer data={data} />
      <MenuBtnContainer data={data} />
    </Container>
  )
}

const Container = Styled.SafeAreaView`
  padding: 10px;
`