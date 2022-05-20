import { Input } from '../../components/Atoms/Input/Input';
import { Select } from '../../components/Molecules/Select/Select';
import { MultiSelect } from '../../components/Molecules/MultiSelect/MultiSelect';
import { PeriodCalendar } from '../../components/Organisms/Calendar/PeriodCalendar';
import { SelectInput } from '../../components/Molecules/SelectInput/SelectInput';

import { dropdownTypes } from '../dropdown';

const getInputValue = ({ fieldValue, value, formatValue }) => {
    const initialValue = fieldValue || value
    return formatValue ? formatValue(initialValue) : initialValue
}

export const fieldComponentsList = {
    [dropdownTypes.INPUT]: (props) => <Input {...props} value={getInputValue(props)} />,
    [dropdownTypes.SELECT]: (props) => <SelectInput {...props} value={props.inputValue!==undefined ? props.inputValue : (props.fieldValue && props.fieldValue.find) ? props.fieldValue.find(item => {
        return !!item.isSelected
    }) : props.fieldValue} onCloseCheck={()=>true} />,
    [dropdownTypes.MULTISELECT]: (props) => <SelectInput {...props} SelectComponent={MultiSelect} />,
    [dropdownTypes.DATE]: (props) => <SelectInput {...props} SelectComponent={PeriodCalendar} onCloseCheck={(value)=>value.to && value.from} />,
};