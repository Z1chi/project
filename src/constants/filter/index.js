import { Select } from '../../components/Molecules/Select/Select';
import { MultiSelect } from '../../components/Molecules/MultiSelect/MultiSelect';
import { Calendar } from '../../components/Organisms/Calendar/Calendar';

import { dropdownTypes } from '../dropdown';

export const filterComponentsList = {
    [dropdownTypes.SELECT]: Select,
    [dropdownTypes.MULTISELECT]: MultiSelect,
    [dropdownTypes.DATE]: Calendar
};
