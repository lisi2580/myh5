import React, { PropTypes } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
// import CircularProgress from 'material-ui/CircularProgress';

import CircularProgressBg from '../components/CircularProgressBg.jsx';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';
import TopBar from '../components/TopBar.jsx';

// import '../style/LoginPage.less';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // **localStorage 中是否存储着注册成功的消息
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // **组件初始 state
    this.state = {
      loginSuccess: false,
      // errors: {},
      // **来自注册成功的消息
      successMessage,
      user: {
        email: '',
        password: '',
      },
      // **表单检查结果
      validateResult: {
        email: '',
        password: '',
        errorMessage: '',
      },
      wait: false,
    };

    // **事件绑定
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.validateLoginForm = this.validateLoginForm.bind(this);
  }

  validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
      isFormValid = false;
      errors.email = '请输入 email';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
      isFormValid = false;
      errors.password = '请输入 password';
    }

    if (!isFormValid) {
      errors.message = '表单填写不合法，请修改';
    }

    return {
      errors,
      isFormValid,
    };
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);

    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const validateRes = this.validateLoginForm({ email, password });

    if (validateRes.isFormValid) {
      const formData = `email=${email}&password=${password}`;
      this.xhrProcessForm(formData);
    } else {
      this.setState({
        validateResult: {
          email: validateRes.errors.email,
          password: validateRes.errors.password,
          errorMessage: validateRes.errors.message,
        },
      });
    }
  }

  xhrProcessForm(formData) {
    this.setState({
      wait: true,
    });

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      // console.log('hahhah');
      const resMessage = $.parseJSON(JSON.stringify(xhr.response));
      console.log(resMessage);

      this.setState({
        wait: false,
      });

      if (xhr.status !== 200 || !resMessage.success) {
        return this.setState({
          validateResult: {
            errorMessage: resMessage.message,
          },
        });
      }

      // if (xhr.status === 200) {
        // **success
      Auth.authenticateUser(resMessage.token);
      return this.setState({
        loginSuccess: true,
      });
        // console.log('The form is valid');
        // this.setState({
        //   errors: {},
        //   loginSuccess: Auth.isUserAuthenticated(),
        // });
        // 保存 token
      // }
    });
    xhr.send(formData);
  }

  // 存储用户输入值
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  render() {
    // 如果在xhr提交过程中，出现circular progress
    if (this.state.wait) {
      return (
        <div>
          <TopBar />
          <CircularProgressBg />
          <LoginForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            successMessage={this.state.successMessage}
            validateResult={this.state.validateResult}
            user={this.state.user}
          />
        </div>

      );
    }

    if (this.state.loginSuccess) return (<Redirect to="/" />);

    return (
      <div>
        <TopBar />
        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          successMessage={this.state.successMessage}
          validateResult={this.state.validateResult}
          user={this.state.user}
        />
      </div>
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default LoginPage;
