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


const setDeleteFolder = (payload) => ({
    type: types.DELETE_FOLDER,
    payload,
})

const userLogOut = () => ({
    type:types.LOGOUT_USER,
})

const setDeleteFile = (payload) => ({
    type: types.DELETE_FILE,
    payload,
})
const setLoading = (payload) => ({
    type: types.SET_LOADING,
    payload,
})

const addFiles = (payload) => ({
    type: types.ADD_FILES,
    payload,
})
const addFile = (payload) => ({
    type: types.CREATE_FILE,
    payload,
  });
const setRenameFolder = (payload) => ({
    type: types.RENAME_FOLDER,
    payload,
})  
const setRenameFile = (payload) => ({
    type: types.RENAME_FILE,
    payload,
})

export const renameFile = (fileId, newName) => (dispatch) => {
   
    fire
        .firestore()
        .collection("files")
        .doc(fileId)
        .update({
            name: newName,
        })
        .then(() => {
            dispatch(setRenameFile({ docId: fileId, name: newName }));
           
        })
        .catch((error) => {
            console.log("Error renaming file", error);
        });
};

export const renameFolder = (folderId, newName) => (dispatch) => {


        
        fire.
        firestore()
        .collection("folders")
        .doc(folderId)
        .update({
            name : newName,
        })
        .then(() => {
            dispatch(setRenameFolder({ docId: folderId, name: newName }));
        })
        .catch((error) => {
            console.log("Error renaming folder", error);
        });


}



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

export const userLogsOut = (data) => (dispatch) => {
    dispatch(userLogOut())

}
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
        dispatch(setDeleteFolder(folderId))
        console.log("folder deleted successfully");
    })
    .catch((error) => {
        console.log("Error deleting folder", error);
    });
}

export const deleteFile = (fileId) => (dispatch) => {
    fire
    .firestore()
    .collection("files")
    .doc(fileId)
    .delete()
    .then(() => {
        dispatch(setDeleteFile(fileId))
        console.log("file deleted successfully");
    })
    .catch((error) => {
        console.log("Error deleting file", error);
    });
}

export const getFiles = (userId) => (dispatch) => {
    fire
    .firestore()
    .collection("files") 
    .where("userId", '==' , userId)
    .get()
    .then(async (files) => {
            const filesData = await files.docs.map((file) => ({
                data : file.data(),
                docId: file.id
            }));
            dispatch(addFiles(filesData))
           
        })
}

export const uploadFile = (file,data, setSuccess) => (dispatch) => {
    const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);

    uploadFileRef.put(file).on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("uploading " + progress + "%");
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const fileUrl = await uploadFileRef.getDownloadURL();
        const fullData = { ...data, url: fileUrl };
  
        fire
          .firestore()
          .collection("files")
          .add(fullData)
          .then(async (file) => {
            const fileData = await (await file.get()).data();
            const fileId = file.id;
            dispatch(addFile({ data: fileData, docId: fileId }));
            alert("File uploaded successfully!");
            setSuccess(true);
          })
          .catch(() => {
            setSuccess(false);
          });
      }
    );
};