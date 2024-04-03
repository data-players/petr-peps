import React from 'react';
import {Toolbar, SaveButton, DeleteButton} from 'react-admin';
import { makeStyles } from '@mui/styles';
// import DeleteButtonWithPermissions from './DeleteButtonWithPermissions';
import { DeleteButtonWithPermissions } from "@semapps/auth-provider";

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});



const ToolBarCustom = ({deleteable,...props}) => {
    console.log('ALLLLO',deleteable)
    return(
    <Toolbar {...props} classes={useStyles()} >
        <SaveButton />
        {deleteable &&
          <DeleteButtonWithPermissions />
        }

    </Toolbar>
)};

export default ToolBarCustom;
