
import { addDoc, collection, getDocs, getFirestore, onSnapshot } from "firebase/firestore"
import { fireBaseApp } from "."


// init database 
const db = getFirestore(fireBaseApp)


// create doc
export const createDev = async (collName, data) => {
 return await addDoc(collection(db, collName), {
  ...data
 });
};


// get all devs
export const getAllDev = async (collName) => {
   const data = await getDocs(collection(db, collName));
  
   const devList  = [];

   data.forEach((item) => {
    devList.push(item.data())
   });

   return devList; 
}; 


// get all devs real time
export const getAllDevRealTime = async (collName) => {
   const snapshot = onSnapshot(collection(db, collName));
  
   (snapshot) => {
    const devList  = [];

    snapshot.forEach((item) => {
     devList.push(item.data())
    });
    return devList; 
   }
}; 

