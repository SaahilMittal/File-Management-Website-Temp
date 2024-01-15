import React from 'react'
import ShowItems from '../ShowItems/ShowItems'
import { shallowEqual, useSelector } from 'react-redux'

function HomeComponent() {

    const folders = [{name : "fol1"}]
    const files = [{data :{name : "file1"} }, {data :{ name : "file2"}}]

    const {isLoading, userFolders} = useSelector(
      (state) => ({
        isLoading: state.fileFolderReducer.isLoading,
        userFolders: state.fileFolderReducer.userFolders.filter(folder=>folder.data.parent === "root"),
      }), shallowEqual
    )
 

  return (

    

   <div className="col-md-12 w-100">

    {
      isLoading ? (
        <h1 className="display-1 my-5 text-center">Loading...</h1>
      ) : (

    <>
    <ShowItems title = {"Folders"} type = {"folder"} items ={userFolders} />
    <ShowItems title = {"Files"} type = {"file"}items ={files} />
    </>

      )
    }


   </div>
  )
}

export default HomeComponent