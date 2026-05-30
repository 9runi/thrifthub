import { useEffect, useMemo, useState } from 'react';
import { HashRouter, Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { products as starterProducts, sellers as starterSellers } from './data/products';

const storage = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

function accountKey(base, account) {
  return account ? `${base}-${account.id}` : `${base}-guest`;
}

function createNotification(title, body, type = 'activity') {
  return { id: `note-${Date.now()}`, title, body, type, date: new Date().toLocaleString(), read: false };
}

function money(value) {
  return `$${Number(value).toFixed(0)}`;
}

function initials(name) {
  return String(name || 'TH')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function StoreIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function HomeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
}

function HeartIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>;
}

function PlusIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>;
}

function BellIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>;
}

function ChatIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>;
}

function UserIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" /></svg>;
}

function LogoutIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>;
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
}

function getAllSellers(user) {
  const accounts = storage.get('thrifthub-accounts', []);
  const accountSellers = accounts.map((account) => ({
    id: account.id,
    username: account.username,
    name: `${account.firstName} ${account.lastName}`,
    location: account.location,
    rating: 5,
    joined: new Date(account.createdAt).getFullYear().toString(),
    bio: account.bio || 'New ThriftHub seller sharing second-hand fashion finds.'
  }));
  const list = [...starterSellers, ...accountSellers];
  if (user && !list.some((seller) => seller.id === user.id)) {
    list.push({
      id: user.id,
      username: user.username,
      name: `${user.firstName} ${user.lastName}`,
      location: user.location,
      rating: 5,
      joined: new Date(user.createdAt).getFullYear().toString(),
      bio: user.bio || 'New ThriftHub seller sharing second-hand fashion finds.'
    });
  }
  return list;
}

function findSeller(id, user) {
  return getAllSellers(user).find((seller) => seller.id === id) || starterSellers[0];
}

function Header({ user, searchQuery, setSearchQuery, unreadCount, onLogout }) {
  return (
    <header className="topbar">
      <Link to="/discover" className="topbar-brand">
        <StoreIcon />
        <span>ThriftHub</span>
      </Link>
      <div className="topbar-search">
        <SearchIcon />
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="input input-search"
          type="search"
          placeholder="Search vintage, brands, styles..."
        />
      </div>
      <div className="topbar-user">
        <NavLink to="/notifications" className="btn-ghost nav-item" title="Notifications">
          <BellIcon />
          {unreadCount > 0 && <span className="nav-badge">{unreadCount}</span>}
        </NavLink>
        {user ? (
          <>
            <span id="topbar-username">{user.username}</span>
            <Link to="/account" className="avatar" id="topbar-avatar">{initials(user.username)}</Link>
            <button className="btn-ghost nav-item" title="Logout" onClick={onLogout}>
              <LogoutIcon />
            </button>
          </>
        ) : (
          <Link to="/account" className="btn btn-primary rounded-pill px-3">Create Account</Link>
        )}
      </div>
    </header>
  );
}

