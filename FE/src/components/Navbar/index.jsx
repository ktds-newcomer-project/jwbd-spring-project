import { Link, Navigate } from "react-router-dom"
import { useState } from "react"
import { useStore } from "../../states.js"
import { useNavigate } from "react-router-dom"
import './style.css'
import ktds from '../../assets/ktds.png'
import ProfilePic from '../../assets/profile.png'


const Navbar = () => {
  const { setUserToken, userToken } = useStore();
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  const onClickLogout = () => {
    setUserToken('')
    localStorage.clear()
    navigate('/')
  }
  const [dropDown, setDropDown] = useState(false);
//   const [userPic, setUserPic] = useState('')

  const toggleHandler = () => {
    setDropDown(!dropDown);
  }


  


  

  return (
    <nav className="navbar-body">
      <Link className="home" to="/home">
        <img src={ktds} alt="logo" className="logo" />
      </Link>

      <div className="navbar_dropdown">
        <div className="navbar-profile-image">
          <img src={ProfilePic} onClick={toggleHandler} alt="profilepic" className="profile-pic"/>
        </div>
        
        { (dropDown) ? 
          <div className="navbar_dropdown_content">
            <div className="navbar_dropdown_content_element">
              <div className="navbar_myprofile">
                <button className="navbar_dropdown_button">프로필</button>
              </div>
            </div>

            <div className="navbar_dropdown_content_element">
              <div className="navbar-change-info">
                <button className="navbar_dropdown_button" >정보수정</button>
              </div>
            </div>

            <div className="navbar_dropdown_content_element">
              <div className="navbar_logout">
                <button className="navbar_dropdown_button" onClick={onClickLogout}>로그아웃</button>
              </div>   
            </div>
            
          </div>
          :
          <></>
        }

      </div>
    </nav>

  )
}
export default Navbar;