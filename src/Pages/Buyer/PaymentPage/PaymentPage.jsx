import React, { useEffect } from "react";
import { QRCode } from "react-qrcode-logo"; // ✅ Đúng cú pháp import
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getListOrderDetailAction } from "../../../Redux/actions/BuyerActions/ManageOrdersAction/ManageOrdersAction";

function PaymentPage() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { myListOrderDetail } = useSelector(
    (state) => state.ManageOrdersBuyerReducer
  );
  useEffect(() => {
    dispatch(getListOrderDetailAction(orderId)); // ✅ Sửa `dispatchEvent` thành `dispatch`
  }, [dispatch, orderId]);

  const event = myListOrderDetail?.event || {};
  console.log("event", myListOrderDetail);
  const momoURL = `https://nhantien.momo.vn/0835915729?amount=${
    myListOrderDetail.totalPrice || 0
  }&message=${encodeURIComponent(`Thanh toán đơn hàng ${event?.title || ""}`)}`;
  if (
    !myListOrderDetail ||
    !myListOrderDetail.event ||
    !myListOrderDetail.totalPrice
  ) {
    return <p>Đang tải dữ liệu đơn hàng...</p>;
  }

  return (
    <div>
      <h2>Quét mã để thanh toán</h2>
      <QRCode value={momoURL} size={256} />
    </div>
  );
}

export default PaymentPage;
