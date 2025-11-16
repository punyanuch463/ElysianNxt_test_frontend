/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { nanoid } from "nanoid";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Container, Input, Button, ResultText } from "../styles/Shortener.style";
import { ModalOverlay, ModalContent, ModalButton } from "../styles/Modal.style";
import { CopyButton, CopiedText } from "../styles/CopyButtonStyle.style";
import QRCode from "qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { query, where, getDocs, collection } from "firebase/firestore";

/**
 * Represents a short URL document stored in Firestore.
 */
export interface ShortUrlDoc {
  // Firestore document ID
  id: string;
  // Original URL before shortening
  originalUrl: string;
  // Custom short name (optional)
  customName?: string | null;
  // Title of the link (optional)
  title?: string;
  // Owner (optional)
  owner?: string;
  // Creation date
  createdAt: Date;
  // Number of clicks
  clicks: number;
  // Last access timestamp
  lastAccess: Date | null;
}

/**
 * URL Shortener Component.
 *
 * @component
 * @example
 * return <Home />
 */
const Home: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [advancedOpen, setAdvancedOpen] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>("");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("Please enter a valid URL!");

  /**
   * Creates a short URL and stores it in Firestore.
   */
  const createShort = async (): Promise<void> => {
    if (!url.trim()) {
      setModalOpen(true);
      return;
    }

    try {
      const q = query(collection(db, "shorturls"), where("originalUrl", "==", url));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0].data() as ShortUrlDoc;
        const shortPath = existingDoc.customName?.trim() || existingDoc.id;
        const finalUrl = `${window.location.origin}/${shortPath}`;
        setResult(finalUrl);
        setCopied(false);

        const dataUrl = await QRCode.toDataURL(finalUrl);
        setQrDataUrl(dataUrl);

        setModalMessage(`This URL has already been shortened: ${finalUrl}`);
        setModalOpen(true);
        return;
      }

      const id = nanoid(6);
      const trimmedCustomName = customName.trim();
      const docData: ShortUrlDoc = {
        id,
        originalUrl: url,
        customName: trimmedCustomName !== "" ? trimmedCustomName : null, 
        title: "",
        owner: "",
        createdAt: new Date(),
        clicks: 0,
        lastAccess: null,
      };

      await setDoc(doc(db, "shorturls", id), docData);

      const finalUrl =
        trimmedCustomName !== "" ? `${window.location.origin}/${trimmedCustomName}` : `${window.location.origin}/${id}`;

      setResult(finalUrl);
      setCopied(false);

      const dataUrl = await QRCode.toDataURL(finalUrl);
      setQrDataUrl(dataUrl);
    } catch (error) {
      console.error("Firestore error:", error);
      setModalMessage("An error occurred while generating the short URL.");
      setModalOpen(true);
    }
  };

  /**
   * Copy the generated short URL to the clipboard.
   */
  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Download the QR code image for the generated short URL.
   */
  const downloadQR = (): void => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <Container>
      <h1>URL Shortener</h1>
      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Input
          placeholder="Enter the URL to shorten..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1 }}
        />
        <Button
          style={{ display: "flex", alignItems: "center", padding: "10px" }}
          onClick={() => setAdvancedOpen(!advancedOpen)}
        >
          <FontAwesomeIcon icon={faGear} style={{ marginRight: '8px' }} />
          {advancedOpen ? "Hide Advance" : "Advance"}
        </Button>
      </div>

      {/* customName input bind กับ state เสมอ แม้ยังไม่เปิด Advance */}
      <Input
        placeholder="Custom short name (optional)"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
        style={{ marginTop: "10px", display: advancedOpen ? 'block' : 'none' }}
      />
      {/* <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Input
          placeholder="Enter the URL to shorten..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1 }}
        />
        <Button
          style={{ display: "flex", alignItems: "center", padding: "10px" }}
          onClick={() => setAdvancedOpen(!advancedOpen)}
        >
          <FontAwesomeIcon icon={faGear} style={{ marginRight: '8px' }} />
          {advancedOpen ? "Hide Advance" : "Advance"}
        </Button>
      </div>

      {advancedOpen && (
        <div style={{ marginTop: "20px" }}>
          <Input
            placeholder="Custom short name (optional)"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />
          <p style={{ fontSize: "12px", opacity: 0.7 }}>
            example: myshop → link will be /myshop
          </p>
        </div>
      )} */}

      <div style={{ marginTop: "15px" }}>
        <Button onClick={createShort}>Shorten URL</Button>
      </div>

      {result && (
        <ResultText>
          Your link: <a href={result}>{result}</a>
          <CopyButton onClick={copyToClipboard}>Copy</CopyButton>
          {copied && <CopiedText>✓ Copied!</CopiedText>}

          {qrDataUrl && (
            <div style={{ marginTop: "20px" }}>
              <img
                src={qrDataUrl}
                alt="QR Code"
                style={{ width: "150px", height: "150px" }}
              />
              <Button onClick={downloadQR} style={{ marginTop: "10px" }}>
                Download QR
              </Button>
            </div>
          )}
        </ResultText>
      )}

      {modalOpen && (
        <ModalOverlay>
          <ModalContent>
            <p>{modalMessage}</p>
            <ModalButton onClick={() => setModalOpen(false)}>Close</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Home;
