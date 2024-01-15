import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useEffect , useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from '../../components/DashboardComponents/Navbar/Navbar'
import SubBar from '../../components/DashboardComponents/SubBar/SubBar'
import HomeComponent from '../../components/DashboardComponents/HomeComponent/HomeComponent'
import CreateFolder from '../../components/DashboardComponents/CreateFolder/CreateFolder'
import { getFolders } from '../../redux/actionCreators/fileFolderActionCreator'
import FolderComponent from '../../components/DashboardComponents/FolderComponent/FolderComponent'

function DashboardPage() {

  const [isCreateFolderModalOpen , setisCreateFolderModalOpen] = useState(false)

  //const IsLoggedIn = useSelector(state => state.authReducer.isAuthenticated)
  const {IsLoggedIn, isLoading, userId} = useSelector((state) => ({
      IsLoggedIn: state.authReducer.isAuthenticated,
      isLoading: state.fileFolderReducer.isLoading,
      userId : state.authReducer.user.uid,
  }),shallowEqual)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if(!IsLoggedIn){
      navigate("/");
    }
  },[])

  useEffect(() => {
    if(isLoading && userId ){
      dispatch(getFolders(userId))
    }
  },[isLoading, userId, dispatch])

  return (
    <>
  
    {
      isCreateFolderModalOpen && (
        <CreateFolder setisCreateFolderModalOpen = {setisCreateFolderModalOpen} />
      )
    }
    <Navbar/>
    <SubBar setisCreateFolderModalOpen={setisCreateFolderModalOpen}/>

    <Routes>
      <Route path="/" element={<HomeComponent />} />
      <Route path = "folder/:folderId" element = {<FolderComponent/>} />
    </Routes>
  
    </>
  )
}

export default DashboardPage