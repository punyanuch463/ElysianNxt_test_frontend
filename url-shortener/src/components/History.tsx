import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { HistoryContainer, HistoryItem, ToggleButton, HistoryList } from "../styles/History.styles";

/**
 * Represents a short URL document stored in Firestore.
 */
export interface ShortUrlDoc {
    // Firestore document ID 
    id: string;
    // Original URL before shortening 
    originalUrl: string;
    // Optional custom short name 
    customName?: string;
    // Firestore timestamp of creation  
    createdAt: Timestamp;
}

const History: React.FC = () => {
    const [links, setLinks] = useState<ShortUrlDoc[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const fetchLinks = async (): Promise<void> => {
        try {
            const q = query(collection(db, "shorturls"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);

            const data: ShortUrlDoc[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                originalUrl: doc.data().originalUrl,
                customName: doc.data().customName || undefined,
                createdAt: doc.data().createdAt,
            }));

            setLinks(data);
        } catch (error) {
            console.error("Failed to fetch links:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchLinks();
        };
        fetchData();
    }, []);

    const handleClick = (idOrName: string) => {
        navigate(`/${idOrName}`);
    };

    return (
        <HistoryContainer>
            <h2>Link History</h2>

            <ToggleButton onClick={() => setOpen(!open)}>
                {open ? "Hide Links" : "Show Links"}
            </ToggleButton>

            <HistoryList open={open}>
                {links.map((link) => {
                    const shortPath = link.customName || link.id;
                    return (
                        <HistoryItem key={link.id} onClick={() => handleClick(shortPath)}>
                            {link.originalUrl} → {window.location.origin}/{shortPath}
                        </HistoryItem>
                    );
                })}
            </HistoryList>
        </HistoryContainer>
    );
};

export default History;
