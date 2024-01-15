import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ShowItems from '../ShowItems/ShowItems'
function FolderComponent() {

    const {folderId} = useParams()
    const {currentFolderData , childFolders} = useSelector(state =>({
        currentFolderData : state.fileFolderReducer.userFolders.find(
            (folder) => folder.docId === folderId)?.data,
            childFolders: state.fileFolderReducer.userFolders.filter(
                (folder) => folder.data.parent === folderId
            ),
        }), shallowEqual)
  return (
    <div>
        {
            childFolders.length> 0 ? (
                <>
                <ShowItems title = {"Folders"} type = {"folder"} items ={childFolders} />
                </>
            ) : (
                <p className="text-center my-5">Empty</p>
            )
        }

        
        </div>
  )
}

export default FolderComponent