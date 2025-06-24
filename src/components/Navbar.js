import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color } from "../utils/Color";
import { IconLogo } from "../assets/Assets";
import { IconButton, Text } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    let confirmBox = window.confirm("Logout now?");
    if (confirmBox) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <Box>
      <Navcontainer>
        <div>
          <Link to={`/`}>
            <img width={30} height={25.5} src={IconLogo} alt="logo" />
          </Link>
          <Text fontSize={"xl"} color={color.text}>
            Denote
          </Text>
        </div>

        <IconButton
          aria-label="Search database"
          onClick={logOut}
          bg={color.btn}
        >
          <LuLogOut />
        </IconButton>
      </Navcontainer>
    </Box>
  );
};

export default Navbar;

const Box = styled.div`
  background: ${color.nav};
  position: sticky;
  z-index: 100;
  top: 0;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

const Navcontainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 768px;
  margin: 0 auto;
  min-height: 10vh;

  div {
    display: flex;
    align-items: center;
    img {
      margin-right: 1rem;
    }
  }

  img {
    cursor: pointer;
  }

  .link {
    color: #b6b6b6;
    padding: 0.8rem 1rem;
    transition: 0.3s;

    &:hover {
      color: #fff;
    }

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }

  .active {
    color: #fff;
    font-weight: 500;
  }

  .cta {
    font-weight: 600;
    border-radius: 0.3rem;
    padding: 0.8rem 1rem;
    color: #000000;
    background: #fff;
  }
`;
