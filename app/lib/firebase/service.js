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
  serverTimestamp,
  setDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { app, storage } from "./init";
import { v4 } from "uuid";
// import bcrypt from "bcrypt";
// const bcrypt = require("bcrypt");

const firestore = getFirestore(app);

export async function uploadImageToStorage(image) {
  const pathName = `images/${v4()}`;
  const storageRef = ref(storage, pathName);

  // Define metadata with secret key
  const metadata = {
    customMetadata: {
      secret_key: "d190da1n1", // Replace with your actual secret key
    },
  };

  // Upload file with metadata
  await uploadBytes(storageRef, image, metadata);
  const imageUrl = await getDownloadURL(storageRef);

  const res = {
    url: imageUrl,
    ref: pathName,
    type: image.type,
  };

  return res;
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
export async function register(data) {
  console.log(data);
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
      message: "email sudah Terdaftar",
    };
  }
  // else {
  //   data.password = await bcrypt.hash(data.password, 10);
  // }
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

export async function retriveDataBySlug(collectionName, slug) {
  const q = query(
    collection(firestore, collectionName),
    where("slug", "==", slug)
  );
  const snapShot = await getDocs(q);
  const data = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data[0]; // return the first matching document
}

export async function updateCartUser(email, data) {
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("email", "==", email));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        status: "error",
        message: "No matching documents found.",
      };
    }

    const promises = querySnapshot.docs.map(async (doc) => {
      try {
        await updateDoc(doc.ref, {
          carts: data,
        });
        return {
          status: "success",
          message: "Document successfully updated!",
        };
      } catch (error) {
        console.error("Error updating document: ", error);
        return {
          status: "error",
          message: "Error updating document.",
        };
      }
    });

    // Menunggu semua promises untuk selesai
    await Promise.all(promises);

    return {
      status: "success",
      message: "All documents updated successfully.",
    };
  } catch (error) {
    console.error("Error getting documents: ", error);
    return {
      status: "error",
      message: "Error getting documents.",
    };
  }
}

export async function retriveProductUser() {
  const q = query(
    collection(firestore, "products"),
    where("stock", ">", 0),
    orderBy("created_at", "desc")
  );
  const snapShot = await getDocs(q);
  const data = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data; // return the first matching document
}

export async function retriveUserByEmail(email) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const snapShot = await getDocs(q);
  const data = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data[0]; // return the first matching document
}

export async function addDataWithCustomId(collectionName, id, data) {
  data.created_at = serverTimestamp();

  try {
    await setDoc(doc(firestore, collectionName, id), data);
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

export async function getDataWithDesc(collectionName) {
  const q = query(
    collection(firestore, collectionName),
    orderBy("created_at", "desc")
  );
  const snapShot = await getDocs(q);
  const data = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retriveDataBulanTertentu(collectionName, bulan, tahun) {
  const awalBulan = new Date(tahun, bulan - 1, 1);
  const akhirBulan = new Date(tahun, bulan, 0, 23, 59, 59); // akhir bulan terakhir, jam 23:59:59

  const startTimestamp = Timestamp.fromDate(awalBulan);
  const endTimestamp = Timestamp.fromDate(akhirBulan);

  let q;

  if (collectionName === "service") {
    q = query(
      collection(firestore, collectionName),
      where("created_at", ">=", startTimestamp),
      where("created_at", "<=", endTimestamp),
      where("statusCode", "==", 6),
      orderBy("created_at", "desc")
    );
  } else if (collectionName === "transaksi") {
    q = query(
      collection(firestore, collectionName),
      where("created_at", ">=", startTimestamp),
      where("created_at", "<=", endTimestamp),
      where("status", "==", "settlement"),
      orderBy("created_at", "desc")
    );
  }

  const snapShot = await getDocs(q);
  const data = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}
export async function retriveDataLaporan(collectionName, tahun) {
  const startDate = new Date(tahun, 0, 1);
  const endDate = new Date(tahun, 11, 31, 23, 59, 59);

  const startTimestamp = Timestamp.fromDate(startDate);
  const endTimestamp = Timestamp.fromDate(endDate);

  let q;

  if (collectionName === "transaksi") {
    q = query(
      collection(firestore, collectionName),
      where("status", "==", "settlement"),
      where("created_at", ">=", startTimestamp),
      where("created_at", "<=", endTimestamp),
      orderBy("created_at", "desc")
    );
  } else if (collectionName === "service") {
    q = query(
      collection(firestore, collectionName),
      where("created_at", ">=", startTimestamp),
      where("created_at", "<=", endTimestamp),
      where("statusCode", "==", 6),
      orderBy("created_at", "desc")
    );
  }

  const snapShot = await getDocs(q);
  const data = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retriveTransactionByEmail(email) {
  const q = query(
    collection(firestore, "transaksi"),
    where("email", "==", email)
  );
  const snapShot = await getDocs(q);
  const data = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retriveDataDashboard(collectionName, bulan, tahun) {
  const awalBulan = new Date(tahun, bulan - 1, 1);
  const akhirBulan = new Date(tahun, bulan, 0, 23, 59, 59); // akhir bulan terakhir, jam 23:59:59

  const startTimestamp = Timestamp.fromDate(awalBulan);
  const endTimestamp = Timestamp.fromDate(akhirBulan);

  let q;

  if (collectionName === "service") {
    q = query(
      collection(firestore, collectionName),
      where("created_at", ">=", startTimestamp),
      where("created_at", "<=", endTimestamp),
      orderBy("created_at", "desc")
    );
  } else if (collectionName === "transaksi") {
    q = query(
      collection(firestore, collectionName),
      where("created_at", ">=", startTimestamp),
      where("created_at", "<=", endTimestamp),
      orderBy("created_at", "desc")
    );
  }

  const snapShot = await getDocs(q);
  const data = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}
