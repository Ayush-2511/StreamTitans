import React from 'react';
import { Search, Download, ArrowRight } from 'lucide-react';
import './CreatorOrdersTab.css';

const ALL_ORDERS = [
  { id: 1, title: 'Floral Midi Dress', sku: 'SKU-1042 · Size M', user: '@meera_s', price: '₹299', status: 'Pending', color: 'orange' },
  { id: 2, title: 'Linen Shirt', sku: 'SKU-1038 · Size M', user: '@ritu_23', price: '₹449', status: 'Packing', color: 'blue' },
  { id: 3, title: 'Sneakers (Maroon)', sku: 'SKU-1029 · Size 8', user: '@priya.k', price: '₹899', status: 'Shipped', color: 'green' },
];

export default function CreatorOrdersTab() {
  return (
    <div className="orders-tab animate-slide-up">
      <div className="orders-header">
        <div>
          <h1 className="orders-title">Orders</h1>
          <p className="orders-subtitle">Track and manage your customer shipments</p>
        </div>
        <div className="orders-header-actions">
          <div className="search-box">
            <Search size={16} style={{ opacity: 0.5, marginRight: '8px' }} />
            <input type="text" placeholder="Search orders..." />
          </div>
          <button className="export-btn">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      <div className="orders-metrics-row">
        <div className="metric-card to-ship">
          <div className="metric-icon">📦</div>
          <div>
            <h2>5</h2>
            <p>To ship</p>
          </div>
        </div>
        <div className="metric-card packing">
          <div className="metric-icon">🏷️</div>
          <div>
            <h2>3</h2>
            <p>Packing</p>
          </div>
        </div>
        <div className="metric-card completed">
          <div className="metric-icon font-black">✓</div>
          <div>
            <h2>48</h2>
            <p>Completed</p>
          </div>
        </div>
      </div>

      <div className="table-header-row">
         <h3>All Orders</h3>
         <button className="export-btn">
            <Download size={14} /> Export CSV
         </button>
      </div>

      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ITEM</th>
              <th>CUSTOMER</th>
              <th>PRICE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {ALL_ORDERS.map((order) => (
              <tr key={order.id}>
                <td className="item-cell">
                  <div className="item-thumb" style={{
                    backgroundColor: order.color === 'orange' ? '#eca378' : order.color === 'blue' ? '#c5ade5' : '#73a2bd'
                  }}></div>
                  <div className="item-details">
                     <p className="item-title">{order.title}</p>
                     <p className="item-sku">{order.sku}</p>
                  </div>
                </td>
                <td className="customer-cell">{order.user}</td>
                <td className="price-cell">{order.price}</td>
                <td>
                  <span className={`status-pill ${order.color}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn">
                    Manage <ArrowRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
