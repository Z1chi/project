import { Input } from '../../components/Atoms/Input/Input';
import { MultiSelect } from '../../components/Molecules/MultiSelect/MultiSelect';
import { Calendar } from '../../components/Organisms/Calendar/Calendar';
import { SelectInput } from '../../components/Molecules/SelectInput/SelectInput';

import { dropdownTypes } from '../dropdown';

const getInputValue = ({ fieldValue, value, formatValue }) => {
    const initialValue = fieldValue || value
    return formatValue ? formatValue(initialValue) : initialValue
}

export const fieldComponentsList = {
    [dropdownTypes.INPUT]: (props) => <Input {...props}  value={getInputValue(props)} />,
    [dropdownTypes.SELECT]: (props) => <SelectInput {...props} value={(props.fieldValue && props.fieldValue.find) ? props.fieldValue.find(item => {
        return !!item.isSelected
    }) : props.fieldValue} onCloseCheck={()=>true} />,
    [dropdownTypes.MULTISELECT]: (props) => <SelectInput {...props} SelectComponent={MultiSelect} />,
    [dropdownTypes.DATE]: (props) => <SelectInput {...props} SelectComponent={Calendar} onCloseCheck={(value)=>value.to && value.from} />,
};