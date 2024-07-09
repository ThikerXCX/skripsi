import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { app, storage } from "./init";
import { v4 } from "uuid";

const firestore = getFirestore(app);

export async function uploadImageToStorage(image) {
  const storageRef = ref(storage, `images/${v4() + image.name}`);
  await uploadBytes(storageRef, image);
  const imageUrl = await getDownloadURL(storageRef);
  console.log(imageUrl);
  return imageUrl;
}

export async function retriveData(collectionName) {
  const snapShot = await getDocs(collection(firestore, collectionName));

  const data = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retriveDataById(collectionName, id) {
  const snapShot = await getDoc(doc(firestore, collectionName, id));
  const data = snapShot.data();
  data.id = id;
  return data;
}

export async function register(data) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  const snapShot = await getDocs(q);
  const users = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users.length > 0) {
    return {
      status: false,
      statusCode: 400,
      message: "email udah ada guyszzz",
    };
  } else {
    data.password = await bcrypt.hash(data.password, 10);
  }
  try {
    await addDoc(collection(firestore, "users"), data);
    return { status: true, message: "register berhasil", statusCode: 200 };
  } catch (error) {
    return { status: false, message: "Register gagal", statusCode: 400 };
  }
}

export async function login(data) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  const snapShot = await getDocs(q);
  const users = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users) {
    return users[0];
  } else {
    return null;
  }
}

export async function deleteDocById(collectionName, id) {
  const res = await deleteDoc(doc(firestore, collectionName, id));
  return res;
}

export async function updateFieldById(collectionName, id, data) {
  const res = await updateDoc(doc(firestore, collectionName, id), data);
  return res;
}

export async function tambahData(collectionName, data) {
  try {
    await addDoc(collection(firestore, collectionName), data);
    return {
      status: true,
      message: "Data berhasil ditambahkan",
      statusCode: 200,
    };
  } catch (error) {
    return {
      status: false,
      message: "Data gagal ditambahkan",
      statusCode: 400,
    };
  }
}
