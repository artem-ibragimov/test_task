import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default React.memo(({ title, body, isOpened, onOk, onCancel }: IProps) => (
   <div>
      <Dialog
         open={isOpened}
         onClose={onCancel}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description">
         <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
         <DialogContent>
            <DialogContentText> {body} </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={onCancel} color="primary" > cancel </Button>
            <Button onClick={onOk} color="primary" autoFocus> agree </Button>
         </DialogActions>
      </Dialog>
   </div>
));

interface IProps {
   title: string,
   body?: string,
   isOpened: boolean;
   onOk: () => void;
   onCancel?: () => void;
}