import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Utensils, CheckCircle2, Clock, AlertCircle, RefreshCw, Printer, Plus, ArrowLeft } from 'lucide-react';
import { menuItems } from '../data/menuData';
import './Admin.css';

const initialSampleOrders = [
  {
    id: 1048,
    table: '07',
    items: [
      { name: 'Prime Wood-Fired Steak', quantity: 1, numericPrice: 680 },
      { name: 'Four Chairs Pour-Over Espresso', quantity: 2, numericPrice: 220 }
    ],
    total: 1120,
    status: 'PREPARING',
    timestamp: '14:22 PM',
    date: '2026-09-28'
  },
  {
    id: 1047,
    table: '03',
    items: [
      { name: 'Truffle & Wild Mushroom Tagliatelle', quantity: 2, numericPrice: 540 },
      { name: 'Sparkling Hibiscus & Berry Tonic', quantity: 2, numericPrice: 260 }
    ],
    total: 1600,
    status: 'ACCEPTED',
    timestamp: '14:10 PM',
    date: '2026-09-28'
  },
  {
    id: 1046,
    table: '05',
    items: [
      { name: 'Avocado & Poached Egg Toast', quantity: 1, numericPrice: 380 },
      { name: 'Velvet Flat White', quantity: 1, numericPrice: 240 }
    ],
    total: 620,
    status: 'COMPLETED',
    timestamp: '13:45 PM',
    date: '2026-09-28'
  }
];

