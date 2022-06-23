import React, { useEffect, useMemo, useState } from "react";
import Styled from "styled-components/native";
import { Platform, SafeAreaView, ScrollView, View, Text, Image } from "react-native";
import useAxios from "../../hooks/useAxios";
import useNumber from '../../hooks/useNumber';
import userImage from '../../assets/user.png';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InfoContainer from "./InfoContainer";
import MenuBtnContainer from "./MenuBtnContainer";

const os = Platform?.OS;

export default ({ navigation, route }) => {
  const id = route?.params?.id;
  const [data, setData] = useState(null);
  if (!id) {
    navigation?.goBack();
    return null;
  }

  const getData = () => {
    // useAxios.get('flow_controller.php?task=getUserData&u_seq=' + id).then(({ data }) => {
      let _ = '{"USER_SQ":"2002","CENTER_SQ":"2","CENTER_NM":"ub2e5ud130ud544ub77cud14cuc2a4 uc138uc885uace0uc6b4uc810","USER_NM":"홍길동","USERID":"54602454","GENDER":"F","USERHEIGHT":null,"PHONE_NO":"010-5460-2454","EMAIL":"","BIRTH_DT":"1979-01-31","REG_DT":"2022-05-06 11:26:47","MEAS_DATE":"2022-05-09 18:49:59","TRAINER":"0","TRAINER_NM":null,"COMMENT":"","USERIMAGE":""}|[]|[{"MEASUREMENT_SQ":"2315","USER_SQ":"2002","DEVICE_SQ":"3","MEASUREMENT_TYPE":"Pose","DONE":"1","REG_DT":"2022-05-09 18:49:59"}]|[]|[]|[]|[{"MEASUREMENT_SQ":"2315","REG_DT":"2022-05-09 18:49:59","front_Neck":"-2.28864","front_RShoulder":"3.32272","front_LShoulder":"2.96603","front_RPelvis":"-5.4116","front_LPelvis":"0.0279765","front_RLeg":"184.318","front_LLeg":"-175.786","side_Neck":"1.96523","side_Shoulder":"0.378976","side_Pelvis":"1.28405","side_Leg":"3.85072"}]|[]|[]|[{"level":"caution","front_Neck":"2.1","front_RShoulder":"2","front_LShoulder":"2","front_RPelvis":"1","front_LPelvis":"1","front_RLeg":"6","front_LLeg":"6","side_Neck":"2.2","side_Shoulder":"1","side_Pelvis":"1","side_Leg":"3"},{"level":"danger","front_Neck":"3.6","front_RShoulder":"3","front_LShoulder":"3","front_RPelvis":"2","front_LPelvis":"2","front_RLeg":"11","front_LLeg":"11","side_Neck":"3.5","side_Shoulder":"2","side_Pelvis":"2","side_Leg":"6"}]|[{"level":"caution","front_Neck_right":"30","front_Neck_left":"30","front_Shoulder_right":"160","front_Shoulder_left":"160","front_Waist_right":"25","front_Waist_left":"25","front_Hip_right":"60","front_Hip_left":"60","side_Neck_front":"30","side_Neck_back":"30","side_ShoulderL_front":"170","side_ShoulderL_back":"50","side_ShoulderR_front":"170","side_ShoulderR_back":"50","side_Waist_front":"60","side_Waist_back":"20","side_HipL_front":"75","side_HipL_back":"25","side_HipR_front":"75","side_HipR_back":"25"},{"level":"danger","front_Neck_right":"25","front_Neck_left":"25","front_Shoulder_right":"140","front_Shoulder_left":"140","front_Waist_right":"20","front_Waist_left":"20","front_Hip_right":"50","front_Hip_left":"50","side_Neck_front":"20","side_Neck_back":"20","side_ShoulderL_front":"160","side_ShoulderL_back":"40","side_ShoulderR_front":"160","side_ShoulderR_back":"40","side_Waist_front":"50","side_Waist_back":"15","side_HipL_front":"60","side_HipL_back":"20","side_HipR_front":"60","side_HipR_back":"20"}]|[{"MEASUREMENT_SQ":"2315","REG_DT":"2022-05-09 18:49:59","FRONT_PICTURE":"20220509184957_2002_Front","SIDE_PICTURE":"20220509184957_2002_Side","UPLOAD_ROOT":"/admin/uploaded_images/"}]|[{"UV_SQ":"291","MEMBER_SQ":"2002","VOUCHER_SQ":"56","VOUCHER_NAME":"uacf5ub3d9uad6cub9e4 uadf8ub8f9ub808uc2a8 20ud68c","VOUCHER_TYPE":"2","VOUCHER_TYPE_NAME":"uadf8ub8f9ub808uc2a8 uc774uc6a9uad8c","USE_TYPE":"2","USE_TYPE_NAME":"ud69fuc218","PERIOD_TYPE":"2","PERIOD_TYPE_NAME":"uae30uac04uc9c0uc815","PERIOD":"3","PERIOD_UNIT":"2","PERIOD_UNIT_NAME":"uac1cuc6d4","COUNT_TYPE":"2","COUNT_TYPE_NAME":"ud69fuc218uc9c0uc815","COUNT":"20","ENTERLIMIT_DAY":"1","ENTERLIMIT_WEEK":"0","USEDCOUNT":"0","RESERV_COUNT":"0","USE_STATUS":"1","USE_STARTDATE":"2023-01-02 00:00:00","USE_LASTDATE":"2023-04-01 00:00:00","SELLER_SQ":"1458","SELLER_NM":"uc815ubbf8uace0 uc6d0uc7a5","TRAINER_SQ":"1458","TRAINER_NM":"uc815ubbf8uace0 uc6d0uc7a5","PHONE_NO":"010-7242-8858"},{"UV_SQ":"292","MEMBER_SQ":"2002","VOUCHER_SQ":"19","VOUCHER_NAME":"uadf8ub8f9ub808uc2a8 60ud68c","VOUCHER_TYPE":"2","VOUCHER_TYPE_NAME":"uadf8ub8f9ub808uc2a8 uc774uc6a9uad8c","USE_TYPE":"2","USE_TYPE_NAME":"ud69fuc218","PERIOD_TYPE":"2","PERIOD_TYPE_NAME":"uae30uac04uc9c0uc815","PERIOD":"8","PERIOD_UNIT":"2","PERIOD_UNIT_NAME":"uac1cuc6d4","COUNT_TYPE":"2","COUNT_TYPE_NAME":"ud69fuc218uc9c0uc815","COUNT":"60","ENTERLIMIT_DAY":"1","ENTERLIMIT_WEEK":"0","USEDCOUNT":"0","RESERV_COUNT":"0","USE_STATUS":"2","USE_STARTDATE":"2022-03-28 00:00:00","USE_LASTDATE":"2022-11-27 00:00:00","SELLER_SQ":"1458","SELLER_NM":"uc815ubbf8uace0 uc6d0uc7a5","TRAINER_SQ":"1458","TRAINER_NM":"uc815ubbf8uace0 uc6d0uc7a5","PHONE_NO":"010-7242-8858"}]|[{"UV_SQ":"292","MANAGER_SQ":"1778","VOUCHER_TYPE":"2","MANAGER_NM":"7401","ATTENDANCE_TYPE":"5","ATTENDANCE_TYPE_NM":"uc57d","USED_COUNT":"0","ALLOWANCE":"0","DESCRIPTION":""}]|[{"UV_SQ":"291","PAY_TYPE":"1","PAY_TYPE_NM":"uce74ub4dc","FUND_TYPE":"1","FUND_TYPE_NM":"uacb0uc81c","PAY_AMOUNT":"400000","PAYED_DATE":null},{"UV_SQ":"292","PAY_TYPE":"1","PAY_TYPE_NM":"uce74ub4dc","FUND_TYPE":"1","FUND_TYPE_NM":"uacb0uc81c","PAY_AMOUNT":"1254000","PAYED_DATE":null}]|[]';
      let _data = _?.split('|');
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
    // }).catch(() => alert('서버의 상태가 원활하지 않습니다.'));
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