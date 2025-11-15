/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { nanoid } from "nanoid";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Container, Input, Button, ResultText } from "../styles/Shortener.style";
import { ModalOverlay, ModalContent, ModalButton } from "../styles/Modal.style";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  async function createShort() {
    if (!url.trim()) {
      setModalOpen(true);
      return;
    }

    const id = nanoid(6);
    const docData = {
      id,
      originalUrl: url,
      customName: "",
      title: "",
      owner: "",
      createdAt: new Date(),
      clicks: 0,
      lastAccess: null,
    };

    try {
      await setDoc(doc(db, "shorturls", id), docData);
      setResult(`${window.location.origin}/${id}`);
    } catch (error) {
      console.error("Firestore error:", error);
      setModalOpen(true);
    }
  }

  return (
    <Container>
      <h1>URL Shortener</h1>

      <Input
        placeholder="Enter the URL to shorten..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <Button onClick={createShort}>Shorten URL</Button>

      {result && (
        <ResultText>
          Your link: <a href={result}>{result}</a>
        </ResultText>
      )}

      {modalOpen && (
        <ModalOverlay>
          <ModalContent>
            <p>Please enter a valid URL!</p>
            <ModalButton onClick={() => setModalOpen(false)}>Close</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}