import { Input } from '../../components/Atoms/Input/Input';
import { MultiSelect } from '../../components/Molecules/MultiSelect/MultiSelect';
import { Calendar } from '../../components/Organisms/Calendar/Calendar';
import { SelectInput } from '../../components/Molecules/SelectInput/SelectInput';

import { dropdownTypes } from '../dropdown';

export const fieldComponentsList = {
    [dropdownTypes.INPUT]: Input,
    [dropdownTypes.SELECT]: (props) => <SelectInput {...props} />,
    [dropdownTypes.MULTISELECT]: (props) => <SelectInput {...props} SelectComponent={MultiSelect} />,
    [dropdownTypes.DATE]: (props) => <SelectInput {...props} SelectComponent={Calendar} />,
};
