import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore"; // Assuming you're using Firebase v9+

/**
 * Fetches appliance prices from the Firestore database.
 * @returns A promise that resolves to an object containing appliance prices or an empty object if an error occurs or the document doesn't exist.
 */
async function getPrices(): Promise<{ [key: string]: number } | null> {
    try {
        const docId = process.env.REACT_APP_ADMIN_PREFS_DOC || "defaultDocId";
        const docRef = doc(db, "admin_prefs", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const installAppliances = docSnap.data().prices;
            if (typeof installAppliances === "object") {
                return installAppliances;
            } else {
                console.log(
                    "pricesInstall is not an object:",
                    installAppliances
                );
                return null;
            }
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        return null;
    }
}

export { getPrices };
