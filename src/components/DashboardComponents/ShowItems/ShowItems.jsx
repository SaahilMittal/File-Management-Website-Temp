import { faFileAlt, faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { changeFolder, deleteFile, deleteFolder } from '../../../redux/actionCreators/fileFolderActionCreator';

function ShowItems({title, items,type}) {


    const [showButtons, setShowButtons] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [inputValue, setInputValue] = useState("");


 const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue)
    
   };
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const handleDoubleClick = (itemId) => {
            if(type ==="folder")
            {
                dispatch(changeFolder(itemId))
                navigate(`/dashboard/folder/${itemId}`)
            }else {
                navigate(`/dashboard/file/${itemId}`);
              }
    }

    const toggleButtons = () => {
        setShowButtons(!showButtons);
      };

    const handleDelete = (itemId) => {
        if(type === "folder")
        dispatch(deleteFolder(itemId));
        else
        dispatch(deleteFile(itemId));
    }


  return (
   <div className="w-100">
    <h4 className="mx-5">{title}</h4>
    <div className="row gap-2 p-4 flex-wrap" >
        {
            items.map((item,index) =>{
                return( <div key = {index*55} className='col-md-2  d-flex flex-column py-3 text-center'  onDoubleClick={()=> handleDoubleClick(item.docId)}>
                   {type === "folder" ? (<FontAwesomeIcon onClick={toggleButtons} icon ={faFolder} size = "4x"/>) : (<FontAwesomeIcon onClick={toggleButtons} icon ={faFileAlt} size = "4x"/>)} 
                    {item.data.name}
                    {
                        showButtons && (
                            <div>
                                <button className="btn btn-sm btn-outline-primary my-2 mx-1" onClick={()=>{setShowForm(!showForm)}}>Rename</button>
                                {
                                    showForm && (
                                        <form action="" onSubmit={handleSubmit}>
                                            <input type="text" value={inputValue} onChange={(e)=>{ e.preventDefault(),setInputValue(e.target.value)}}/>
                                            <button type="submit">Submit</button>
                                        </form>
                                    )
                                }
                                <button className="btn btn-sm btn-outline-danger mx-1" onClick={()=>handleDelete(item.docId)}>Delete</button>
                                

                                {
                                    type === "file" && (
                                        <button className="btn btn-sm btn-outline-success mx-1">Move</button>
                                    )
                                    
                                }
                                
                            </div>
                        )
                    }
                    </div>)
            })
        }
    </div>
   </div>
  )
}

export default ShowItems