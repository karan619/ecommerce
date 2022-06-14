import React, { useEffect } from "react";
import { Badge } from "@material-ui/core";
//import "../style/NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { logOut } from "../redux/userRedux";
import { clearCart } from "../redux/cartRedux";
import styled from "styled-components";
import { mobile } from "../responsive";
import { getTotal } from "../redux/cartRedux";

const NavBar = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const signOut = () => {
    dispatch(logOut(user));
    dispatch(clearCart(cart));
    console.log("working");
  };
  //console.log("cart", cart);
  const Container = styled.div`
    background-color: #fbf0f4;
    padding: 10px;
    z-index: 100;
    ${mobile({ display: "flex", justifyContent: "center" })}
  `;

  const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({ padding: "10px 0px" })}
  `;

  const Left = styled.div`
    flex: 1;
    display: flex;
    padding-left: 40px;
    align-items: center;
    text-align: center;
  `;

  const Center = styled.div`
    flex: 1;
  `;

  const Logo = styled.h1`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    ${mobile({ fontSize: "24px" })}
  `;
  const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 700;
    color: #000000;
    transition: 1s;
    padding: 30px;
    ${mobile({ justifyContent: "center" })}
  `;

  const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  `;
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to={"/"}>
            <Logo>SHOPY.</Logo>
          </Link>
        </Left>
        <Center></Center>

        <Right>
          {user ? (
            <p>Welcome {user.result.username}</p>
          ) : (
            <Link style={{ textDecoration: "none" }} to="/register">
              <MenuItem>REGISTER</MenuItem>
            </Link>
          )}

          {user ? (
            <Link style={{ textDecoration: "none" }} to="/" onClick={signOut}>
              <MenuItem>SIGN OUT</MenuItem>
            </Link>
          ) : (
            <Link style={{ textDecoration: "none" }} to="/login">
              <MenuItem>SIGN IN</MenuItem>
            </Link>
          )}

          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={cart.cartTotalQuantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
