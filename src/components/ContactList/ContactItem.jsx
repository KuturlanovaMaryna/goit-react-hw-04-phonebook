import DeleteButton from 'components/DeleteButton/DeleteButton';
import PropTypes from 'prop-types';
import css from './ContactItem.module.css'

const ContactItem = ({ userName, userNumber, id, handleDeleteUser }) => {
  return (
    <li className={css.contactItem} id={id}>
      <p>{`${userName}: ${userNumber}`}</p>
      <DeleteButton userId={id} handleDeleteUser={handleDeleteUser} />
    </li>
  );
};

export default ContactItem;

DeleteButton.propTypes = {
  userName: PropTypes.string,
  userNumber: PropTypes.string,
  id: PropTypes.string,
  handleDeleteUser: PropTypes.func.isRequired,
};