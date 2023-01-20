import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals, getCartItems } from '../features/cart/cartSlice';
import { openModal } from '../features/modal/modalSlice';
import CartItem from './CartItem';

const CartContainer = () => {
	const dispatch = useDispatch();

	const { isLoading, cartItems, total, amount } = useSelector((store) => store.cart);

	useEffect(() => {
		dispatch(getCartItems('test'));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dispatch(calculateTotals());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cartItems]);

	if (isLoading) {
		return (
			<div className="loading">
				<h1>Loading...</h1>
			</div>
		);
	}

	if (amount < 1) {
		return (
			<section className="cart">
				<header>
					<h2>your bag</h2>
					<h4 className="empty-cart">is currently empty</h4>
				</header>
			</section>
		);
	}

	return (
		<section className="cart">
			<header>
				<h2>your bag</h2>
			</header>
			<div>
				{cartItems.map((item) => {
					return <CartItem key={item.id} {...item} />;
				})}
			</div>
			<footer>
				<hr />
				<div className="cart-total">
					<h4>
						total <span>${total.toFixed(2)}</span>
					</h4>
				</div>
				<button className="btn clear-btn" onClick={() => dispatch(openModal())}>
					clear cart
				</button>
			</footer>
		</section>
	);
};
export default CartContainer;
