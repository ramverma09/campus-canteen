function OrderStatus({ status }) {

  return (
    <div>

      <p>
        <strong>Order Status</strong>
      </p>

      <br />

      <span
        className={`status status-${status.toLowerCase()}`}
      >
        {status}
      </span>

    </div>
  );
}

export default OrderStatus;