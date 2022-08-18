import React, { useState, useEffect, useRef } from "react";
import useAxios from "axios-hooks";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dateformat from "../../mylib/dateformat";
import Loading from "../../component/Loding";

const App = () => {
  const [{ data, loading }, execute] = useAxios({
    url: "/api/test",
    method: "GET",
  });
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (!loading) {
      let numbering = 10;
      data.data.map((item) => {
        item["key"] = numbering++;
        item["createdAt"] = dateformat(new Date(item["createdAt"]));
      });
      setUpdate(true);
    }
  }, [loading]);

  /* Serach Event - Start */
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  /* Serach Event - End */

  const columns = [
    {
      title: "시험명",
      dataIndex: "title",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("title"),
    },
    {
      title: "출제자",
      dataIndex: "author",
      ...getColumnSearchProps("author"),
    },
    {
      title: "커트라인",
      dataIndex: "cutline",
    },
    {
      title: "생성일",
      dataIndex: "createdAt",
      defaultSortOrder: "ascend",
      sorter: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    },
  ];

  return (
    <div>
      {!update && <Loading />}
      {update && <Table columns={columns} dataSource={data.data} />};
    </div>
  );
};

export default App;
