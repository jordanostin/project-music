import {Nav} from "../nav/Nav";
import logo from "../../public/images/logo.png"

export const Header = () => {

    return(
      <header>
          <img src={logo} alt=""/>
          <Nav/>
      </header>
    )
}