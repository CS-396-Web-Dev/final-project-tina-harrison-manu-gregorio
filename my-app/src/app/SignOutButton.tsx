import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function SignOutButton() {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Could not sign out.');
        }
    };

    return (
        <button className="absolute right-4 bg-gray-300 rounded-md p-2 text-lg" onClick={handleSignOut}>Sign Out</button>
    );
}