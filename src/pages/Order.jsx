import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { menuItems, menuCategories } from '../data/menuData';
import { ShoppingBag, Plus, Minus, CheckCircle, ArrowLeft, Utensils } from 'lucide-react';
import './Order.css';

const Order = () => {
  const [searchParams] = useSearchParams();
  const tableParam = searchParams.get('table') || '07';

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [cart, setCart] = useState([]);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  const filteredItems = activeCategory === 'ALL'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  const getItemQuantity = (id) => {
    const item = cart.find(c => c.id === id);
    return item ? item.quantity : 0;
  };

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(c => c.id === id ? { ...c, quantity: c.quantity - 1 } : c);
      } else {
        return prev.filter(c => c.id !== id);
      }
    });
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.numericPrice * item.quantity), 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000),
      table: tableParam,
      items: cart,
      total: totalAmount,
      status: 'PENDING',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString()
    };

    // Save order into localStorage for live admin sync
    const existingOrders = JSON.parse(localStorage.getItem('fourchairs_orders') || '[]');
    localStorage.setItem('fourchairs_orders', JSON.stringify([newOrder, ...existingOrders]));

    setLastOrderDetails(newOrder);
    setOrderSubmitted(true);
    setCart([]);
  };

  return (
    <div className="order-page-wrapper">
      {/* Table Header */}
      <header className="order-header">
        <div className="order-header-container">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} /> Public Showcase
          </Link>
          
          <div className="table-badge">
            <Utensils size={14} />
            <span>TABLE {tableParam.padStart(2, '0')}</span>
          </div>

          <Link to="/admin" className="admin-quick-tag">
            Staff View
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="order-main container">
        {orderSubmitted ? (
          <div className="order-success-card animate-fade-in">
            <CheckCircle size={56} className="success-icon" />
            <span className="order-num-badge">ORDER #{lastOrderDetails?.id}</span>
            <h2 className="success-title">Order Sent to Kitchen</h2>
            <p className="success-desc">
              Your order for <strong>Table {tableParam}</strong> has been transmitted directly to the Four Chairs kitchen team.
            </p>

            <div className="order-summary-box">
              <h4>Order Summary</h4>
              <ul>
                {lastOrderDetails?.items.map((item) => (
                  <li key={item.id}>
                    <span>{item.quantity}x {item.name}</span>
                    <span>₹{item.numericPrice * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="summary-total">
                <span>Total Amount:</span>
                <span>₹{lastOrderDetails?.total}</span>
              </div>
            </div>

            <div className="order-status-pill">
              <span>Status:</span>
              <strong className="status-pending">PENDING KITCHEN ACCEPTANCE</strong>
            </div>

            <button
              className="btn btn-primary margin-top-20"
              onClick={() => setOrderSubmitted(false)}
            >
              ORDER MORE ITEMS
            </button>
          </div>
        ) : (
          <>
            {/* Category Navigation */}
            <div className="order-cat-bar">
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`order-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Menu List */}
            <div className="order-items-grid">
              {filteredItems.map((item) => {
                const qty = getItemQuantity(item.id);
                return (
                  <div key={item.id} className="order-item-card">
                    <div className="order-item-img-wrapper">
                      <img src={item.image} alt={item.name} className="img-cover" />
                    </div>

                    <div className="order-item-details">
                      <div className="order-item-top">
                        <h3 className="order-item-name">{item.name}</h3>
                        <span className="order-item-price">{item.price}</span>
                      </div>
                      <p className="order-item-desc">{item.description}</p>

                      <div className="order-item-actions">
                        {qty === 0 ? (
                          <button
                            className="btn-add-item"
                            onClick={() => addToCart(item)}
                          >
                            <Plus size={14} /> Add to Order
                          </button>
                        ) : (
                          <div className="qty-controls">
                            <button onClick={() => removeFromCart(item.id)} className="qty-btn">
                              <Minus size={14} />
                            </button>
                            <span className="qty-val">{qty}</span>
                            <button onClick={() => addToCart(item)} className="qty-btn">
                              <Plus size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky Bottom Cart Bar */}
            {totalItemsCount > 0 && (
              <div className="cart-sticky-bar animate-fade-in">
                <div className="cart-summary-text">
                  <div className="cart-count-badge">
                    <ShoppingBag size={16} />
                    <span>{totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}</span>
                  </div>
                  <span className="cart-total-price">Total: ₹{totalAmount}</span>
                </div>

                <button className="btn btn-accent btn-place-order" onClick={handlePlaceOrder}>
                  SEND ORDER TO KITCHEN →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Order;
