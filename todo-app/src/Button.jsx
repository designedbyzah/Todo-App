import PropTypes from "prop-types";

function Button({ buttonType, className, buttonText, onBtnClick }) {
  return (
    <button type={buttonType} className={className} onClick={onBtnClick}>
      {buttonText}
    </button>
  );
}

Button.propTypes = {
  buttonType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onBtnClick: PropTypes.func,
};

export default Button;
