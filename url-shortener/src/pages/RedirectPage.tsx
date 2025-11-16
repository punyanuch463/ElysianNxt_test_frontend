import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, query, collection, where, getDocs, type DocumentData } from "firebase/firestore";

/**
 * Page component that handles redirecting short URLs to their original URL.
 *
 * @component
 * @example
 * return <RedirectPage />
 */
const RedirectPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        /**
         * Fetch the short URL document, increment click count,
         * update last access, and redirect to original URL.
         */
        const redirect = async () => {
            if (!id) return;

            try {
                let snap = await getDoc(doc(db, "shorturls", id));
                let data: DocumentData | undefined;

                if (snap.exists()) {
                    data = snap.data();
                } else {
                    const q = query(collection(db, "shorturls"), where("customName", "==", id));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const docSnap = querySnapshot.docs[0];
                        data = docSnap.data();
                        snap = doc(db, "shorturls", docSnap.id) as never;
                    }
                }

                if (!data) {
                    alert("Invalid link");
                    window.location.replace("/");
                    return;
                }


                await updateDoc(doc(db, "shorturls", data.id), {
                    clicks: (data.clicks || 0) + 1,
                    lastAccess: new Date(),
                });


                window.location.replace(data.originalUrl);
            } catch (error) {
                console.error("Error redirecting:", error);
                alert("An error occurred. Redirecting to home.");
                window.location.replace("/");
            }
        };

        redirect();
    }, [id]);

    return <p>Redirecting...</p>;
};

export default RedirectPage;
