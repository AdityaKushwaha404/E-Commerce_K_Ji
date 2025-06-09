import { useState } from "react";

const OrdersTable = () => {
  const initialOrders = [
    {
      _id: "123456",
      user: { name: "Aditya Kushwaha" },
      totalPrice: 299.99,
      status: "Processing",
    },
    {
      _id: "789012",
      user: { name: "John Doe" },
      totalPrice: 149.5,
      status: "Shipped",
    },
  ];

  const [orderList, setOrderList] = useState(initialOrders);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orderList.map((order) =>
      order._id === orderId ? { ...order, status: newStatus } : order
    );
    setOrderList(updatedOrders);
    alert(`✅ Order ${orderId} updated to ${newStatus}`);
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg p-4 bg-white">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th className="py-3 px-4">Order ID</th>
            <th className="py-3 px-4">User</th>
            <th className="py-3 px-4">Total</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderList.length > 0 ? (
            orderList.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                  #{order._id}
                </td>
                <td className="p-4">{order.user.name}</td>
                <td className="p-4">${order.totalPrice}</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-4">
                  {order.status !== "Delivered" && (
                    <button
                      onClick={() =>
                        handleStatusChange(order._id, "Delivered")
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No Orders Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
