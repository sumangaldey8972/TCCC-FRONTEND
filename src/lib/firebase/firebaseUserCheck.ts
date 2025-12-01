import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { User } from "@/store/slices/authSlice";

/**
 * Check if a username or email already exists in Firestore
 * @param userName - username to check
 * @param email - email to check
 * @returns {Promise<{ usernameExists: boolean; emailExists: boolean }>}
 */
export const checkUserExistence = async (userName: string, email: string) => {
    const usersRef = collection(db, "users");

    // Check username
    const usernameQuery = query(usersRef, where("userName", "==", userName));
    const usernameSnapshot = await getDocs(usernameQuery);
    const usernameExists = !usernameSnapshot.empty;

    // Check email
    const emailQuery = query(usersRef, where("email", "==", email));
    const emailSnapshot = await getDocs(emailQuery);
    const emailExists = !emailSnapshot.empty;

    return { usernameExists, emailExists };
};



export const updateUserPhotoUrl = async (userName: string, image: string) => {
    try {
        const userRef = collection(db, "users");

        // Step 1: Find the user by username
        const usernameQuery = query(userRef, where("userName", "==", userName));
        const querySnapshot = await getDocs(usernameQuery);

        if (querySnapshot.empty) {
            return {
                status: false,
                message: "User not found",
            };
        }

        // Step 2: Update the user's photo URL
        const userDoc = querySnapshot.docs[0].ref;
        await updateDoc(userDoc, {
            profilePhotoUrl: image,
            updatedAt: new Date(),
        });

        return {
            status: true,
            message: "User photo updated successfully",
        };
    } catch (error) {
        console.error("Error updating user photo:");
        const errorMessage = error instanceof Error ? error.message : "An Error occured"
        return {
            status: false,
            message: errorMessage
        };
    }
};



export const uodatePersonalInformation = async (user: User) => {

    try {
        console.log(user)
        const userRef = collection(db, "users");

        // Step 1: Find the user by username
        const usernameQuery = query(userRef, where("userName", "==", user.userName));
        const querySnapshot = await getDocs(usernameQuery);

        if (querySnapshot.empty) {
            return {
                status: false,
                message: "User not found",
            };
        }

        // Step 2: Update the user's photo URL
        const userDoc = querySnapshot.docs[0].ref;
        await updateDoc(userDoc, {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            landlineNumber: user.landlineNumber,
            updatedAt: new Date(),
        });

        return {
            status: true,
            message: "User personal info updated successfully",
        };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An Error occured"
        return {
            status: false,
            message: errorMessage
        };
    }
}


export const uodateAddressInformation = async (user: User) => {
    try {
        const userRef = collection(db, "users");

        // Step 1: Find the user by username
        const usernameQuery = query(userRef, where("userName", "==", user.userName));
        const querySnapshot = await getDocs(usernameQuery);

        if (querySnapshot.empty) {
            return {
                status: false,
                message: "User not found",
            };
        }

        // Step 2: Update the user's photo URL
        const userDoc = querySnapshot.docs[0].ref;
        await updateDoc(userDoc, {
            country: user.country,
            city: user.city,
            pincode: user.pincode,
            address: user.address,
            updatedAt: new Date(),
        });

        return {
            status: true,
            message: "User address info updated successfully",
        };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An Error occured"
        return {
            status: false,
            message: errorMessage
        };
    }
}



export const uodateCryptoInformation = async (user: User) => {
    try {
        const userRef = collection(db, "users");

        // Step 1: Find the user by username
        const usernameQuery = query(userRef, where("userName", "==", user.userName));
        const querySnapshot = await getDocs(usernameQuery);

        if (querySnapshot.empty) {
            return {
                status: false,
                message: "User not found",
            };
        }

        // Step 2: Update the user's photo URL
        const userDoc = querySnapshot.docs[0].ref;

        // bitcoinAddress: { type: String },
        // usdtAddress: { type: String },
        // telegramUsername: { type: String },


        await updateDoc(userDoc, {
            bitcoinAddress: user.bitcoinAddress,
            usdtAddress: user.usdtAddress,
            telegramUsername: user.telegramUsername,
            updatedAt: new Date(),
        });

        return {
            status: true,
            message: "User crypto info updated successfully",
        };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An Error occured"
        return {
            status: false,
            message: errorMessage
        };
    }
}
