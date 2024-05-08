/**
    * @description      : 
    * @author           : Mário Jorge Ribeiro
    * @group            : 
    * @created          : 08/05/2024 - 11:53:34
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 08/05/2024
    * - Author          : Mário Jorge Ribeiro
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:8080');

function App() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		socket.on('products', (data) => {
			console.log('data:', data);
			setProducts(data);
		});
		// return () => socket.disconnect();
	});

	return (
		<div>
			<h1>Lista de Produtos:</h1>
			<ul>
				{products.map(product => (
					<li key={product.id} className='product' onClick={() => alert(`${product.name} - R$${product.price}`)}>
						<div className='product-wrap'>
							<div className='title-wrap'>{product.name}</div>
							<div className='price-wrap'>{`R$${parseFloat(product.price).toFixed(2)}`}</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
