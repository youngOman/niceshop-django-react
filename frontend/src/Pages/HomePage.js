import React, { useEffect } from "react";
// import axios from 'axios';
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
// Component
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomePage = () => {
	// const [products,setProducts] = useState([])
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList); // 從store.js的 reducer pull出來
	const { error, loading, products, page, pages } = productList; // 並進行解構

	let keyword = useLocation().search;
	// console.log(keyword);

	useEffect(() => {
		dispatch(listProducts(keyword));
		// // console.log('useEffect有作用啦');
		// async function fetchProducts(){
		//   const {data} = await axios.get("api/products/");
		//   setProducts(data);
		//   // console.log({data});
		// }
		// fetchProducts();
	}, [dispatch, keyword]);

	return (
		<div>
			{/* 有 keyword 就「不」顯示 ProductCarousel */}
			{!keyword && <ProductCarousel />}
			
			<div className="products-section">
				<h1 className="products-title">最新產品(2025更新)</h1>
				{loading ? (
					<div className="text-center my-5">
						<Loader />
					</div>
				) : error ? (
					<div className="text-center my-5">
						<Message variant='danger'>{error}</Message>
					</div>
				) : (
					<>
						<Row className="products-grid">
							{products.map((product) => (
								<Col key={product.id} xs={12} sm={6} md={4} lg={3} className="product-col">
									<Product product={product} />
								</Col>
							))}
						</Row>
						<div className="pagination-container">
							<Paginate pages={pages} page={page} keyword={keyword} isAdmin={false} />
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default HomePage;
