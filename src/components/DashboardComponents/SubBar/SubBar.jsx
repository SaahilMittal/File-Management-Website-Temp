import React from 'react'
import "./SubBar.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFileUpload , faFolderPlus} from "@fortawesome/free-solid-svg-icons"

function SubBar({isCreateFolderModalOpen, setisCreateFolderModalOpen}) {
  return (
    <nav className="navbar navbar-expand-lg mt-2 navbar-light bg-white px-5 py-2">
        

        <ul className='navbar-nav ms-auto'>
            <li className="nav-item mx-2">
                <button className="btn btn-outline-dark">
                    <FontAwesomeIcon icon={faFileUpload} /> &nbsp; Upload
                </button>
            </li>
            <li className="nav-item mx-2">
                <button className="btn btn-outline-dark" onClick={()=> setisCreateFolderModalOpen(true)}>
                    <FontAwesomeIcon icon={faFolderPlus} /> &nbsp; Create Folder
                </button>
            </li>

        </ul>
    </nav>
  )
}

export default SubBar