import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListEventsHotAction } from "../../../../Redux/actions/AdminActions/ManageEventsAction/ManageEventsAction";
import styles from "./EventsHot.module.css";
function ManageEventsHotAdminPage() {
  const distpatch = useDispatch();
  const { listEventsHot } = useSelector((state) => state.ManageEventsReducer);

  useEffect(() => {
    distpatch(getListEventsHotAction());
  }, [distpatch]);

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_t, _r, i) => i + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Biển quảng cáo",
      className: styles.titleTruncate,
      dataIndex: "bannerURL",
      key: "bannerURL",

      render: (url) => (
        <img
          src={url}
          alt="banner"
          style={{
            width: 120,
            height: "auto",
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      ),
    },
    {
      title: "Ngày ",
      dataIndex: "date",
      key: "date",
      responsive: ["md"],
    },
  ];
  return (
    <div>
      <h2 style={{ fontSize: 24, margin: 15, fontWeight: 700 }}>
        Xem sự kiện nóng
      </h2>
      <Table
        columns={columns}
        dataSource={Array.isArray(listEventsHot) ? listEventsHot : []}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}

export default ManageEventsHotAdminPage;
