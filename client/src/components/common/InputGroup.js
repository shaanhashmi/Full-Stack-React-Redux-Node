import React from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  type,
  icon,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text rounded-0">
          <i className={icon} />
        </span>
      </div>
      <input
        type={type}
        className={classNames('form-control form-control-md rounded-0', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

InputGroup.defaultProps = {
  type: 'text'
}

export default InputGroup;
