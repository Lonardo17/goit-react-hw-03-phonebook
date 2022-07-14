import PropTypes from 'prop-types';
import s from './filter.module.css';

export default function Filter({ value, onChange }) {
  return (
    <label className={s.filter}>
      Find contacts by name
      <input
        className={s.input}
        type="text"
        value={value}
        onChange={onChange}
      ></input>
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};