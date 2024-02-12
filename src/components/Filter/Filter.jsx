import css from './filter.module.css';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filter/filter-slice';

const Filter = () => {
  const dispatch = useDispatch();

  const changeFilter = ({ target }) => dispatch(setFilter(target.value));

  return (
    <input
      className={css.input}
      onChange={changeFilter}
      name="filter"
      placeholder="Search"
    />
  );
};

export default Filter;
