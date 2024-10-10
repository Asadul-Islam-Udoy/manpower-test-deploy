import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import StartIcon from "@mui/icons-material/Start";
import { toast } from "react-toastify";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useDispatch, useSelector } from "react-redux";
import {
  forgetPasswordAction,
  forgetPasswordConfirmAction,
  loginAction,
  refreshAuthAction,
} from "../../action/auth_admin/AdminAction";
function AdminLogin() {
  const navigate = useNavigate();
  const[buttonDisabled,setButtonDisabled] = useState(false);
  const [forgetPasswordOtpShow, setForgetPasswordOtpShow] = useState(false);
  const [forgetOtp, setForgetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfrimNewPassword] = useState("");
  const [forgetPhone, setForgetPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isForgetShow, setIsFrogetShow] = useState(false);
  const [password, setPassword] = useState("");
  const { lodding, error, isLogin, isForgetPassword, isForgetPasswordConfirm ,userInfo} =
    useSelector((state) => state.loginState);
  const dispatch = useDispatch();

  //login section handler
  const loginHandler = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const myFrom = new FormData();
    myFrom.set("email", email);
    myFrom.set("password", password);
    dispatch(loginAction(myFrom));
  };

  ///reset password send otp user phone handler
  const forgetHandler = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    dispatch(forgetPasswordAction(forgetPhone));
  };

  ///reset password confirm handler
  const forgetPasswordOtpHandler = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (newPassword !== confirmNewPassword) {
      return toast.warn("user confirm password is not match!");
    }
    const myFrom = new FormData();
    myFrom.set("otp", forgetOtp);
    myFrom.set("newPassword", newPassword);
    myFrom.set("confirmPassword", confirmNewPassword);
    dispatch(forgetPasswordConfirmAction(myFrom));
  };


  useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled(false);
    }
    if (isLogin) {
      toast.success("user login successfully!");
      if(userInfo?.user.userType === 'admin'){
        navigate('/dashboard')
        setButtonDisabled(false);
      }
      else{
        setButtonDisabled(false);
        navigate('/')
      }
    }
    if (isForgetPassword) {
      toast.success("send otp your phone!");
      setForgetPasswordOtpShow(true);
      setButtonDisabled(false);
    }
    if (isForgetPasswordConfirm) {
      toast.success("user password reset successfully");
      setForgetPasswordOtpShow(false);
      setIsFrogetShow(false);
      navigate("/login");
      setButtonDisabled(false);
    }
    dispatch(refreshAuthAction());
  }, [
    dispatch,
    toast,
    error,
    isLogin,
    isForgetPassword,
    isForgetPasswordConfirm,
  ]);
  return (
    <>
      <div className="container__user__login__register">
        <div className="screen__user__login__register">
          <div className="screen__content">
            <div className="login__register__header__title">
              {" "}
              <h1  className="uppercase text-center  text-3xl  md:text-5xl font-bold   text-gray-300 tracking-tight">RADISSON DIGITAL TECHNOLOGIES LTD.</h1>
            </div>
            {/* OTP FROM */}
            {forgetPasswordOtpShow ? (
              <>
                <form
                  className="login__register"
                  onSubmit={forgetPasswordOtpHandler}
                >
                  <div className="login__register__field">
                    <i className="login__icon fas fa-user  "></i>
                    <input
                      type="text"
                      className="login__input  "
                      placeholder="Enter Your Otp ... "
                      value={forgetOtp}
                      onChange={(e) => setForgetOtp(e.target.value)}
                      required

                    />
                  </div>
                  <div className="login__register__field">
                    <i className="login__icon fas fa-user"></i>
                    <input
                      type="password"
                      className="login__input"
                      placeholder="Enter Password ... "
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="login__register__field">
                    <i className="login__icon fas fa-user"></i>
                    <input
                      type="password"
                      className="login__input"
                      placeholder="Enter Confrim Password ... "
                      value={confirmNewPassword}
                      onChange={(e) => setConfrimNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button disabled={buttonDisabled} className="button login__submit">
                    <span className="button__text">Submit</span>
                    <i className="button__icon fas fa-chevron-right"></i>
                  </button>
                </form>
              </>
            ) : (
              <>
                {isForgetShow ? (
                  // FORGET PASSWORD FORM
                  <form className="login__register" onSubmit={forgetHandler}>
                    <div className="login__register__field">
                      <i className="login__icon fas fa-user"></i>
                      <input
                        type="text"
                        className="login__input"
                        placeholder="Enter Your Phone ... "
                        value={forgetPhone}
                        onChange={(e) => setForgetPhone(e.target.value)}
                        required
                      />
                    </div>
                    <button disabled={buttonDisabled} className="button login__submit">
                      <span className="button__text">Submit</span>
                      <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                  </form>
                ) : (
                  // LOGIN FROM
                  <form className="login__register" onSubmit={loginHandler}>
                    <div className="login__register__field">
                      <i className="login__icon fas fa-user"></i>
                      <input
                        type="email"
                        className="login__input"
                        placeholder="Email ... "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="login__field">
                      <i className="login__icon fas fa-lock"></i>
                      <input
                        type="password"
                        className="login__input"
                        placeholder="Password ..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button disabled={buttonDisabled} className="button login__submit">
                      <span className="button__text">Log In Now</span>
                      <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                  </form>
         
                )}
              </>
            )}
            <div style={{ margin: "10px" }}>
              {isForgetShow !== true && (
                <div onClick={() => [setIsFrogetShow((pre) => !pre),setForgetPasswordOtpShow(false)]}>
                  <Link
                    style={{
                      display: "flex",
                      color: "black",
                      fontStyle: "italic",
                    }}
                  >
                    <VpnKeyIcon className="forget__icon" />
                    forget password
                  </Link>
                </div>
              )}
              {isForgetShow === true ? (
                <div onClick={() => [setIsFrogetShow((pre) => !pre),setForgetPasswordOtpShow(false)]}>
                  <p
                    style={{
                      display: "flex",
                      color: "rgb(187 193 197)",
                      fontStyle: "italic",
                      alignItems:'center',
                  
                    }}
                  >
                    <StartIcon
                      style={{ fontSize: "17px", color: "rgb(187 193 197)" }}
                    />
                    user login page ?{" "}
                    <Link style={{ color: "black", fontStyle: "italic" }}>
                      sign-in
                    </Link>
                  </p>
                  {/* resend otp */}
                  <p
                    style={{
                      display: "flex",
                      color: "rgb(187 193 197)",
                      fontStyle: "italic",
                      alignItems:'center',
                      marginLeft:'100px'
                    }}
                    onClick={()=>[setIsFrogetShow((pre)=>!pre),setForgetPasswordOtpShow(false)]}
                  >
                    <AutorenewIcon
                     style={{ fontSize: "17px", color: "rgb(187 193 197)"}}
                    />
                    <Link style={{ color: "gold", fontStyle: "italic",fontSize:'15PX' }}>
                      resend-otp
                    </Link>
                  </p>
                </div>
              ) : (
                <div>
                  <p
                    style={{
                      display: "flex",
                      color: "rgb(187 193 197)",
                      fontStyle: "italic",
                    }}
                  >
                    <StartIcon
                      style={{ fontSize: "17px", color: "rgb(187 193 197)" }}
                    />
                    user login page ?{" "}
                    <Link
                      to="/register"
                      style={{ color: "black", fontStyle: "italic" }}
                    >
                      sign-up
                    </Link>
                  </p>
                 
                </div>
              )}
            </div>
            <div className="social-login">
            <h3>social media page</h3>
              <div className="social-icons">
                <Link to="#" className="social-login__icon fab fa-instagram">
                  <img src="https://img.freepik.com/premium-vector/letter-f-icon-social-media-icon-facebook-icon_153454-590.jpg?size=626&ext=jpg&ga=GA1.1.1933048021.1718790888&semt=ais_userf"/>
                </Link>
                <Link to="#" className="social-login__icon fab fa-facebook">
                   <img src="https://static.vecteezy.com/system/resources/previews/029/284/964/original/google-logo-on-transparent-background-popular-search-engine-google-logotype-symbol-icon-google-sign-stock-free-vector.jpg"/>
                </Link>
                <Link to="#" className="social-login__icon fab fa-twitter">
                   <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png"/>
                </Link>
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
