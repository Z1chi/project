import { Select } from '../../components/Molecules/Select/Select';
import { MultiSelect } from '../../components/Molecules/MultiSelect/MultiSelect';
import { PeriodCalendar } from '../../components/Organisms/Calendar/PeriodCalendar';

import { dropdownTypes } from '../dropdown';

export const filterComponentsList = {
    [dropdownTypes.SELECT]: Select,
    [dropdownTypes.MULTISELECT]: MultiSelect,
    [dropdownTypes.DATE]: PeriodCalendar,
};
