import { useState, useEffect } from "react";
import VoucherLi from "./VoucherLi";

export default ({ data }) => {

  const [list, setList] = useState([]);

  const getList = () => {
    let _data = [...data ?? []];
    _data?.sort((a, b) => Number(b?.UV_SQ) - Number(a?.UV_SQ));
    setList(_data);
  }

  useEffect(getList, []);

  return (
    <>
      {list?.map(item => <VoucherLi key={item?.UV_SQ} data={item} />)}
    </>
  )
}