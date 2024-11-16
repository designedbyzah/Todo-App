import { MdOutlineModeEdit, MdDeleteOutline, MdMoreHoriz } from "react-icons/md";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown.jsx";

function EnteredToDos({ title, onEditClick, onDeleteClick, isDropdownOpen, toggleDropdown }) {
  return (
    <div className="todo-card">
      <div className="title-container">
        <h1>{title}</h1>
      </div>

      <div className="icon-container" onClick={toggleDropdown}>
        <MdMoreHoriz className="more-icon" />

        {isDropdownOpen && (
          <div className="dropdown-container">
            <Dropdown
              icon={<MdOutlineModeEdit className="edit-icon" />}
              dropDownText={"Edit"}
              onClick={onEditClick}
            />

            <Dropdown
              icon={<MdDeleteOutline className="delete-icon" />}
              dropDownText={"Delete"}
              textColor={"#f04438"}
              onClick={onDeleteClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}

EnteredToDos.propTypes = {
  title: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
};

export default EnteredToDos;
