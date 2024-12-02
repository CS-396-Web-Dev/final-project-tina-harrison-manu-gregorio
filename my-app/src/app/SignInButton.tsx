import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebaseConfig";

export default function SignInButton() {
    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch {
            console.error('Could not sign in.');
        }
    };

    return (
        <button className="absolute right-4 bg-gray-300 rounded-md p-2 text-lg" onClick={handleSignIn}>Sign In</button>
    );
}