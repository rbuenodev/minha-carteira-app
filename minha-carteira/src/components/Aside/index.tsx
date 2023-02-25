import React, { useState } from "react";
import {
  Container,
  Header,
  LogoImg,
  MenuContainer,
  MenuItemLink,
  Title,
  MenuItemButton,
  ToggleMenu,
  ThemeToggleFooter,
} from "./styles";
import logoImg from "../../assets/logo.svg";
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
  MdClose,
  MdMenu,
  MdAccountBalanceWallet,
} from "react-icons/md";

import { useAuth } from "../../hooks/auth";
import { useTheme } from "../../hooks/theme";
import Toggle from "../Toggle";
import { useNavigate } from "react-router-dom";

const Aside: React.FC = () => {
  const { signOut } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();

  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );
  const [toggleIsMenuOpened, setToggleIsMenuOpened] = useState(false);

  const handleToggleMenu = () => {
    setToggleIsMenuOpened(!toggleIsMenuOpened);
  };

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <Container isMenuOpen={toggleIsMenuOpened}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>
          {toggleIsMenuOpened ? <MdClose /> : <MdMenu />}
        </ToggleMenu>
        <LogoImg src={logoImg} alt="Logo"></LogoImg>
        <Title> Carteira </Title>
      </Header>
      <MenuContainer>
        <MenuItemLink href="/">
          <MdDashboard />
          Dashboard
        </MenuItemLink>
      </MenuContainer>
      <MenuContainer>
        <MenuItemLink href="/edit/0">
          <MdAccountBalanceWallet />
          Novo registro
        </MenuItemLink>
      </MenuContainer>
      <MenuContainer>
        <MenuItemLink href="/list/entry-balance">
          <MdArrowUpward />
          Entradas
        </MenuItemLink>
      </MenuContainer>
      <MenuContainer>
        <MenuItemLink href="/list/exit-balance">
          <MdArrowDownward />
          Saidas
        </MenuItemLink>
      </MenuContainer>
      <MenuContainer>
        <MenuItemButton onClick={handleSignOut}>
          <MdExitToApp />
          Sair
        </MenuItemButton>
      </MenuContainer>
      <ThemeToggleFooter isMenuOpen={toggleIsMenuOpened}>
        <Toggle
          checked={darkTheme}
          labelLeft="Light"
          labelRight="Dark"
          onChange={handleChangeTheme}
        />
      </ThemeToggleFooter>
    </Container>
  );
};

export default Aside;
