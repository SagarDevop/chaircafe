import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { menuItems, menuCategories } from '../data/menuData';
import { ShoppingBag, Plus, Minus, CheckCircle, ArrowLeft, Utensils, Search, Sparkles } from 'lucide-react';
import './Order.css';

const Order = () => {
  const [searchParams] = useSearchParams();
  const rawTable = searchParams.get('table') || '01';
  const tableParam = rawTable.replace(/[^0-9a-zA-Z]/g, '') || '01';

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  const filteredItems = menuItems.filter(item => {
    const matchesCat = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
      const existing = prev.find(c => c.id === item.id);
      if (existing && existing.quantity > 1) {
        return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity - 1 } : c);
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

    // Save order into localStorage for live staff admin sync
    const existingOrders = JSON.parse(localStorage.getItem('fourchairs_orders') || '[]');
    localStorage.setItem('fourchairs_orders', JSON.stringify([newOrder, ...existingOrders]));

    setLastOrderDetails(newOrder);
    setOrderSubmitted(true);
    setCart([]);
  };

  return (
    <div className="mobile-order-screen">
      <div className="mobile-order-container">
        {/* Table Top Sticky Bar */}
        <header className="mobile-order-header">
          <div className="mobile-order-header-content">
            <Link to="/" className="mobile-back-btn" title="Return to Four Chairs Home">
              <ArrowLeft size={20} />
            </Link>

            <div className="mobile-table-tag">
              <Utensils size={14} />
              <span>TABLE {tableParam.toString().padStart(2, '0')}</span>
            </div>

            <div className="header-spacer"></div>
          </div>
        </header>

        {/* Main Content View */}
        <main className="mobile-order-body">
          {orderSubmitted ? (
            <div className="mobile-success-view animate-fade-in">
              <CheckCircle size={54} className="mobile-success-icon" />
              <span className="order-badge">ORDER #{lastOrderDetails?.id}</span>
              <h2 className="mobile-success-title">Order Received!</h2>
              <p className="mobile-success-text">
                Your order for <strong>Table {tableParam}</strong> has been transmitted directly to the Four Chairs bar &amp; kitchen team.
              </p>

              <div className="order-receipt-card">
                <h4>Receipt Summary</h4>
                <ul>
                  {lastOrderDetails?.items.map((item) => (
                    <li key={item.id}>
                      <span>{item.quantity}x {item.name}</span>
                      <strong>₹{item.numericPrice * item.quantity}</strong>
                    </li>
                  ))}
                </ul>
                <div className="receipt-total">
                  <span>Total Bill Amount:</span>
                  <strong>₹{lastOrderDetails?.total}</strong>
                </div>
              </div>

              <div className="status-live-pill">
                <Sparkles size={16} className="sparkle-icon" />
                <span>Kitchen Status: <strong>PENDING ACCEPTANCE</strong></span>
              </div>

              <button
                className="btn btn-primary full-width margin-top-20"
                onClick={() => setOrderSubmitted(false)}
              >
                ADD MORE ITEMS
              </button>
            </div>
          ) : (
            <>
              {/* Search Bar */}
              <div className="mobile-search-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search coffee, juices, sourdough toasts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filter Pills */}
              <div className="mobile-category-bar">
                {menuCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`mobile-cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Items Cards */}
              <div className="mobile-menu-list">
                {filteredItems.length === 0 ? (
                  <div className="mobile-empty-search">
                    <p>No menu items match "{searchQuery}"</p>
                  </div>
                ) : (
                  filteredItems.map((item) => {
                    const qty = getItemQuantity(item.id);
                    return (
                      <div key={item.id} className="mobile-item-card">
                        <div className="mobile-item-thumb">
                          <img src={item.image} alt={item.name} className="img-cover" />
                        </div>

                        <div className="mobile-item-info">
                          <div className="mobile-item-top">
                            <h3 className="mobile-item-title">{item.name}</h3>
                            <span className="mobile-item-price">{item.price}</span>
                          </div>
                          <p className="mobile-item-desc">{item.description}</p>

                          <div className="mobile-item-footer">
                            {qty === 0 ? (
                              <button
                                className="btn-add-touch"
                                onClick={() => addToCart(item)}
                              >
                                <Plus size={14} /> Add
                              </button>
                            ) : (
                              <div className="mobile-qty-stepper">
                                <button onClick={() => removeFromCart(item.id)} className="stepper-btn">
                                  <Minus size={14} />
                                </button>
                                <span className="stepper-val">{qty}</span>
                                <button onClick={() => addToCart(item)} className="stepper-btn">
                                  <Plus size={14} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Sticky Mobile Cart Bar */}
              {totalItemsCount > 0 && (
                <div className="mobile-sticky-cart animate-fade-in">
                  <div className="mobile-cart-left">
                    <div className="cart-icon-wrapper">
                      <ShoppingBag size={18} />
                      <span className="cart-badge-num">{totalItemsCount}</span>
                    </div>
                    <span className="cart-price-sum">₹{totalAmount}</span>
                  </div>

                  <button className="mobile-send-order-btn" onClick={handlePlaceOrder}>
                    SEND ORDER →
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Order;
