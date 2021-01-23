import { Switch, TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { BaseAttr, DATA_TYPE } from 'src/core/Attr';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const Field = ({ attr }: { attr: BaseAttr; }) => {
   const Component = FIELDS_TYPES[attr.type];
   return <Component attr={attr} key={attr.label} />;
};

export const BoolField = observer(({ attr }: { attr: BaseAttr; }) => (
   <FormControlLabel
      label={attr.label}
      control={<Switch
         key={attr.label}
         checked={attr.value}
         onChange={() => { attr.change(!attr.value); }}
         name={attr.label}
      />}
   />
));

export const StrField = observer(({ attr }: { attr: BaseAttr; }) => (
   <TextField
      key={attr.label}
      onInput={({ target }) => { attr.change((target as HTMLInputElement).value); }}
      label={attr.label}
      defaultValue={attr.value}
      required={attr.isRequired}
   />
));

export const DateField = observer(({ attr }: { attr: BaseAttr; }) => (
   <TextField
      key={attr.label}
      label={attr.label}
      type="date"
      onChange={({ target }) => {
         attr.change((target as HTMLInputElement).value);
      }}
      required={attr.isRequired}
      defaultValue={attr.value}
      InputLabelProps={{ shrink: true, }}
   />
));

export const SelectField = observer(({ attr }: { attr: BaseAttr; }) => (
   <Select
      key={attr.label}
      value={attr.value}
      onChange={({ target }) => {
         attr.change((target as HTMLSelectElement).value);
      }}
   >
      {attr.dataRange.map((v) => <MenuItem value={v}>{v}</MenuItem>)}
   </Select>
));

export const RadioField = observer(({ attr }: { attr: BaseAttr; }) => (
   <RadioGroup row
      key={attr.label}
      value={attr.value}
      onChange={({ target }) => { attr.change((target as HTMLInputElement).value); }}
   >
      {attr.dataRange.map((v) =>
         <FormControlLabel
            value={v}
            label={v}
            control={<Radio />}
            labelPlacement="start"
         />)}
   </RadioGroup>
));

export const FIELDS_TYPES = {
   [DATA_TYPE.BOOL]: BoolField,
   [DATA_TYPE.DATE]: DateField,
   [DATA_TYPE.STR]: StrField,
   [DATA_TYPE.SELECT]: SelectField,
   [DATA_TYPE.RADIO]: RadioField,
};