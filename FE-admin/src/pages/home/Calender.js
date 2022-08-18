import { Badge, Calendar } from "antd";
import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import Loading from "../../component/Loding";
import dateformat from "../../mylib/dateformat";
import "./Calender.css";
// TODO: 기존 교육에 대한 스케쥴을 출력해줌.

const App = () => {
  const [axiosData, setAxiosData] = useState([]);

  // TODO: 해당 달력에 그리기 위해 Month 단위의 API 필요 - optimize
  const dateCellRender = (value) => {
    let listData = axiosData.filter(
      (item) => item.currDay === value._d.getDate()
    );
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.tid + ""}>
            <Badge status="processing" text={item.title} />
          </li>
        ))}
      </ul>
    );
  };
  const [{ data, loading }, execute] = useAxios({
    url: "/api/test",
    method: "GET",
  });
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (!loading) {
      let currData = [];
      let curr_y = new Date().getFullYear();
      let curr_m1 = new Date().getMonth() + 1;
      let curr_m2 = new Date().getMonth() + 2;
      let start = new Date(curr_y + "/" + curr_m1 + "/1");
      let end = new Date(curr_y + "/" + curr_m2 + "/1");

      currData = data.data.filter(
        (item) =>
          new Date(item["endTime"]) >= start && new Date(item["endTime"]) < end
      );

      currData.map((item) => {
        item["currDay"] = new Date(item["endTime"]).getDate();
      });

      setAxiosData(currData);
      setUpdate(true);
    }
  }, [loading]);

  return (
    <div>
      {!update && <Loading />}
      {update && (
        <Calendar
          dateCellRender={dateCellRender}
          // monthCellRender={monthCellRender}
        />
      )}
      ;
    </div>
  );
};

export default App;
