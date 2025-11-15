import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { HistoryContainer, HistoryItem, ToggleButton, HistoryList } from "../styles/History.styles";

interface ShortUrlDoc {
    id: string;
    originalUrl: string;
    createdAt: Timestamp;
}

export default function History() {
    const [links, setLinks] = useState<ShortUrlDoc[]>([]);
    const [open, setOpen] = useState(true); // state toggle
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchLinks() {
            const q = query(collection(db, "shorturls"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const data: ShortUrlDoc[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                originalUrl: doc.data().originalUrl,
                createdAt: doc.data().createdAt,
            }));
            setLinks(data);
        }

        fetchLinks();
    }, []);

    const handleClick = (id: string) => {
        navigate(`/${id}`);
    };

    return (
        <HistoryContainer>
            <h2>Link History</h2>
            <ToggleButton onClick={() => setOpen(!open)}>
                {open ? "Hide Links" : "Show Links"}
            </ToggleButton>
            <HistoryList open={open}>
                {links.map((link) => (
                    <HistoryItem key={link.id} onClick={() => handleClick(link.id)}>
                        {link.originalUrl} → {window.location.origin}/{link.id}
                    </HistoryItem>
                ))}
            </HistoryList>
        </HistoryContainer>
    );
}
