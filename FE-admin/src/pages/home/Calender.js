import { Badge, Calendar } from "antd";
import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import Loading from "../../component/Loding";
import dateformat from "../../mylib/dateformat";
// TODO: 기존 교육에 대한 스케쥴을 출력해줌.

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const App = () => {
  let currData = [];

  const getListData = (value) => {
    for (let item in currData) {
      console.log(item);
    }
    return [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
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
      let numbering = 10;

      let curr_y = new Date().getFullYear();
      let curr_m1 = new Date().getMonth() + 1;
      let curr_m2 = new Date().getMonth() + 2;
      let start = new Date(curr_y + "/" + curr_m1 + "/1");
      let end = new Date(curr_y + "/" + curr_m2 + "/1");

      currData = data.data.filter(
        (item) =>
          new Date(item["endTime"]) >= start && new Date(item["endTime"]) <= end
      );

      currData.map((item) => {
        item["createdAt"] = dateformat(new Date(item["createdAt"]));
      });

      currData.forEach((item) => {
        console.log(item);
      });
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