function Navigation({ unreadCount, messageCount }) {
  const items = [
    { to: '/discover', label: 'Home', icon: <HomeIcon /> },
    { to: '/liked', label: 'Liked', icon: <HeartIcon /> },
    { to: '/add-listing', label: 'Add Listing', icon: <PlusIcon /> },
    { to: '/notifications', label: 'Notifications', icon: <BellIcon />, badge: unreadCount },
    { to: '/messages', label: 'Messages', icon: <ChatIcon />, badge: messageCount },
    { to: '/account', label: 'Account', icon: <UserIcon /> }
  ];
  const mobileItems = items.slice(0, 5);
  return (
    <>
      <nav className="sidebar">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} className="nav-item" title={item.label}>
            {item.icon}
            {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
          </NavLink>
        ))}
      </nav>
      <nav className="bottomnav">
        {mobileItems.map((item) => (
          <NavLink key={item.to} to={item.to} className="nav-item" title={item.label}>
            {item.icon}
            {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

function ProductCard({ product, seller, liked, onLike, onOpen }) {
  return (
    <div className="product-card" onClick={() => onOpen(product)}>
      <div className="product-image-wrap">
        <img src={product.image} alt={product.title} className="product-image" />
        <button className={`like-button ${liked ? 'liked' : ''}`} onClick={(event) => { event.stopPropagation(); onLike(product.id); }}>
          <HeartIcon />
        </button>
      </div>
      <div className="p-3">
        <div className="d-flex justify-content-between gap-2 align-items-start">
          <h3 className="product-title">{product.title}</h3>
          <span className="price-tag">{money(product.price)}</span>
        </div>
        <p className="product-desc">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
          <span className="condition-pill">{product.condition}</span>
          <Link to={`/seller/${seller.id}`} className="seller-link" onClick={(event) => event.stopPropagation()}>@{seller.username}</Link>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, seller, liked, user, onClose, onLike, onSendMessage }) {
  const [message, setMessage] = useState('Hi, is this item still available?');
  const [notice, setNotice] = useState('');
  const [sentId, setSentId] = useState('');
  if (!product || !seller) {
    return null;
  }
  function send() {
    if (!user) {
      setNotice('Create an account first so the seller can reply to you.');
      return;
    }
    if (!message.trim()) {
      setNotice('Write a message before sending.');
      return;
    }
    const id = onSendMessage(product, seller, message.trim());
    setSentId(id);
    setNotice(`Message sent to @${seller.username}.`);
    setMessage('');
  }
  return (
    <div className="modal-layer" role="dialog" aria-modal="true">
      <div className="modal-card product-modal-card">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="row g-4">
          <div className="col-lg-6">
            <img src={product.image} alt={product.title} className="modal-product-image" />
          </div>
          <div className="col-lg-6">
            <span className="condition-pill mb-3 d-inline-flex">{product.condition}</span>
            <h2 className="modal-title">{product.title}</h2>
            <p className="display-price">{money(product.price)}</p>
            <p className="text-muted">{product.description}</p>
            <div className="detail-grid">
              <span>Category</span><strong>{product.category}</strong>
              <span>Brand</span><strong>{product.brand}</strong>
              <span>Size</span><strong>{product.size}</strong>
              <span>Seller</span><strong>@{seller.username}</strong>
            </div>
            <div className="d-flex flex-wrap gap-2 my-4">
              {product.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <button className={`btn ${liked ? 'btn-danger' : 'btn-outline-danger'} rounded-pill`} onClick={() => onLike(product.id)}>
                {liked ? 'Liked' : 'Like item'}
              </button>
              <Link to={`/seller/${seller.id}`} className="btn btn-outline-dark rounded-pill" onClick={onClose}>
                View publisher profile
              </Link>
            </div>
            <div className="message-box mt-4">
              <h3>Message the seller</h3>
              <textarea className="form-control" rows="3" value={message} onChange={(event) => setMessage(event.target.value)} />
              <div className="d-flex gap-2 flex-wrap mt-3">
                <button className="btn btn-primary rounded-pill" onClick={send}>Send message</button>
                <Link to="/messages" className="btn btn-outline-dark rounded-pill" onClick={onClose}>Open messages</Link>
              </div>
              {notice && <div className="alert alert-info mt-3 mb-0">{notice}{sentId && <span className="d-block small mt-1">You can open it from the Messages page.</span>}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiscoverPage({ products, sellers, likedIds, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, onOpen, onLike }) {
  const categories = ['All', ...Array.from(new Set(products.map((product) => product.category)))];
  const filteredProducts = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      const seller = sellers.find((person) => person.id === product.sellerId);
      const searchText = [product.title, product.category, product.brand, product.condition, product.size, product.description, product.tags.join(' '), seller?.username, seller?.location].join(' ').toLowerCase();
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const searchMatch = !term || searchText.includes(term);
      return categoryMatch && searchMatch;
    });
  }, [products, sellers, searchQuery, selectedCategory]);
  return (
    <div>
      <section className="hero-card">
        <div>
          <span className="eyebrow">Second-hand fashion marketplace</span>
          <h1>Find vintage gems and sell pieces from your closet.</h1>
          <p>Search by item name, category, brand, condition, seller, size, color, and description.</p>
          <div className="hero-search d-md-none">
            <input className="input input-search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search ThriftHub..." />
          </div>
        </div>
      </section>
      <div className="d-flex gap-2 flex-wrap mb-4">
        {categories.map((category) => (
          <button key={category} className={`category-chip ${selectedCategory === category ? 'active' : ''}`} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3 gap-3 flex-wrap">
        <div>
          <h2 className="section-title">Discover</h2>
          <p className="text-muted mb-0">Browse matching thrift finds.</p>
        </div>
        {(searchQuery || selectedCategory !== 'All') && (
          <button className="btn btn-outline-secondary rounded-pill" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
            Clear filters
          </button>
        )}
      </div>
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              seller={sellers.find((seller) => seller.id === product.sellerId) || sellers[0]}
              liked={likedIds.includes(product.id)}
              onLike={onLike}
              onOpen={onOpen}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No items found</h3>
          <p>Try another word like denim, pink, sweater, jacket, shoes, dress, or seller name.</p>
        </div>
      )}
    </div>
  );
}

function LikedPage({ products, sellers, likedIds, onOpen, onLike }) {
  const likedProducts = products.filter((product) => likedIds.includes(product.id));
  return (
    <div>
      <div className="page-heading">
        <h1>Liked Items</h1>
        <p>Items you liked from the product card or product details window.</p>
      </div>
      {likedProducts.length > 0 ? (
        <div className="product-grid">
          {likedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              seller={sellers.find((seller) => seller.id === product.sellerId) || sellers[0]}
              liked={true}
              onLike={onLike}
              onOpen={onOpen}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No liked products yet</h3>
          <p>Open any product and press Like item to save it here.</p>
          <Link to="/discover" className="btn btn-primary rounded-pill">Go discover</Link>
        </div>
      )}
    </div>
  );
}

function AddListingPage({ user, onAddProduct }) {
  const [form, setForm] = useState({ title: '', price: '', category: 'Tops', brand: '', condition: 'Good', size: '', description: '', tags: '' });
  const [image, setImage] = useState('');
  const [notice, setNotice] = useState('');
  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }
  function loadImage(file) {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }
  function submit(event) {
    event.preventDefault();
    if (!user) {
      setNotice('Create an account first before adding your own listing.');
      return;
    }
    if (!form.title.trim() || !form.price || !image) {
      setNotice('Add a title, price, and image before publishing.');
      return;
    }
    const product = {
      id: `listing-${Date.now()}`,
      title: form.title.trim(),
      price: Number(form.price),
      category: form.category,
      brand: form.brand.trim() || 'Personal Closet',
      condition: form.condition,
      size: form.size.trim() || 'Ask seller',
      sellerId: user.id,
      image,
      description: form.description.trim() || 'Second-hand item listed by a ThriftHub user.',
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
    };
    onAddProduct(product);
    setNotice('Your listing was published successfully.');
    setForm({ title: '', price: '', category: 'Tops', brand: '', condition: 'Good', size: '', description: '', tags: '' });
    setImage('');
  }
  return (
    <div>
      <div className="page-heading">
        <h1>Sell an Item</h1>
        <p>Add a product from your closet. Images are handled inside the React source, not the public folder.</p>
      </div>
      <div className="form-card">
        {!user && <div className="alert alert-warning">You need an account before posting a product.</div>}
        {notice && <div className="alert alert-info">{notice}</div>}
        <form onSubmit={submit}>
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label">Product title</label>
              <input className="form-control" value={form.title} onChange={(event) => update('title', event.target.value)} placeholder="Example: Vintage denim jacket" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Price</label>
              <input className="form-control" type="number" min="1" value={form.price} onChange={(event) => update('price', event.target.value)} placeholder="45" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Category</label>
              <select className="form-select" value={form.category} onChange={(event) => update('category', event.target.value)}>
                {['Tops', 'Dresses', 'Jackets', 'Jeans', 'Skirts', 'Sweaters', 'Shoes', 'Bags', 'Accessories'].map((category) => <option key={category}>{category}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Brand</label>
              <input className="form-control" value={form.brand} onChange={(event) => update('brand', event.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Condition</label>
              <select className="form-select" value={form.condition} onChange={(event) => update('condition', event.target.value)}>
                {['Like New', 'Very Good', 'Good', 'Fair'].map((condition) => <option key={condition}>{condition}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Size</label>
              <input className="form-control" value={form.size} onChange={(event) => update('size', event.target.value)} placeholder="S, M, L, 38..." />
            </div>
            <div className="col-md-8">
              <label className="form-label">Tags separated by commas</label>
              <input className="form-control" value={form.tags} onChange={(event) => update('tags', event.target.value)} placeholder="denim, y2k, jacket" />
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows="4" value={form.description} onChange={(event) => update('description', event.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Product image</label>
              <input className="form-control" type="file" accept="image/*" onChange={(event) => loadImage(event.target.files[0])} />
            </div>
            <div className="col-md-6">
              {image ? <img src={image} alt="Preview" className="image-preview" /> : <div className="image-placeholder">Image preview</div>}
            </div>
          </div>
          <button className="btn btn-primary rounded-pill mt-4" type="submit">Publish listing</button>
        </form>
      </div>
    </div>
  );
}

function NotificationsPage({ notifications, onMarkRead, user }) {
  return (
    <div className="narrow-page">
      <div className="page-header page-header-row">
        <div>
          <h1>Notifications</h1>
          <p>{user ? 'Activity on your items and account' : 'Create an account to receive your welcome notification.'}</p>
        </div>
        {notifications.length > 0 && <button className="btn-ghost mark-read-btn" onClick={onMarkRead}>Mark all as read</button>}
      </div>
      {notifications.length > 0 ? (
        <div>
          {notifications.map((notification) => (
            <div key={notification.id} className={`notif-item ${notification.read ? 'read' : 'unread'}`}>
              <div className="notif-icon">
                {notification.type === 'message' ? <ChatIcon /> : notification.type === 'listing' ? <StoreIcon /> : <HeartIcon />}
              </div>
              <div className="notif-body">
                <p><strong>{notification.title}</strong> {notification.body}</p>
                <span className="time">{notification.date}</span>
              </div>
              {!notification.read && <div className="notif-dot"></div>}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No notifications yet</h3>
          <p>When you create a new account, you will receive a welcome notification here.</p>
          <Link to="/account" className="btn btn-primary rounded-pill">Create account</Link>
        </div>
      )}
    </div>
  );
}

function MessagesPage({ messages, user, onOpenMessage }) {
  const [activeId, setActiveId] = useState(messages[0]?.id || '');
  useEffect(() => {
    if (!activeId && messages[0]) {
      setActiveId(messages[0].id);
    }
  }, [activeId, messages]);
  const activeMessage = messages.find((message) => message.id === activeId) || messages[0];
  useEffect(() => {
    if (activeMessage && !activeMessage.read) {
      onOpenMessage(activeMessage.id);
    }
  }, [activeMessage, onOpenMessage]);
  if (!user) {
    return (
      <div className="empty-state">
        <h3>Create an account first</h3>
        <p>You need an account before sending or opening seller messages.</p>
        <Link to="/account" className="btn btn-primary rounded-pill">Create account</Link>
      </div>
    );
  }
  return (
    <div>
      <div className="page-heading">
        <h1>Messages</h1>
        <p>Open the messages you sent to sellers and visit the publisher profile.</p>
      </div>
      {messages.length > 0 ? (
        <div className="messages-layout">
          <div className="message-list-panel">
            {messages.map((message) => (
              <button key={message.id} className={`message-list-item ${activeMessage?.id === message.id ? 'active' : ''} ${!message.read ? 'unread-message' : ''}`} onClick={() => { setActiveId(message.id); onOpenMessage(message.id); }}>
                <span>@{message.sellerUsername}</span>
                <strong>{message.productTitle}</strong>
                <small>{message.date}</small>
                {!message.read && <em>New</em>}
              </button>
            ))}
          </div>
          <div className="message-open-card">
            <h2>Message to @{activeMessage.sellerUsername}</h2>
            <p className="text-muted">About {activeMessage.productTitle}</p>
            <div className="opened-message-text">{activeMessage.body}</div>
            <div className="d-flex gap-2 flex-wrap mt-4">
              <Link to={`/seller/${activeMessage.sellerId}`} className="btn btn-primary rounded-pill">Open publisher page</Link>
              <Link to="/discover" className="btn btn-outline-dark rounded-pill">Back to products</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <h3>No messages yet</h3>
          <p>Open a product, write to the seller, then your message will appear here.</p>
          <Link to="/discover" className="btn btn-primary rounded-pill">Go discover</Link>
        </div>
      )}
    </div>
  );
}

function AccountPage({ user, onRegister, onLogin, onLogout, onUpdateAccount, messages, products, onOpen, onDeleteProduct }) {
  const [registerForm, setRegisterForm] = useState({ firstName: '', lastName: '', email: '', username: '', password: '', location: '' });
  const [loginForm, setLoginForm] = useState({ loginId: '', password: '' });
  const [editForm, setEditForm] = useState(user || {});
  const [notice, setNotice] = useState('');
  const [editMode, setEditMode] = useState(false);
  const myProducts = user ? products.filter((product) => product.sellerId === user.id) : [];
  useEffect(() => {
    if (user) {
      setEditForm(user);
    }
  }, [user]);
  function updateRegister(field, value) {
    setRegisterForm((current) => ({ ...current, [field]: value }));
  }
  function updateLogin(field, value) {
    setLoginForm((current) => ({ ...current, [field]: value }));
  }
  function updateEdit(field, value) {
    setEditForm((current) => ({ ...current, [field]: value }));
  }
  function submitRegister(event) {
    event.preventDefault();
    const result = onRegister(registerForm);
    setNotice(result.message);
    if (result.ok) {
      setRegisterForm({ firstName: '', lastName: '', email: '', username: '', password: '', location: '' });
    }
  }
  function submitLogin(event) {
    event.preventDefault();
    const result = onLogin(loginForm);
    setNotice(result.message);
  }
  function submitEdit(event) {
    event.preventDefault();
    const result = onUpdateAccount(editForm);
    setNotice(result.message);
    if (result.ok) {
      setEditMode(false);
    }
  }
  if (user) {
    return (
      <div>
        <div className="page-heading">
          <h1>My Account</h1>
          <p>You are logged in as @{user.username}.</p>
        </div>
        {notice && <div className="alert alert-info">{notice}</div>}
        <div className="profile-card-large">
          <div className="avatar-big">{initials(`${user.firstName} ${user.lastName}`)}</div>
          <div className="flex-grow-1">
            <h2>{user.firstName} {user.lastName}</h2>
            <p className="text-muted mb-1">@{user.username}</p>
            <p className="text-muted mb-3">{user.email} · {user.location}</p>
            <div className="d-flex gap-2 flex-wrap">
              <Link to={`/seller/${user.id}`} className="btn btn-primary rounded-pill">View my profile</Link>
              <button className="btn btn-outline-dark rounded-pill" onClick={() => setEditMode((value) => !value)}>{editMode ? 'Cancel edit' : 'Edit account'}</button>
              <button className="btn btn-outline-dark rounded-pill" onClick={onLogout}>Log out</button>
            </div>
          </div>
        </div>
        {editMode && (
          <div className="form-card mt-4">
            <h2 className="h4 mb-3">Edit Account</h2>
            <form onSubmit={submitEdit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">First name</label>
                  <input className="form-control" value={editForm.firstName || ''} onChange={(event) => updateEdit('firstName', event.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last name</label>
                  <input className="form-control" value={editForm.lastName || ''} onChange={(event) => updateEdit('lastName', event.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input className="form-control" type="email" value={editForm.email || ''} onChange={(event) => updateEdit('email', event.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Username</label>
                  <input className="form-control" value={editForm.username || ''} onChange={(event) => updateEdit('username', event.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Password</label>
                  <input className="form-control" type="password" value={editForm.password || ''} onChange={(event) => updateEdit('password', event.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Location</label>
                  <input className="form-control" value={editForm.location || ''} onChange={(event) => updateEdit('location', event.target.value)} required />
                </div>
              </div>
              <button className="btn btn-primary rounded-pill mt-4" type="submit">Save changes</button>
            </form>
          </div>
        )}
        <div className="form-card mt-4">
          <h2 className="h4 mb-3">Messages sent to sellers</h2>
          {messages.length > 0 ? (
            <Link to="/messages" className="btn btn-primary rounded-pill">Open messages</Link>
          ) : <p className="text-muted mb-0">No seller messages sent yet.</p>}
        </div>
        <div className="form-card mt-4">
          <h2 className="h4 mb-3">My Listings</h2>
          {myProducts.length > 0 ? (
            <div className="row g-3">
              {myProducts.map((product) => (
                <div className="col-md-6" key={product.id}>
                  <div className="d-flex gap-3 align-items-center border rounded-4 p-3">
                    <img src={product.image} alt={product.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '14px' }} />
                    <div className="flex-grow-1">
                      <strong>{product.title}</strong>
                      <p className="text-muted mb-2">{money(product.price)}</p>
                      <div className="d-flex gap-2 flex-wrap">
                        <button className="btn btn-outline-dark btn-sm rounded-pill" onClick={() => onOpen(product)}>Open</button>
                        <button className="btn btn-danger btn-sm rounded-pill" onClick={() => onDeleteProduct(product.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted mb-0">You did not add any items yet.</p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="page-heading">
        <h1>Account</h1>
        <p>Create an account so your username appears in the app and you receive a welcome notification.</p>
      </div>
      {notice && <div className="alert alert-info">{notice}</div>}
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="form-card h-100">
            <h2>Create Account</h2>
            <form onSubmit={submitRegister}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">First name</label>
                  <input className="form-control" value={registerForm.firstName} onChange={(event) => updateRegister('firstName', event.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last name</label>
                  <input className="form-control" value={registerForm.lastName} onChange={(event) => updateRegister('lastName', event.target.value)} required />
                </div>
                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input className="form-control" type="email" value={registerForm.email} onChange={(event) => updateRegister('email', event.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Username</label>
                  <input className="form-control" value={registerForm.username} onChange={(event) => updateRegister('username', event.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Password</label>
                  <input className="form-control" type="password" value={registerForm.password} onChange={(event) => updateRegister('password', event.target.value)} required />
                </div>
                <div className="col-12">
                  <label className="form-label">Location</label>
                  <input className="form-control" value={registerForm.location} onChange={(event) => updateRegister('location', event.target.value)} required />
                </div>
              </div>
              <button className="btn btn-primary rounded-pill mt-4" type="submit">Create Account</button>
            </form>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-card h-100">
            <h2>Log In</h2>
            <form onSubmit={submitLogin}>
              <label className="form-label">Email or username</label>
              <input className="form-control mb-3" value={loginForm.loginId} onChange={(event) => updateLogin('loginId', event.target.value)} required />
              <label className="form-label">Password</label>
              <input className="form-control mb-4" type="password" value={loginForm.password} onChange={(event) => updateLogin('password', event.target.value)} required />
              <button className="btn btn-outline-dark rounded-pill" type="submit">Log in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function SellerProfilePage({ user, products, onOpen, onLike, likedIds }) {
  const { sellerId } = useParams();
  const seller = findSeller(sellerId, user);
  const sellerProducts = products.filter((product) => product.sellerId === seller.id);
  return (
    <div>
      <div className="profile-card-large mb-4">
        <div className="avatar-big">{initials(seller.name)}</div>
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between gap-3 flex-wrap">
            <div>
              <h1>{seller.name}</h1>
              <p className="text-muted mb-1">@{seller.username}</p>
              <p className="text-muted mb-0">{seller.location} · Joined {seller.joined}</p>
            </div>
            <div className="rating-box">★ {seller.rating}</div>
          </div>
          <p className="mt-3 mb-0">{seller.bio}</p>
        </div>
      </div>
      <h2 className="section-title">Listings by @{seller.username}</h2>
      {sellerProducts.length > 0 ? (
        <div className="product-grid mt-3">
          {sellerProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              seller={seller}
              liked={likedIds.includes(product.id)}
              onLike={onLike}
              onOpen={onOpen}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No listings yet</h3>
          <p>This publisher has not posted products yet.</p>
        </div>
      )}
    </div>
  );
}

function AppShell() {
  const [user, setUser] = useState(() => storage.get('thrifthub-user', null));
  const [customProducts, setCustomProducts] = useState(() => storage.get('thrifthub-custom-products', []));
  const [likedIds, setLikedIds] = useState(() => {
    const savedUser = storage.get('thrifthub-user', null);
    return savedUser ? storage.get(accountKey('thrifthub-liked', savedUser), []) : [];
  });
  const [notifications, setNotifications] = useState(() => {
    const savedUser = storage.get('thrifthub-user', null);
    return savedUser ? storage.get(accountKey('thrifthub-notifications', savedUser), []) : [];
  });
  const [messages, setMessages] = useState(() => {
    const savedUser = storage.get('thrifthub-user', null);
    return savedUser ? storage.get(accountKey('thrifthub-sent-messages', savedUser), []) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const allProducts = useMemo(() => [...customProducts, ...starterProducts], [customProducts]);
  const sellers = useMemo(() => getAllSellers(user), [user]);
  const selectedSeller = selectedProduct ? findSeller(selectedProduct.sellerId, user) : null;
  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const unreadMessageCount = messages.filter((message) => !message.read).length;

  useEffect(() => storage.set('thrifthub-user', user), [user]);
  useEffect(() => storage.set('thrifthub-custom-products', customProducts), [customProducts]);
  useEffect(() => {
    if (user) {
      storage.set(accountKey('thrifthub-liked', user), likedIds);
    }
  }, [likedIds, user]);
  useEffect(() => {
    if (user) {
      storage.set(accountKey('thrifthub-notifications', user), notifications);
    }
  }, [notifications, user]);
  useEffect(() => {
    if (user) {
      storage.set(accountKey('thrifthub-sent-messages', user), messages);
    }
  }, [messages, user]);

  function loadAccountData(account) {
    setLikedIds(storage.get(accountKey('thrifthub-liked', account), []));
    setNotifications(storage.get(accountKey('thrifthub-notifications', account), []));
    setMessages(storage.get(accountKey('thrifthub-sent-messages', account), []));
  }

  function addNotification(title, body, type = 'activity') {
    setNotifications((current) => [createNotification(title, body, type), ...current]);
  }

  function handleRegister(form) {
    const cleaned = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, String(value).trim()]));
    if (Object.values(cleaned).some((value) => !value)) {
      return { ok: false, message: 'Fill in all account fields.' };
    }
    const accounts = storage.get('thrifthub-accounts', []);
    const exists = accounts.some((account) => account.email.toLowerCase() === cleaned.email.toLowerCase() || account.username.toLowerCase() === cleaned.username.toLowerCase());
    if (exists) {
      return { ok: false, message: 'This email or username already exists.' };
    }
    const account = { ...cleaned, id: `user-${Date.now()}`, createdAt: new Date().toISOString() };
    const welcomeNotification = createNotification('Welcome to ThriftHub', `${account.firstName}, your account is ready.`, 'welcome');
    storage.set('thrifthub-accounts', [...accounts, account]);
    storage.set(accountKey('thrifthub-liked', account), []);
    storage.set(accountKey('thrifthub-sent-messages', account), []);
    storage.set(accountKey('thrifthub-notifications', account), [welcomeNotification]);
    setUser(account);
    setLikedIds([]);
    setMessages([]);
    setNotifications([welcomeNotification]);
    navigate('/discover');
    return { ok: true, message: 'Account created successfully.' };
  }

  function handleLogin(form) {
    const accounts = storage.get('thrifthub-accounts', []);
    const account = accounts.find((person) => (person.email.toLowerCase() === form.loginId.trim().toLowerCase() || person.username.toLowerCase() === form.loginId.trim().toLowerCase()) && person.password === form.password);
    if (!account) {
      return { ok: false, message: 'Wrong email, username, or password.' };
    }
    setUser(account);
    loadAccountData(account);
    navigate('/discover');
    return { ok: true, message: 'Logged in successfully.' };
  }

  function handleUpdateAccount(form) {
    const cleaned = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]));
    if (!cleaned.firstName || !cleaned.lastName || !cleaned.email || !cleaned.username || !cleaned.password || !cleaned.location) {
      return { ok: false, message: 'Fill in all account fields before saving.' };
    }
    const accounts = storage.get('thrifthub-accounts', []);
    const duplicate = accounts.some((account) => account.id !== user.id && (account.email.toLowerCase() === cleaned.email.toLowerCase() || account.username.toLowerCase() === cleaned.username.toLowerCase()));
    if (duplicate) {
      return { ok: false, message: 'This email or username is already used by another account.' };
    }
    const updated = { ...user, ...cleaned };
    const nextAccounts = accounts.map((account) => account.id === user.id ? updated : account);
    storage.set('thrifthub-accounts', nextAccounts);
    setUser(updated);
    addNotification('Account updated', 'your account information was saved.', 'activity');
    return { ok: true, message: 'Account updated successfully.' };
  }

  function handleLogout() {
    setUser(null);
    setLikedIds([]);
    setNotifications([]);
    setMessages([]);
    navigate('/account');
  }

  function toggleLike(productId) {
    setLikedIds((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]);
  }

  function addProduct(product) {
    setCustomProducts((current) => [product, ...current]);
    addNotification('Listing published', `${product.title} was added to your ThriftHub profile.`, 'listing');
  }

  function removeProduct(productId) {
    setCustomProducts((current) => current.filter((product) => product.id !== productId));
    setLikedIds((current) => current.filter((id) => id !== productId));
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(null);
    }
    addNotification('Listing removed', 'your listing was removed from ThriftHub.', 'listing');
  }

  function markAllRead() {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
  }

  function sendMessage(product, seller, body) {
    const id = `message-${Date.now()}`;
    const message = { id, productId: product.id, productTitle: product.title, sellerId: seller.id, sellerUsername: seller.username, body, date: new Date().toLocaleString(), read: false };
    setMessages((current) => [message, ...current]);
    addNotification('Message sent', `your message about ${product.title} was sent to @${seller.username}.`, 'message');
    return id;
  }

  function markMessageRead(messageId) {
    setMessages((current) => current.map((message) => message.id === messageId ? { ...message, read: true } : message));
  }

  return (
    <>
      <Header user={user} searchQuery={searchQuery} setSearchQuery={setSearchQuery} unreadCount={unreadCount} onLogout={handleLogout} />
      <Navigation unreadCount={unreadCount} messageCount={unreadMessageCount} />
      <main className="app-main">
        <div className="container-fluid app-container">
          <Routes>
            <Route path="/" element={<DiscoverPage products={allProducts} sellers={sellers} likedIds={likedIds} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} onOpen={setSelectedProduct} onLike={toggleLike} />} />
            <Route path="/discover" element={<DiscoverPage products={allProducts} sellers={sellers} likedIds={likedIds} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} onOpen={setSelectedProduct} onLike={toggleLike} />} />
            <Route path="/liked" element={<LikedPage products={allProducts} sellers={sellers} likedIds={likedIds} onOpen={setSelectedProduct} onLike={toggleLike} />} />
            <Route path="/add-listing" element={<AddListingPage user={user} onAddProduct={addProduct} />} />
            <Route path="/notifications" element={<NotificationsPage notifications={notifications} onMarkRead={markAllRead} user={user} />} />
            <Route path="/messages" element={<MessagesPage messages={messages} user={user} onOpenMessage={markMessageRead} />} />
            <Route path="/seller/:sellerId" element={<SellerProfilePage user={user} products={allProducts} onOpen={setSelectedProduct} onLike={toggleLike} likedIds={likedIds} />} />
            <Route path="/account" element={<AccountPage user={user} onRegister={handleRegister} onLogin={handleLogin} onLogout={handleLogout} onUpdateAccount={handleUpdateAccount} messages={messages} products={allProducts} onOpen={setSelectedProduct} onDeleteProduct={removeProduct} />} />
          </Routes>
        </div>
      </main>
      <ProductModal product={selectedProduct} seller={selectedSeller} liked={selectedProduct ? likedIds.includes(selectedProduct.id) : false} user={user} onClose={() => setSelectedProduct(null)} onLike={toggleLike} onSendMessage={sendMessage} />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}
