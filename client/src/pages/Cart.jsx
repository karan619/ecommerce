import React, { useEffect, useState } from "react";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../component/Announcemet";
import Footer from "../component/Footer";
import Navbar from "../component/NavBar";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../api/requestMethods";
import { Link, useNavigate } from "react-router-dom";
import {
  removeFromCart,
  decreaseCart,
  addProduct,
  clearCart,
  getTotal,
} from "../redux/cartRedux";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const KEY =
  "pk_test_51IrhLMJS1VrusMGYodM1bFaisbJC8LGbrAMIYJME18U8lThBAawuGnwzk5nP0Zyp4pHw9vk3jPmzF2ztbmcxMLl400EdV4FSDT";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  margin: 20px;
  ${mobile({ padding: "10px" })};
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  margin: 30px;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 30px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  let navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [quantity, setQuantity] = useState("");
  const [stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch();
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });

        navigate("/success", {
          state: {
            stripeData: res.data,
            products: cart,
          },
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const decreaseQuantity = (product) => {
    dispatch(decreaseCart(product));
  };

  const increaseQuantity = (product) => {
    dispatch(addProduct(product));
  };

  const removeItem = (product) => {
    dispatch(removeFromCart(product));
  };

  const clearCartItem = () => {
    dispatch(clearCart());
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to={"/product"}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>{product.desc}</ProductName>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>

                    <Button onClick={() => removeItem(product)}>Remove</Button>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={() => increaseQuantity(product)} />
                    <ProductAmount>{product.cartQuantity}</ProductAmount>
                    <Remove onClick={() => decreaseQuantity(product)} />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.cartQuantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <TopButton type="filled" onClick={() => clearCartItem()}>
              Clear Cart
            </TopButton>
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.cartTotalAmount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.cartTotalAmount}</SummaryItemPrice>
            </SummaryItem>
            {user ? (
              <StripeCheckout
                name="Shopy"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.cartTotalAmount}`}
                amount={cart.cartTotalAmount}
                token={onToken}
                stripeKey={KEY}
              >
                {cart.products.length === 0 ? (
                  <Button disabled>CHECKOUT NOW</Button>
                ) : (
                  <Button>CHECKOUT NOW</Button>
                )}
              </StripeCheckout>
            ) : (
              <p>please sign</p>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
