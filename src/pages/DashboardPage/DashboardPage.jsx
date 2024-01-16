import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useEffect , useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/DashboardComponents/Navbar/Navbar'
import SubBar from '../../components/DashboardComponents/SubBar/SubBar'
import HomeComponent from '../../components/DashboardComponents/HomeComponent/HomeComponent'
import CreateFolder from '../../components/DashboardComponents/CreateFolder/CreateFolder'
import { getFiles, getFolders } from '../../redux/actionCreators/fileFolderActionCreator'
import FolderComponent from '../../components/DashboardComponents/FolderComponent/FolderComponent'
import UploadFile from '../../components/DashboardComponents/UploadFile/UploadFile'
import FileComponent from '../../components/DashboardComponents/FileComponent/FileComponent'

function DashboardPage() {

  const [isCreateFolderModalOpen , setisCreateFolderModalOpen] = useState(false)
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false)

  const [showSubBar, setShowSubBar] = useState(true);
  const { pathname } = useLocation();

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
      dispatch(getFiles(userId))

    }
  },[isLoading, userId, dispatch])

  useEffect(() => {
    if (pathname.includes("/file/")) {
      console.log("pathname", pathname);
      setShowSubBar(false);
    } else {
      setShowSubBar(true);
    }
  }, [pathname]);

  return (
    <>
  
    {
      isCreateFolderModalOpen && (
        <CreateFolder setisCreateFolderModalOpen = {setisCreateFolderModalOpen} />
      )
    }
     {
      isFileUploadModalOpen && (
        <UploadFile setIsFileUploadModalOpen = {setIsFileUploadModalOpen} />
      )
    }
    <Navbar/>
   { showSubBar &&(<SubBar setisCreateFolderModalOpen={setisCreateFolderModalOpen} setIsFileUploadModalOpen={setIsFileUploadModalOpen}/>)}

    <Routes>
      <Route path="/" element={<HomeComponent />} />
      <Route path = "folder/:folderId" element = {<FolderComponent/>} />
      <Route path="file/:fileId" element={<FileComponent />} />
    </Routes>
  
    </>
  )
}

export default DashboardPage