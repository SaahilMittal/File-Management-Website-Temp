import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ShowItems from '../ShowItems/ShowItems'
function FolderComponent() {

    const {folderId} = useParams()
    const { currentFolderData, childFolders, childFiles } = useSelector(
        (state) => ({
          currentFolderData: state.fileFolderReducer.userFolders.find(
            (folder) => folder.docId === folderId
          )?.data,
          childFolders: state.fileFolderReducer.userFolders.filter(
            (folder) => folder.data.parent === folderId
          ),
          childFiles: state.fileFolderReducer.userFiles.filter(
            (file) => file.data.parent === folderId
          ),
        }),
        shallowEqual
      );
    

      const uploadedFiles =
        childFiles && childFiles.filter((file) => file.data.data === null);
    
      return (
        <div>
          {childFolders.length > 0 || childFiles.length > 0 ? (
            <>
              {childFolders.length > 0 && (
                <ShowItems
                  title={"Folders"}
                  type={"folder"}
                  items={childFolders}
                />
              )}
    
              {uploadedFiles && uploadedFiles.length > 0 && (
                <ShowItems
                  title={"Files"}
                  type={"file"}
                  items={uploadedFiles}
                />
              )}
            </>
          ) : (
            <p className="text-center my-5">Empty Folder</p>
          )}
        </div>
      );
}

export default FolderComponent