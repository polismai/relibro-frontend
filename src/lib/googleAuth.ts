import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebaseConfig";

const loginWithGoogle= async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    };
  } catch (error) {
    console.error("Google login error", error);
    throw error;
  }
}

export default loginWithGoogle;