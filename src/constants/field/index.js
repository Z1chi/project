import { Input } from '../../components/Atoms/Input/Input';
import { MultiSelect } from '../../components/Molecules/MultiSelect/MultiSelect';
import { Calendar } from '../../components/Organisms/Calendar/Calendar';
import { SelectInput } from '../../components/Molecules/SelectInput/SelectInput';

import { dropdownTypes } from '../dropdown';

export const fieldComponentsList = {
    [dropdownTypes.INPUT]: (props) => <Input {...props}  value={props.fieldValue || props.value} />,
    [dropdownTypes.SELECT]: (props) => <SelectInput {...props} value={(props.fieldValue && props.fieldValue.find) ? props.fieldValue.find(item => {
        return !!item.isSelected
    }) : props.fieldValue} />,
    [dropdownTypes.MULTISELECT]: (props) => <SelectInput {...props} SelectComponent={MultiSelect} />,
    [dropdownTypes.DATE]: (props) => <SelectInput {...props} SelectComponent={Calendar} />,
};