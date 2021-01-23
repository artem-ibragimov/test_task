import EmployeesStore from 'src/store/Employees';
import Actions from 'src/components/Actions';
import Employee from 'src/core/Employee';
import Alert from 'src/components/Alert';
import React from 'react';
import { observer } from 'mobx-react-lite';

export default observer(function EmployeeActions({ store }: { store: EmployeesStore; }) {
   const onAdd = () => { store.add(Employee.new()); };
   const onDelete = () => {
      store.delete(store.getChecked());
   };
   const onUpdate = () => {
      if (!store.changesStored) { setPopupOpen(true); }
   };
   const onSave = store.store;
   const saveDisabled = store.changesStored;
   const deleteDisabled = store.getChecked().length === 0;

   const [isPopupOpened, setPopupOpen] = React.useState<boolean>(false);
   const onAgree = () => { setPopupOpen(false); store.restore(); };
   const onCancel = () => { setPopupOpen(false); };
   return <>
      <Alert isOpened={isPopupOpened} onOk={onAgree} onCancel={onCancel} title={'Unsaved changes will be lost'} />
      <Actions {...{ onAdd, onDelete, onUpdate, onSave, saveDisabled, deleteDisabled }} />
   </>;
})