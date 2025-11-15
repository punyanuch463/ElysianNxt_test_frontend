import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function RedirectPage() {
    const { id } = useParams();

    useEffect(() => {
        async function go() {
            if (!id) return;
            const docRef = doc(db, "shorturls", id);
            const snap = await getDoc(docRef);

            if (!snap.exists()) {
                alert("Invalid link");
                window.location.replace("/");
                return;
            }

            const data = snap.data();
            await updateDoc(docRef, {
                clicks: (data.clicks || 0) + 1,
                lastAccess: new Date()
            });

            window.location.replace(data.originalUrl);
        }

        go();
    }, [id]);

    return <p>Redirecting...</p>;
}
