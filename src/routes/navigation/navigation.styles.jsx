import styled from 'styled-components';
import { Link } from 'react-router';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  text-transform: uppercase;
  cursor: pointer;
    
  &[data-tooltip]:hover::after {
      display: block;
      position: absolute;
      content: attr(data-tooltip);
      border: 1px solid black;
      background: #eee;
      padding: .25em;
  }
`;
