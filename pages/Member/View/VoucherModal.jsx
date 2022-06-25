import { useState, useEffect, useCallback } from "react";
import VoucherLi from "./VoucherLi";

export default ({ data, voucherHistoryList }) => {

  const [list, setList] = useState([]);
  const getList = () => {
    let _data = [...data ?? []];
    _data?.sort((a, b) => Number(b?.UV_SQ) - Number(a?.UV_SQ));
    setList(_data);
  }
  const filterThisList = useCallback(UV_SQ => ({
    pay: voucherHistoryList?.payHistory?.filter(x => x?.UV_SQ == UV_SQ),
    use: voucherHistoryList?.useHistory?.filter(x => x?.UV_SQ == UV_SQ),
    stop: voucherHistoryList?.stopHistory?.filter(x => x?.UV_SQ == UV_SQ),
  }), [voucherHistoryList]);

  useEffect(getList, []);

  return (
    <>
      {list?.map(item => <VoucherLi key={item?.UV_SQ} data={item} historyList={filterThisList(item?.UV_SQ)} />)}
    </>
  )
}