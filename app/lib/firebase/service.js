import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./init";
import { v4 } from "uuid";

async function uploadImageToStorage(image) {
    const storageRef = ref(storage, `images/${v4() + image.name}`);
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);
    console.log(imageUrl);
    return imageUrl;
}

export default uploadImageToStorage