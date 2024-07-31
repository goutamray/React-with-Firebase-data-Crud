
import { addDoc, collection,  deleteDoc,  doc,  getFirestore, onSnapshot, orderBy, query } from "firebase/firestore"
import { fireBaseApp } from "."


// init database 
 const db = getFirestore(fireBaseApp)

/**
 * 
 * @param {
 * } collName 
 * @param {*} data 
 * @returns 
 */
export const createDev = async (collName, data) => {
 return await addDoc(collection(db, collName), {
  ...data
 });
};


/***
 * 
 ****  get all devs 
 */ 

// export const getAllDev = async (collName) => {
//    const data = await getDocs(collection(db, collName));
  
//    const devList  = [];

//    data.forEach((item) => {
//     devList.push(item.data())
//    });

//    return devList; 
// }; 


/***
 * 
 *  get real time data 
 */

export const getAllDevRealTime =  (collName, stateName) => {
  onSnapshot(
     query(collection(db, collName), 
     orderBy("createdAt", "desc")), 
    (snapshot) => {
    const devList = [];

    snapshot.docs.forEach((item) => {
      devList.push({...item.data(), id : item.id}); 
    })
    console.log(devList);
    stateName(devList);
  })
}; 



/**
 * 
 * delete devs 
 */
export const deleteSingleDev = async (collName, id) => {
   const data = await deleteDoc(doc(db, collName, id));
   
   return data; 

}; 


