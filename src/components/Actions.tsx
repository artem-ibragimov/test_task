import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         '& > *': {
            margin: theme.spacing(1),
         },
         position: 'fixed',
         bottom: theme.spacing(1),
         right: theme.spacing(1),
      },
   }),
);

export default React.memo(({
   onAdd, onDelete, onSave, onUpdate,
   addDisabled, deleteDisabled, saveDisabled, updateDisabled
}: IHanders & Partial<IButtonAttrs>) => {
   const classes = useStyles();
   return (
      <div className={classes.root}>
         <Fab color="primary" aria-label="add" onClick={onAdd} disabled={addDisabled}>
            <AddIcon />
         </Fab>
         <Fab aria-label="edit" onClick={onDelete} disabled={deleteDisabled}>
            <DeleteOutlineIcon />
         </Fab>
         <Fab aria-label="edit" onClick={onSave} disabled={saveDisabled}>
            <SaveIcon />
         </Fab>
         <Fab aria-label="edit" onClick={onUpdate} disabled={updateDisabled}>
            <UpdateIcon />
         </Fab>
      </div>
   );
});

interface IHanders {
   onAdd: () => void;
   onSave: () => void;
   onUpdate: () => void;
   onDelete: () => void;
}

interface IButtonAttrs {
   addDisabled: boolean;
   deleteDisabled: boolean;
   saveDisabled: boolean;
   updateDisabled: boolean;
}