const initialTables = [
  { id: 1, name: 'Table 01', seats: 2, status: 'Active' },
  { id: 2, name: 'Table 02', seats: 2, status: 'Active' },
  { id: 3, name: 'Table 03', seats: 4, status: 'Occupied' },
  { id: 4, name: 'Table 04', seats: 4, status: 'Active' },
  { id: 5, name: 'Table 05', seats: 6, status: 'Active' },
  { id: 6, name: 'Table 06', seats: 4, status: 'Active' },
  { id: 7, name: 'Table 07', seats: 2, status: 'Occupied' },
  { id: 8, name: 'Table 08', seats: 8, status: 'Active' }
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState('ORDERS');
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState(initialTables);
  const [selectedQRTable, setSelectedQRTable] = useState(initialTables[6]);
  const [newTableName, setNewTableName] = useState('');

  // Load orders from localStorage + default samples
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('fourchairs_orders') || '[]');
    if (savedOrders.length > 0) {
      setOrders([...savedOrders, ...initialSampleOrders]);
    } else {
      setOrders(initialSampleOrders);
      localStorage.setItem('fourchairs_orders', JSON.stringify(initialSampleOrders));
    }
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map(ord => ord.id === orderId ? { ...ord, status: newStatus } : ord);
    setOrders(updated);
    localStorage.setItem('fourchairs_orders', JSON.stringify(updated));
  };

  const handleAddTable = (e) => {
    e.preventDefault();
    if (!newTableName) return;
    const newId = tables.length + 1;
    const newT = {
      id: newId,
      name: newTableName,
      seats: 4,
      status: 'Active'
    };
    setTables([...tables, newT]);
    setNewTableName('');
  };

  const statusColors = {
    PENDING: { bg: 'rgba(234, 179, 8, 0.15)', text: '#CA8A04', border: '#EAB308' },
    ACCEPTED: { bg: 'rgba(59, 130, 246, 0.15)', text: '#2563EB', border: '#3B82F6' },
    PREPARING: { bg: 'rgba(147, 51, 234, 0.15)', text: '#7C3AED', border: '#9333EA' },
    READY: { bg: 'rgba(16, 185, 129, 0.15)', text: '#059669', border: '#10B981' },
    COMPLETED: { bg: 'rgba(107, 114, 128, 0.15)', text: '#4B5563', border: '#9CA3AF' }
  };

  return (
    <div className="admin-dashboard-wrapper">
      {/* Top Navbar */}
      <header className="admin-header">
        <div className="admin-header-container">
          <div className="admin-brand">
            <span className="admin-badge">FC STAFF</span>
            <span className="admin-title">Four Chairs Operational Dashboard</span>
          </div>

          <Link to="/" className="admin-home-btn">
            <ArrowLeft size={16} /> Return to Website Showcase
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <div className="admin-container container">
        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'ORDERS' ? 'active' : ''}`}
            onClick={() => setActiveTab('ORDERS')}
          >
            <Utensils size={16} /> LIVE ORDERS ({orders.filter(o => o.status !== 'COMPLETED').length})
          </button>

          <button
            className={`admin-tab ${activeTab === 'TABLES' ? 'active' : ''}`}
            onClick={() => setActiveTab('TABLES')}
          >
            <QrCode size={16} /> TABLES &amp; QR MANAGER
          </button>

          <button
            className={`admin-tab ${activeTab === 'MENU' ? 'active' : ''}`}
            onClick={() => setActiveTab('MENU')}
          >
            <RefreshCw size={16} /> MENU SHOWCASE LIST
          </button>
        </div>

        {/* Tab 1: Live Orders Stream */}
        {activeTab === 'ORDERS' && (
          <div className="admin-orders-panel animate-fade-in">
            <div className="panel-header">
              <h3>Live Dine-In Orders Stream</h3>
              <p>Real-time order pipeline from table QR scans.</p>
            </div>

            <div className="orders-grid">
              {orders.map((order) => {
                const colors = statusColors[order.status] || statusColors.PENDING;
                return (
                  <div key={order.id} className="order-admin-card">
                    <div className="order-admin-header">
                      <div>
                        <span className="order-admin-id">ORDER #{order.id}</span>
                        <span className="order-admin-table">TABLE {order.table}</span>
                      </div>
                      <span className="order-admin-time"><Clock size={12} /> {order.timestamp}</span>
                    </div>

                    <div className="order-admin-body">
                      <ul>
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            <span className="item-qty">{item.quantity}x</span>
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">₹{item.numericPrice * item.quantity}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="order-admin-total">
                        <span>Total Bill Amount:</span>
                        <strong>₹{order.total}</strong>
                      </div>
                    </div>

                    {/* Status Toggle Pipeline */}
                    <div className="order-status-bar" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                      <span className="status-label" style={{ color: colors.text }}>STATUS: {order.status}</span>
                      <div className="status-actions">
                        {order.status === 'PENDING' && (
                          <button className="status-btn btn-accept" onClick={() => updateOrderStatus(order.id, 'ACCEPTED')}>
                            ACCEPT
                          </button>
                        )}
                        {order.status === 'ACCEPTED' && (
                          <button className="status-btn btn-prep" onClick={() => updateOrderStatus(order.id, 'PREPARING')}>
                            START PREPARING
                          </button>
                        )}
                        {order.status === 'PREPARING' && (
                          <button className="status-btn btn-ready" onClick={() => updateOrderStatus(order.id, 'READY')}>
                            MARK READY
                          </button>
                        )}
                        {order.status === 'READY' && (
                          <button className="status-btn btn-complete" onClick={() => updateOrderStatus(order.id, 'COMPLETED')}>
                            SERVE &amp; COMPLETE
                          </button>
                        )}
                        {order.status === 'COMPLETED' && (
                          <span className="status-done-tag"><CheckCircle2 size={14} /> Completed</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Tables & QR Code Generator */}
        {activeTab === 'TABLES' && (
          <div className="admin-tables-panel animate-fade-in">
            <div className="tables-layout">
              {/* Left Tables List */}
              <div className="tables-list-col">
                <div className="panel-header flex-between">
                  <div>
                    <h3>Dining Tables ({tables.length})</h3>
                    <p>Select table to preview or print QR ordering link.</p>
                  </div>
                </div>

                <form onSubmit={handleAddTable} className="add-table-form">
                  <input
                    type="text"
                    placeholder="New Table Name (e.g. Table 09)"
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    <Plus size={14} /> ADD TABLE
                  </button>
                </form>

                <div className="tables-grid">
                  {tables.map((tbl) => (
                    <div
                      key={tbl.id}
                      className={`table-card ${selectedQRTable.id === tbl.id ? 'selected' : ''}`}
                      onClick={() => setSelectedQRTable(tbl)}
                    >
                      <div className="table-card-top">
                        <span className="table-name">{tbl.name}</span>
                        <span className={`table-status ${tbl.status.toLowerCase()}`}>{tbl.status}</span>
                      </div>
                      <span className="table-seats">{tbl.seats} Seats Dining</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right QR Generator Preview Card */}
              <div className="qr-generator-col">
                <div className="qr-card-preview">
                  <div className="qr-card-header">
                    <span className="eyebrow">DINE-IN QR GENERATOR</span>
                    <h3>{selectedQRTable.name} QR Code</h3>
                  </div>

                  {/* Generated QR Code Graphic */}
                  <div className="qr-image-wrapper">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(window.location.origin + '/order?table=' + selectedQRTable.name.replace('Table ', ''))}`}
                      alt={`${selectedQRTable.name} QR Code`}
                      className="qr-img"
                    />
                    <div className="qr-overlay-logo">FC</div>
                  </div>

                  <div className="qr-target-url">
                    <span className="url-label">TARGET DINE-IN URL:</span>
                    <code className="url-code">/order?table={selectedQRTable.name.replace('Table ', '')}</code>
                  </div>

                  <div className="qr-actions">
                    <Link
                      to={`/order?table=${selectedQRTable.name.replace('Table ', '')}`}
                      className="btn btn-primary full-width"
                      target="_blank"
                    >
                      TEST DINE-IN ORDERING FLOW →
                    </Link>

                    <button
                      className="btn btn-outline full-width"
                      onClick={() => window.print()}
                    >
                      <Printer size={14} /> PRINT QR ACRYLIC STAND
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Menu Items List */}
        {activeTab === 'MENU' && (
          <div className="admin-menu-panel animate-fade-in">
            <div className="panel-header">
              <h3>Active Showcase Menu Items ({menuItems.length})</h3>
              <p>Items displayed on the public showcase and QR ordering system.</p>
            </div>

            <div className="admin-menu-table-wrapper">
              <table className="admin-menu-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => (
                    <tr key={item.id}>
                      <td className="item-cell">
                        <img src={item.image} alt={item.name} className="table-thumb" />
                        <div>
                          <strong>{item.name}</strong>
                          <p>{item.description}</p>
                        </div>
                      </td>
                      <td><span className="category-badge">{item.category}</span></td>
                      <td className="price-cell">{item.price}</td>
                      <td><span className="active-tag">Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
