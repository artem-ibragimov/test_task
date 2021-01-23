import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react-lite';
import EmployeesStore from 'src/store/Employees';
import { Field } from 'src/components/fields';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         '& > div': {
            marginTop: theme.spacing(2),
         },
         width: '40ch',
         display: 'flex',
         flexDirection: 'column'
      },
   }),
);

export default observer(({ store }: { store: EmployeesStore; }) => {
   const classes = useStyles();
   if (!store.choosen) { return null; }
   const attrs = Object.values(store.choosen.attrs);

   return <form className={classes.root} noValidate autoComplete="off">
      {attrs.map((attr) => <Field attr={attr} key={attr.label} />)}
   </form>;
});
