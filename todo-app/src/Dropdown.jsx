import PropTypes from "prop-types";

function Dropdown({ icon, dropDownText, textColor, onClick }) {
  return (
    <button className="dropdown-text-icon-btn" onClick={onClick}>
      {icon}
      <span style={{ color: textColor }}>{dropDownText}</span>
    </button>
  );
}

Dropdown.propTypes = {
  icon: PropTypes.element,
  dropDownText: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
};

export default Dropdown;
