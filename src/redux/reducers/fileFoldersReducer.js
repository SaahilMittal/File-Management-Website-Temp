
import * as types from "../actionsTypes/fileFolderActionTypes"

const initialState ={
    isLoading : true,
    currentFolder: "root",
    userFolders: [],
    userFiles: [],
    adminFolders: [],
    adminFiles: [],
}

const fileFolderReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case types.CREATE_FOLDER:
            return {
                ...state,
                isLoading:true,
                userFolders:[ ...state.userFolders, action.payload],
            };
        case types.ADD_FOLDER:
            return {
                ...state,
                userFolders: action.payload,
            }  
        case types.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            } 
        case types.CHANGE_FOLDER:
            return {
                ...state,
                currentFolder : action.payload,

            }
        case types.CREATE_FILE:
                return {
                  ...state,
                  userFiles: [...state.userFiles, action.payload],
                }    
        case types.ADD_FILES:
            return {
                ...state,
                userFiles : action.payload,
            } 
        case types.DELETE_FILE:
            return {
                ...state,
                userFiles: state.userFiles.filter((file) => file.docId !== action.payload),
            }
        case types.DELETE_FOLDER:
            return {
                ...state,
                userFolders: state.userFolders.filter((folder) => folder.docId !== action.payload),
            } 
        case types.LOGOUT_USER:
            return {
                ...state,
                userFolders: [],
                userFiles : []
            }       

                            
        default:
            return state;
    }
};

export default fileFolderReducer