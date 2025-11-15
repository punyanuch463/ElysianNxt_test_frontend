/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";
import { nanoid } from "nanoid";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Container = styled.div`
  max-width: 600px;
  margin: 60px auto;
  text-align: center;
`;

const Input = styled.input`
  padding: 14px;
  border: 2px solid #ddd;
  width: 100%;
  border-radius: 8px;
  font-size: 18px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 14px 30px;
  background: #222;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  async function createShort() {
    if (!url.trim()) return alert("กรุณาใส่ URL");

    const id = nanoid(6);
    const docData = {
      id,                 // short code สร้างจาก nanoid
      originalUrl: url,   // URL ที่ผู้ใช้ใส่
      customName: "",     // ถ้าผู้ใช้ไม่ใส่ ก็เก็บเป็น empty string
      title: "",          // ถ้าอยากดึง title จากเว็บ สามารถใส่ string ได้
      owner: "",          // ใส่อีเมลผู้ใช้หรือชื่อเจ้าของ ถ้าไม่มีก็ empty string
      createdAt: new Date(), // timestamp ปัจจุบัน
      clicks: 0,          // เริ่มต้นคลิก = 0
      lastAccess: null    // ยังไม่มีการเข้าลิงก์
    };


    try {
      await setDoc(doc(db, "shorturls", id), docData);
      setResult(`${window.location.origin}/${id}`);
    } catch (error) {
      console.error("Firestore error:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  }


  return (
    <Container>
      <h1>URL Shortener</h1>

      <Input
        placeholder="ใส่ URL ที่ต้องการย่อ..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <Button onClick={createShort}>ย่อ URL</Button>

      {result && (
        <p style={{ marginTop: "20px", fontSize: "20px" }}>
          ลิงก์ของคุณ: <a href={result}>{result}</a>
        </p>
      )}
    </Container>
  );
}
