import { Link, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useStore } from "../../states.js"
import { useNavigate } from "react-router-dom"
import './style.css'
import ktds from '../../assets/ktds.png'


const Navbar = () => {
  const { setUserToken, userToken } = useStore();
  const [authorized, setAuthorized] = useState(false);
  const onClickLogout = () => {
    setUserToken('')
    localStorage.removeItem('isLogin')
    Navigate('/')
  }
//   const [dropDown, setDropDown] = useState(false);
//   const [userPic, setUserPic] = useState('')
//   const navigate = useNavigate();

//   const toggleHandler = () => {
//     setDropDown(!dropDown);
//   }


  

//   const goProfile = () => {
//     navigate("/profile", {state : { username : ""}});
//     setDropDown(!dropDown);
//   }

//   const goChangeInfo = () => {
//     navigate("/changeinfo");
//     setDropDown(!dropDown);
//   }

  

  return (
    <nav className="navbar-body">
      <Link className="home" to="/home">
        <img src={ktds} alt="logo" className="logo" />
      </Link>

      <div className="navbar_dropdown">
        {authorized ?
          <div className="navbar-profile-image">
            {/* { (userPic === "None")  ?
              <>
                <img src={Default} alt="defaultPic" onClick={toggleHandler} className="person-image" />
              </>
              :
              <>
                <img src={userPic} alt="userPic" onClick={toggleHandler} className="person-image" />
              </>
            } */}
          </div>
          :
          <Link className="login" to="/">
            <p className="login-text" onClick={onClickLogout} >로그아웃</p>
          </Link>
        }

        {/* {dropDown ? 
          <div className="navbar_dropdown_content">
            <div className="navbar_dropdown_content_element">
              <div className="navbar_myprofile">
                <button className="navbar_dropdown_button" onClick={goProfile}>프로필</button>
              </div>
            </div>

            <div className="navbar_dropdown_content_element">
              <div className="navbar-change-info">
                <button className="navbar_dropdown_button" onClick={goChangeInfo}>정보수정</button>
              </div>
            </div>

            <div className="navbar_dropdown_content_element">
              <div className="navbar_logout">
                <button className="navbar_dropdown_button" onClick={signOut}>로그아웃</button>
              </div>   
            </div>
            
          </div>
          :
          <></>
        } */}

      </div>
    </nav>

  )
}
export default Navbar;