"use client"; // Nếu dùng Next.js 13+ với App Router

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8000"; // Thay bằng URL thực tế nếu deploy

const SensorDataComponent = () => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    // Lắng nghe sự kiện 'sensorData' từ backend
    socket.on("sensorData", (data) => {
      console.log("Dữ liệu nhận từ WebSocket:", data);
      setSensorData(data);
    });

    return () => {
      socket.disconnect(); // Ngắt kết nối khi component unmount
    };
  }, []);

  return (
    <div>
      <h2>Dữ liệu cảm biến</h2>
      {sensorData ? (
        <pre>{JSON.stringify(sensorData, null, 2)}</pre>
      ) : (
        <p>Đang chờ dữ liệu...</p>
      )}
    </div>
  );
};

export default SensorDataComponent;
