import { faFileAlt, faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { changeFolder, deleteFile, deleteFolder, renameFile, renameFolder } from '../../../redux/actionCreators/fileFolderActionCreator';

function ShowItems({title, items,type}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Initial states are now objects or maps keyed by item IDs
    const [buttonsVisibility, setButtonsVisibility] = useState({});
    const [formsVisibility, setFormsVisibility] = useState({});
    const [inputValues, setInputValues] = useState({});

    const toggleButtons = (itemId) => {
        setButtonsVisibility(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));
    };

    const setShowForm = (itemId, showForm) => {
        setFormsVisibility(prevState => ({
            ...prevState,
            [itemId]: showForm
        }));
    };

    const handleInputChange = (itemId, value) => {
        setInputValues(prevState => ({
            ...prevState,
            [itemId]: value
        }));
    };

    const handleSubmit = (itemId, event) => {
        event.preventDefault();

        if(type =="folder")
        dispatch(renameFolder(itemId,inputValues[itemId]));
        else
        dispatch(renameFile(itemId,inputValues[itemId]));
        inputValues[itemId] = "";
        setShowForm(itemId, false);
        toggleButtons(itemId)
        
    
    };

    const handleDelete = (itemId) => {
        if(type === "folder") {
            dispatch(deleteFolder(itemId));
        } else {
            dispatch(deleteFile(itemId));
        }
    };

    const handleDoubleClick = (itemId) => {
        if(type ==="folder") {
            dispatch(changeFolder(itemId))
            navigate(`/dashboard/folder/${itemId}`)
        } else {
            navigate(`/dashboard/file/${itemId}`);
        }
    };

    return (
        <div className="w-100">
            <h4 className="mx-5">{title}</h4>
            <div className="row gap-2 p-4 flex-wrap">
                {
                    items.map((item) => {
                        const itemId = item.docId;
                        return (
                            <div key={itemId} className='col-md-2 d-flex flex-column py-3 text-center'>
                                <FontAwesomeIcon
                                    onClick={() => toggleButtons(itemId)}
                                    onDoubleClick={() => handleDoubleClick(itemId)}
                                    icon={type === "folder" ? faFolder : faFileAlt}
                                    size="4x"
                                />
                                {item.data.name}
                                {
                                    buttonsVisibility[itemId] && (
                                        <div>
                                            <button className="btn btn-sm btn-outline-primary my-2 mx-1"
                                                    onClick={() => setShowForm(itemId, !formsVisibility[itemId])}>
                                                Rename
                                            </button>
                                            {
                                                formsVisibility[itemId] && (
                                                    <form onSubmit={(e) => handleSubmit(itemId, e)}>
                                                        <input type="text"
                                                               value={inputValues[itemId] || ""}
                                                               onChange={(e) => handleInputChange(itemId, e.target.value)}
                                                        />
                                                        <button type="submit" className=' btn btn-sm btn-warning'>Submit</button>
                                                    </form>
                                                )
                                            }
                                            {
                                                !formsVisibility[itemId] && (
                                                    <button className="btn btn-sm btn-outline-danger mx-1"
                                                            onClick={() => handleDelete(itemId)}>
                                                        Delete
                                                    </button>
                                                )
                                            }
                                            {
                                                type === "file" && !formsVisibility[itemId] && (
                                                    <button className="btn btn-sm btn-outline-success mx-1">
                                                        Move
                                                    </button>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default ShowItems;
