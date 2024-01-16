import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import {useSelector, shallowEqual, useDispatch} from "react-redux"


function UploadFile({setIsFileUploadModalOpen}) {


    const [file, setFile] = useState("");
    const [success, setSuccess] = useState(false);

    const {userFiles , user, currentFolder, currentFolderData} = useSelector((state) => ({
        userFiles: state.fileFolderReducer.userFiles,
        user : state.authReducer.user,
        currentFolder: state.fileFolderReducer.currentFolder,
        currentFolderData : state.fileFolderReducer.userFiles.find(folder=> folder.docId === state.fileFolderReducer.currentFolder),
    }),shallowEqual)

    const dispatch = useDispatch();
 
    const checkFileAlreadyPresent = (name, ext) => {

          
            const filePresent = userFiles.filter((file) => file.data.parent === currentFolder).find((fldr) => fldr.data.name === name);
            if(filePresent) return true;
            else return false;
        
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        
        // if(fileName)
        // {
        //     if(!checkFolderAlreadyPresent(fileName))
        //     {
                
        //         const data = {
        //             name : fileName,
        //             userId: user.uid,
        //             createdBy: user.displayName,
        //             path: currentFolder === "root" ? [] : [...currentFolderData.data.path,currentFolder],
        //             parent : currentFolder,
                    
        //         };
                
        //         dispatch(createFolder(data));
        //     }
        //     else alert("Folder Already Present")
        // }
        // else{
        //     alert("Folder name cannot be empty")
        // }
    }
  return (
    <div className="col-md-12  position-fixed top-0 left-0 w-100 h-100" style = {{ background : "rgba(0,0,0,0.4" , zIndex: 9999}}>

    <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
            <div className="d-flex justify-content-between">
                <h4>Upload File</h4>
                <button className="btn" onClick={() => setIsFileUploadModalOpen(false)}>
                    <FontAwesomeIcon icon ={faTimes} className='text-black' size ="sm"/>
                </button>
            </div>
            <hr/>
            <div className="d-flex flex-column align-items-center">
                <form action="" className="mt-3 w-100" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="file" className="form-control" id='file' placeholder='Folder Name' onChange={(e)=> setFile(e.target.value)}/>
                    </div>
                    <button className="btn btn-primary mt-5 form-control">
                        Upload File
                    </button>
                </form>
            </div>
            </div>   
    </div>
    </div>
  )
}

export default UploadFile