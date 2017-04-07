import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SignUpForm from '../components/SignUpForm.jsx';
import CircularProgressBg from '../components/CircularProgressBg.jsx';
import TopBar from './TopBarContainer.jsx';

import { submitSignup, signUpFormInput, signupSuccessMessage } from '../actions';

class SignUpPage extends React.Component {

  componentWillMount() {
    this.props.signupSuccessMessage();
  }

  render() {
    // dispatch to props
    const { submitSignup, signUpFormInput } = this.props;

    // state to props
    const { validateRes, checkSignup, user, signupErrMessage, loading } = this.props;
    if (loading) {
      return (
        <div>
          <TopBar />
          <CircularProgressBg />
        </div>

      );
    }
    if (checkSignup) {
      return (<Redirect to="/login" />);
    }

    return (
      <div>
        <TopBar />
        <SignUpForm
          onSubmit={content => submitSignup(content)}
          signupFormInput={input => signUpFormInput(input)}
          flash={signupErrMessage}
          validateResult={validateRes}
          user={user}
        />
      </div>
    );
  }

}

SignUpPage.propTypes = {
  signupSuccessMessage: PropTypes.func.isRequired,
  submitSignup: PropTypes.func.isRequired,
  // signupFormInput: PropTypes.func.isRequired,
  validateRes: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirm: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirm: PropTypes.string.isRequired,
  }).isRequired,
  signupErrMessage: PropTypes.string.isRequired,
  checkSignup: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.loading,
    validateRes: state.validateSignUp,
    user: state.signUpFormInput,
    checkSignup: state.signupSuccess,
    signupErrMessage: state.signupErrMessage,
  };
}


export default connect(
  mapStateToProps,
  {
    submitSignup,
    signUpFormInput,
    signupSuccessMessage,
  },
  )(SignUpPage);
