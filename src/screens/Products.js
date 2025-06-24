import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/connection';
import styles from './Products.module.css';

const Products = () => {
  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productUnit, setProductUnit] = useState('');
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
 
  const productsCollection = collection(db, 'products');
  const brandsCollection = collection(db, 'brands');
 
  useEffect(() => {
    // Carrega produtos
    const qProducts = query(productsCollection, orderBy('createdAt', 'desc'));
    const unsubscribeProducts = onSnapshot(qProducts, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(list);
    });
    
    // Carrega marcas para o select
    const qBrands = query(brandsCollection, orderBy('name'));
    const unsubscribeBrands = onSnapshot(qBrands, (snapshot) => {
      const brandsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBrands(brandsList);
    });
 
    return () => {
      unsubscribeProducts();
      unsubscribeBrands();
    };
  }, []);
 
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (productName.trim() === '' || productBrand.trim() === '' || productPrice.trim() === '' || productUnit.trim() === '') {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }
 
    // Validação do preço
    if (isNaN(parseFloat(productPrice)) || parseFloat(productPrice) <= 0) {
      setMessage('Por favor, insira um preço válido.');
      return;
    }
 
    setLoading(true);
 
    try {
      const price = parseFloat(productPrice);
      
      if (editId) {
        const productRef = doc(db, 'products', editId);
        await updateDoc(productRef, { 
          name: productName,
          brand: productBrand,
          price: price,
          unit: productUnit
        });
        setMessage('Produto atualizado com sucesso!');
        setEditId(null);
      } else {
        await addDoc(productsCollection, {
          name: productName,
          brand: productBrand,
          price: price,
          unit: productUnit,
          createdAt: Timestamp.now(),
        });
        setMessage('Produto cadastrado com sucesso!');
      }
 
      // Limpa o formulário
      setProductName('');
      setProductBrand('');
      setProductPrice('');
      setProductUnit('');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setMessage('Erro ao salvar o produto.');
    } finally {
      setLoading(false);
    }
  };
 
  const handleEdit = (product) => {
    setProductName(product.name);
    setProductBrand(product.brand);
    setProductPrice(product.price.toString());
    setProductUnit(product.unit);
    setEditId(product.id);
    setMessage('');
  };
 
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este produto?');
    if (!confirmDelete) return;
 
    try {
      const productRef = doc(db, 'products', id);
      await deleteDoc(productRef);
      setMessage('Produto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setMessage('Erro ao excluir o produto.');
    }
  };
 
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.brand.toLowerCase().includes(search.toLowerCase())
  );
 
  return (
    <div className={styles.formWrapper}>
      <h2><center>{editId ? 'Editar Produto' : 'Cadastrar Produto'}</center></h2>
 
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nome do Produto:
          <input
            type="text"
            placeholder="Digite o nome do produto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        
        <label>
          Marca:
          <select
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
          >
            <option value="">Selecione uma marca</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>
        
        <label>
          Preço (R$):
          <input
            type="number"
            placeholder="Digite o preço"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            min="0.01"
            step="0.01"
          />
        </label>
        
        <label>
          Unidade:
          <input
            type="text"
            placeholder="Ex: kg, un, litro"
            value={productUnit}
            onChange={(e) => setProductUnit(e.target.value)}
          />
        </label>
        
        <button type="submit" className={styles.btn} disabled={loading}>
          {editId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>
 
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />
 
      {message && <p className={message.includes('Erro') ? styles.errorMessage : styles.successMessage}>{message}</p>}
 
      <h3>Produtos Cadastrados:</h3>
      <ul className={styles.list}>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <span>
              <strong>{product.name}</strong> - {product.brand}<br />
              Preço: R$ {product.price.toFixed(2)} / {product.unit}
              {product.createdAt && (
                <small style={{ display: 'block', color: '#666' }}>
                  Cadastrado em: {product.createdAt.toDate().toLocaleDateString()}
                </small>
              )}
            </span>
            <div>
              <button onClick={() => handleEdit(product)} className={styles.btnEdit}>Editar</button>
              <button onClick={() => handleDelete(product.id)} className={styles.btnDelete}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;