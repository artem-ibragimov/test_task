import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from "mobx-react-lite";
import React from 'react';
import EmployeesStore from 'src/store/Employees';


const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         flexBasis: '40%',
         maxWidth: 360,
         backgroundColor: theme.palette.background.paper,
      },
   }),
);

export default observer(({ store }: IProps) => {
   const employees = store.getList();
   const classes = useStyles();
   const choosenID = store.choosen?.id;
   return <List className={classes.root}>
      {employees.map(({ label, id, checked }) => (
         <ListItem key={id} dense selected={id === choosenID} button onClick={() => {
            store.choose(id);
         }}>
            <ListItemIcon>
               <Checkbox
                  onChange={() => { store.check(id, !checked); }}
                  edge="start"
                  checked={checked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': id }}
               />
            </ListItemIcon>
            <ListItemText id={id} primary={label} />
         </ListItem>
      ))}
   </List>;
});

interface IProps {
   store: EmployeesStore;
}