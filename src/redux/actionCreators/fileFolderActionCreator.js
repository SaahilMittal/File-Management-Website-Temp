import * as types from "../actionsTypes/fileFolderActionTypes"
import fire from "../../api/firebase";

const addFolder = (payload) => ({
    type : types.CREATE_FOLDER,
    payload,
})

const addFolders = (payload) => ({
    type: types.ADD_FOLDER,
    payload,
});


const setLoading = (payload) => ({
    type: types.SET_LOADING,
    payload,
})


const setChangeFolder = (payload) => ({
    type : types.CHANGE_FOLDER,
    payload,
})
export const createFolder = (data) => (dispatch) => {
    fire.firestore().collection("folders").add(data).then(async (folder)=>{

        const folderData = await (await folder.get()).data();
        const folderId = folder.id
        dispatch(addFolder({data :folderData , docId : folderId}) ); 
    
    })
};

export const getFolders = (userId) => (dispatch) => {
    dispatch(setLoading(true))
    fire
    .firestore()
    .collection("folders") 
    .where("userId", '==' , userId)
    .get()
    .then(async (folders) => {
            const foldersData = await folders.docs.map((folder) => ({
                data : folder.data(),
                docId: folder.id
            }));
            dispatch(addFolders(foldersData))
            dispatch(setLoading(false))
        })
    
}

export const changeFolder = (folderId) => (dispatch) => {
    dispatch(setChangeFolder(folderId))
}

export const deleteFolder = (folderId) => (dispatch) => {
    fire
    .firestore()
    .collection("folders")
    .doc(folderId)
    .delete()
    .then(() => {
        console.log("folder deleted successfully");
    })
    .catch((error) => {
        console.log("Error deleting folder", error);
    });
}