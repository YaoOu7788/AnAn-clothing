// ===== 数据存储模块 =====
const Storage = {
    getProducts() {
        let products = localStorage.getItem('yao_products');
        // 如果有数据，先做兼容性处理（防止老数据字段缺失）
        if (products) {
            try {
                const arr = JSON.parse(products);
                if (Array.isArray(arr)) {
                    return arr.map(p => ({
                        id: p.id || ('P' + Date.now() + Math.random()),
                        name: p.name || '未命名商品',
                        code: p.code || '',
                        category: p.category || 'men',
                        subcategory: p.subcategory || 'top',
                        style: p.style || '',
                        price: parseFloat(p.price) || 0,
                        quantity: parseInt(p.quantity) || parseInt(p.stock) || 10,
                        colors: Array.isArray(p.colors) ? p.colors : (p.colors ? String(p.colors).split(',').map(s => s.trim()).filter(s => s) : ['默认']),
                        sizes: Array.isArray(p.sizes) ? p.sizes : (p.sizes ? String(p.sizes).split(',').map(s => s.trim()).filter(s => s) : ['均码']),
                        image: p.image || '',
                        status: p.status || 'on',
                        isHot: p.isHot === true,
                        isNew: p.isNew === true,
                        description: p.description || ''
                    }));
                }
            } catch (e) {
                console.error('商品数据解析失败', e);
            }
        }
        // 没有有效数据，用默认数据
        products = null;
        if (!products) {
            products = JSON.stringify([
                {
                    id: 'p001',
                    name: '夏季简约圆领T恤',
                    code: 'NX-T001',
                    category: 'men',
                    subcategory: 'top',
                    style: '简约休闲',
                    price: 89,
                    colors: ['白色', '黑色', '灰色'],
                    sizes: ['M', 'L', 'XL', 'XXL'],
                    quantity: 50,
                    image: '',
                    status: 'on',
                    isHot: true,
                    isNew: true,
                    createTime: new Date().toISOString()
                },
                {
                    id: 'p002',
                    name: '商务休闲直筒长裤',
                    code: 'NX-K002',
                    category: 'men',
                    subcategory: 'pants',
                    style: '商务休闲',
                    price: 159,
                    colors: ['黑色', '深蓝', '卡其'],
                    sizes: ['29', '30', '32', '34', '36'],
                    quantity: 35,
                    image: '',
                    status: 'on',
                    isHot: true,
                    isNew: false,
                    createTime: new Date().toISOString()
                },
                {
                    id: 'p003',
                    name: '韩版修身男士套装',
                    code: 'NX-S003',
                    category: 'men',
                    subcategory: 'suit',
                    style: '韩版修身',
                    price: 299,
                    colors: ['黑色', '深灰'],
                    sizes: ['M', 'L', 'XL'],
                    quantity: 20,
                    image: '',
                    status: 'on',
                    isHot: false,
                    isNew: true,
                    createTime: new Date().toISOString()
                },
                {
                    id: 'p004',
                    name: '甜美蝴蝶结短袖上衣',
                    code: 'NV-T004',
                    category: 'women',
                    subcategory: 'top',
                    style: '甜美可爱',
                    price: 79,
                    colors: ['粉色', '白色', '浅蓝'],
                    sizes: ['S', 'M', 'L', 'XL'],
                    quantity: 60,
                    image: '',
                    status: 'on',
                    isHot: true,
                    isNew: true,
                    createTime: new Date().toISOString()
                },
                {
                    id: 'p005',
                    name: '高腰显瘦阔腿裤',
                    code: 'NV-K005',
                    category: 'women',
                    subcategory: 'pants',
                    style: '显瘦百搭',
                    price: 129,
                    colors: ['黑色', '米色', '浅灰'],
                    sizes: ['S', 'M', 'L', 'XL'],
                    quantity: 40,
                    image: '',
                    status: 'on',
                    isHot: false,
                    isNew: true,
                    createTime: new Date().toISOString()
                },
                {
                    id: 'p006',
                    name: '波西米亚雪纺连衣裙',
                    code: 'NV-D006',
                    category: 'women',
                    subcategory: 'dress',
                    style: '波西米亚',
                    price: 189,
                    colors: ['白色', '碎花', '深蓝'],
                    sizes: ['S', 'M', 'L'],
                    quantity: 30,
                    image: '',
                    status: 'on',
                    isHot: true,
                    isNew: false,
                    createTime: new Date().toISOString()
                },
                {
                    id: 'p007',
                    name: '小香风两件套套装',
                    code: 'NV-S007',
                    category: 'women',
                    subcategory: 'suit',
                    style: '小香风',
                    price: 259,
                    colors: ['粉色', '白色', '黑色'],
                    sizes: ['S', 'M', 'L'],
                    quantity: 25,
                    image: '',
                    status: 'on',
                    isHot: false,
                    isNew: true,
                    createTime: new Date().toISOString()
                },
                {
                    id: 'p008',
                    name: '法式碎花半身裙',
                    code: 'NV-D008',
                    category: 'women',
                    subcategory: 'dress',
                    style: '法式优雅',
                    price: 149,
                    colors: ['白色', '米色', '粉色'],
                    sizes: ['S', 'M', 'L'],
                    quantity: 45,
                    image: '',
                    status: 'on',
                    isHot: true,
                    isNew: true,
                    createTime: new Date().toISOString()
                }
            ]);
            localStorage.setItem('yao_products', products);
        }
        return JSON.parse(products);
    },

    saveProducts(products) {
        localStorage.setItem('yao_products', JSON.stringify(products));
    },

    getCart() {
        const cart = localStorage.getItem('yao_cart');
        return cart ? JSON.parse(cart) : [];
    },

    saveCart(cart) {
        localStorage.setItem('yao_cart', JSON.stringify(cart));
    },

    getNotices() {
        let notices = localStorage.getItem('yao_notices');
        if (!notices) {
            notices = JSON.stringify([
                {
                    id: 'n001',
                    text: '欢迎光临耀鸥服装工厂店！所有商品工厂价直销，品质保证！',
                    time: new Date().toLocaleString('zh-CN')
                },
                {
                    id: 'n002',
                    text: '新客户加微信享首单9折优惠，微信号请查看店铺信息~',
                    time: new Date().toLocaleString('zh-CN')
                }
            ]);
            localStorage.setItem('yao_notices', notices);
        }
        return JSON.parse(notices);
    },

    saveNotices(notices) {
        localStorage.setItem('yao_notices', JSON.stringify(notices));
    },

    getShopInfo() {
        let info = localStorage.getItem('yao_shop_info');
        if (!info) {
            info = JSON.stringify({
                shopName: '耀鸥服装工厂店',
                address: '浙江省慈溪市观海卫镇广义路468号',
                phone: '15356037822',
                wechat: '15356037822',
                email: '3208185820@qq.com',
                slogan: '源头工厂 · 工厂价直销 · 品质保证'
            });
            localStorage.setItem('yao_shop_info', JSON.stringify(info));
        }
        return JSON.parse(info);
    },

    saveShopInfo(info) {
        localStorage.setItem('yao_shop_info', JSON.stringify(info));
    },

    getVisitCount() {
        const today = new Date().toDateString();
        const data = localStorage.getItem('yao_views');
        if (data) {
            const parsed = JSON.parse(data);
            if (parsed[today] !== undefined) {
                return parsed[today];
            }
        }
        const initial = Math.floor(Math.random() * 50) + 100;
        const all = data ? JSON.parse(data) : {};
        all[today] = initial;
        localStorage.setItem('yao_views', JSON.stringify(all));
        return initial;
    },

    addVisit() {
        const today = new Date().toDateString();
        const data = localStorage.getItem('yao_views');
        const all = data ? JSON.parse(data) : {};
        all[today] = (all[today] || Math.floor(Math.random() * 50) + 100) + 1;
        localStorage.setItem('yao_views', JSON.stringify(all));
        return all[today];
    },

    isLoggedIn() {
        return localStorage.getItem('yao_admin_login') === 'true';
    },

    setLoggedIn(status) {
        localStorage.setItem('yao_admin_login', status ? 'true' : 'false');
    }
};

// ===== 购物车操作 =====
const Cart = {
    add(product, size, color, quantity) {
        const cart = Storage.getCart();
        const key = `${product.id}_${size}_${color}`;
        const existing = cart.find(item => item.key === key);
        
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({
                key: key,
                id: product.id,
                name: product.name,
                code: product.code,
                price: parseFloat(product.price),
                size: size,
                color: color,
                quantity: quantity,
                image: product.image,
                category: product.category
            });
        }
        
        Storage.saveCart(cart);
        this.updateCartCount();
        showToast('✓ 已加入购物车');
    },

    updateQuantity(key, quantity) {
        const cart = Storage.getCart();
        const item = cart.find(i => i.key === key);
        if (item) {
            item.quantity = quantity;
            Storage.saveCart(cart);
        }
    },

    remove(key) {
        const cart = Storage.getCart().filter(i => i.key !== key);
        Storage.saveCart(cart);
        this.updateCartCount();
    },

    clear() {
        Storage.saveCart([]);
        this.updateCartCount();
    },

    getTotal() {
        return Storage.getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    getTotalItems() {
        return Storage.getCart().reduce((sum, item) => sum + item.quantity, 0);
    },

    updateCartCount() {
        const count = this.getTotalItems();
        const badge = document.querySelector('.cart-count');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }
};

// ===== 提示信息 =====
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 2000);
}

// ===== 问候语遮罩（只在第一次打开时显示）=====
function showWelcome() {
    // 检查是否已经显示过（只在同一次会话中显示一次）
    if (sessionStorage.getItem('yao_welcome_shown') === '1') {
        return;
    }
    sessionStorage.setItem('yao_welcome_shown', '1');

    const shop = Storage.getShopInfo();
    const overlay = document.createElement('div');
    overlay.className = 'welcome-overlay';
    overlay.innerHTML = `
        <div class="welcome-content">
            <h1>欢迎光临</h1>
            <h1 style="font-size: 36px; margin-top: 5px;">${shop.shopName}</h1>
            <div class="welcome-subtitle">${shop.slogan}</div>
            <div class="welcome-features">
                <span>🏭 源头工厂</span>
                <span>💰 工厂直销价</span>
                <span>✅ 品质保证</span>
                <span>🔄 包退包换</span>
                <span>🆕 每天上新</span>
            </div>
            <div class="welcome-motto">"用心做好每一件衣服，让您以最实在的价格，买到最优质的服装！"</div>
            <div style="margin-top: 30px; font-size: 14px; opacity: 0.85;">
                📍 ${shop.address}
            </div>
            <div style="margin-top: 10px; font-size: 14px; opacity: 0.85;">
                📱 ${shop.phone} | 💬 微信同号
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.transition = 'opacity 1s';
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 1000);
    }, 3500);
}

// ===== 公共导航头部 =====
function renderHeader(activePage) {
    const shop = Storage.getShopInfo();
    return `
        <div class="top-bar">
            <div class="top-bar-content">
                <div class="shop-info">
                    <span>📞 电话: ${shop.phone}</span>
                    <span>💬 微信: ${shop.wechat}</span>
                    <span>📍 ${shop.address}</span>
                </div>
                <div>
                    <a href="admin.html">管理后台 ⚙️</a>
                </div>
            </div>
        </div>
        <header class="main-header">
            <div class="header-content">
                <div class="logo-wrap">
                    <div class="logo-icon">👔</div>
                    <div>
                        <div class="logo-text">耀鸥服装</div>
                        <div class="logo-sub">源头工厂 · 品质保证</div>
                    </div>
                </div>
                <nav class="nav-menu">
                    <a href="index.html" class="${activePage === 'index' ? 'active' : ''}">🏠 首页</a>
                    <a href="men.html" class="${activePage === 'men' ? 'active' : ''}">👔 男装</a>
                    <a href="women.html" class="${activePage === 'women' ? 'active' : ''}">👗 女装</a>
                    <a href="cart.html" class="cart-btn">
                        🛒 购物车
                        <span class="cart-count">0</span>
                    </a>
                </nav>
            </div>
        </header>
    `;
}

// ===== 公告栏 =====
function renderNoticeBar() {
    const notices = Storage.getNotices();
    const text = notices.length > 0 ? notices.map(n => n.text || n.content || '').join('　　　　') : '欢迎光临！';
    return `
        <div class="notice-bar">
            <div class="notice-content">
                <span class="notice-tag">📢 公告</span>
                <span class="notice-text">${text}</span>
            </div>
        </div>
    `;
}

// ===== 底部 =====
function renderFooter() {
    const shop = Storage.getShopInfo();
    return `
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>🏭 关于我们</h4>
                    <p>${shop.shopName}</p>
                    <p>${shop.slogan}</p>
                    <p>✅ 有任何质量问题包退包换</p>
                    <p>✅ 每天上新 · 款式丰富</p>
                </div>
                <div class="footer-section">
                    <h4>📞 联系我们</h4>
                    <p>📱 电话: ${shop.phone}</p>
                    <p>💬 微信: ${shop.wechat}</p>
                    <p>📧 邮箱: ${shop.email}</p>
                    <p style="margin-top:10px;">加微信享工厂直销价！</p>
                </div>
                <div class="footer-section">
                    <h4>📍 店铺地址</h4>
                    <p>${shop.address}</p>
                    <p style="margin-top:15px;">营业时间: 9:00 - 22:00</p>
                    <p>欢迎上门选购！</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2024 ${shop.shopName} 版权所有 | 🏭 源头工厂 · 💎 品质保证 · 🛍️ 工厂直销价</p>
            </div>
        </footer>
    `;
}

// ===== 颜色名称映射到颜色值 =====
function getColorValue(colorName) {
    const name = colorName.trim().toLowerCase();
    const colorMap = {
        // 白色系
        '白色': '#ffffff', '白': '#ffffff', '奶白': '#f8f3e6', '米白': '#f5f0e1', '纯白': '#ffffff',
        '白色系': '#ffffff',
        // 黑色系
        '黑色': '#333333', '黑': '#333333', '纯黑': '#222222', '深黑': '#1a1a1a', '黑色系': '#333333',
        // 灰色系
        '灰色': '#9e9e9e', '灰': '#9e9e9e', '浅灰': '#bdbdbd', '深灰': '#616161', '银灰': '#c0c0c0',
        // 红色系
        '红色': '#e74c3c', '红': '#e74c3c', '大红': '#c0392b', '枣红': '#8b0000', '酒红': '#722f37',
        '深红': '#b71c1c', '暗红': '#a93226', '橘红': '#ff6f00', '砖红': '#b22222',
        // 蓝色系
        '蓝色': '#3498db', '蓝': '#3498db', '深蓝': '#2980b9', '浅蓝': '#87ceeb', '天蓝': '#5dade2',
        '藏青': '#1a237e', '藏蓝': '#0d47a1', '宝蓝': '#4169e1', '湖蓝': '#1e88e5', '海军蓝': '#003366',
        // 绿色系
        '绿色': '#27ae60', '绿': '#27ae60', '墨绿': '#1a7a4c', '深绿': '#1b5e20', '浅绿': '#81c784',
        '军绿': '#556b2f', '草绿': '#7cb342', '嫩绿': '#aed581', '翠绿': '#26a69a',
        // 黄色系
        '黄色': '#f1c40f', '黄': '#f1c40f', '金黄': '#d4ac0d', '米黄': '#f5deb3', '浅黄': '#fff59d',
        '淡黄': '#fff9c4', '鹅黄': '#fdd835', '土黄': '#a1887f',
        // 粉色系
        '粉色': '#ffb6c1', '粉红': '#ff9aa2', '粉': '#ffb6c1', '玫红': '#e91e63', '浅粉': '#fce4ec',
        '深粉': '#c2185b', '樱花粉': '#ffb7c5', '桃粉': '#ffcdd2',
        // 紫色系
        '紫色': '#9b59b6', '紫': '#9b59b6', '深紫': '#6a1b9a', '浅紫': '#ce93d8', '淡紫': '#e1bee7',
        '薰衣草紫': '#b39ddb', '紫罗兰': '#8a2be2',
        // 橙色系
        '橙色': '#e67e22', '橙': '#e67e22', '橘色': '#f39c12', '深橙': '#d35400', '浅橙': '#ffcc80',
        '橘黄': '#ff8f00', '橙红': '#ff5722',
        // 棕色/咖啡色系
        '棕色': '#8b4513', '棕': '#8b4513', '咖啡色': '#6d4c41', '咖啡': '#6d4c41', '褐色': '#795548',
        '深棕': '#3e2723', '浅棕': '#a1887f', '驼色': '#c69c6d', '焦糖色': '#bf7e3a', '卡其': '#bdb76b',
        '卡其色': '#bdb76b', '米色': '#f5deb3', '米': '#f5deb3', '杏色': '#fdd5b1', '杏': '#fdd5b1',
        // 其他
        '青色': '#00bcd4', '青': '#00bcd4', '靛青': '#1a237e', '藕色': '#eed5d2', '肤色': '#f5d0c5',
        '裸色': '#f5d0c5', '金色': '#ffd700', '金': '#ffd700', '银色': '#c0c0c0', '银': '#c0c0c0'
    };
    // 去除空格后精确匹配
    for (const key in colorMap) {
        if (name === key.toLowerCase() || colorName.trim() === key) {
            return colorMap[key];
        }
    }
    // 部分匹配
    for (const key in colorMap) {
        if (name.includes(key.toLowerCase()) || key.includes(colorName.trim())) {
            return colorMap[key];
        }
    }
    // 默认灰色
    return '#bdbdbd';
}

// ===== 商品卡片 =====
function renderProductCard(product) {
    const colorDots = product.colors.slice(0, 5).map((c, i) => {
        const bg = getColorValue(c);
        const borderColor = bg === '#ffffff' ? '#cccccc' : 'rgba(0,0,0,0.1)';
        return `<span class="color-dot" style="background:${bg}; border:1px solid ${borderColor};" title="${c}"></span>`;
    }).join('');
    const colorText = product.colors.slice(0, 3).join(' / ');

    const catLabel = product.category === 'men' ? '男装' : '女装';

    let badgeHtml = '';
    if (product.isHot && product.isNew) {
        badgeHtml = `<div class="card-badge card-badge-hotnew">🔥新品</div>`;
    } else if (product.isHot) {
        badgeHtml = `<div class="card-badge card-badge-hot">🔥热销</div>`;
    } else if (product.isNew) {
        badgeHtml = `<div class="card-badge card-badge-new">✨新品</div>`;
    } else {
        badgeHtml = `<div class="card-badge card-badge-cat">${catLabel}</div>`;
    }

    // 默认占位图：使用 SVG 绘制的精美服装插画
    const defaultSvg = product.category === 'men'
        ? `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" style="width:70%;height:70%;">
            <defs>
              <linearGradient id="menBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#e8f5e9"/>
                <stop offset="100%" stop-color="#c8e6c9"/>
              </linearGradient>
              <linearGradient id="menShirt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#1a7a4c"/>
                <stop offset="100%" stop-color="#2e7d32"/>
              </linearGradient>
            </defs>
            <rect width="200" height="240" fill="url(#menBg)"/>
            <path d="M 60,60 L 50,55 L 40,90 L 60,100 L 60,200 L 140,200 L 140,100 L 160,90 L 150,55 L 140,60 L 120,45 Q 100,60 80,45 Z" fill="url(#menShirt)"/>
            <circle cx="100" cy="60" r="8" fill="#0d4b2a"/>
            <circle cx="100" cy="95" r="3" fill="#c8e6c9"/>
            <circle cx="100" cy="125" r="3" fill="#c8e6c9"/>
            <circle cx="100" cy="155" r="3" fill="#c8e6c9"/>
            <path d="M 70,180 L 70,215 L 130,215 L 130,180" fill="none" stroke="#0d4b2a" stroke-width="2"/>
            <text x="100" y="230" font-size="14" fill="#1a7a4c" text-anchor="middle" font-family="Microsoft YaHei">男装</text>
          </svg>`
        : `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" style="width:70%;height:70%;">
            <defs>
              <linearGradient id="womenBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fce4ec"/>
                <stop offset="100%" stop-color="#f8bbd0"/>
              </linearGradient>
              <linearGradient id="womenDress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#e91e63"/>
                <stop offset="100%" stop-color="#c2185b"/>
              </linearGradient>
            </defs>
            <rect width="200" height="240" fill="url(#womenBg)"/>
            <path d="M 70,55 L 60,50 L 50,80 L 75,95 L 70,130 L 55,210 L 145,210 L 130,130 L 125,95 L 150,80 L 140,50 L 130,55 Q 120,48 100,55 Q 80,48 70,55 Z" fill="url(#womenDress)"/>
            <circle cx="85" cy="85" r="4" fill="#fff3e0"/>
            <circle cx="115" cy="85" r="4" fill="#fff3e0"/>
            <path d="M 75,105 Q 100,100 125,105" stroke="#fff3e0" stroke-width="2" fill="none"/>
            <path d="M 70,135 L 130,135" stroke="#fff3e0" stroke-width="1.5" stroke-dasharray="5,3"/>
            <circle cx="100" cy="155" r="4" fill="#fff3e0"/>
            <text x="100" y="230" font-size="14" fill="#c2185b" text-anchor="middle" font-family="Microsoft YaHei">女装</text>
          </svg>`;

    return `
        <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
            ${badgeHtml}
            <div class="product-image">
                ${product.image
                    ? `<img src="${product.image}" alt="${product.name}">`
                    : `<div class="product-placeholder">${defaultSvg}</div>`}
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-code">款号: ${product.code}</div>
                <div class="product-style">${product.style || ''}</div>
                <div class="product-colors">${colorDots}<span style="font-size:12px; color:#888; margin-left:5px;">${colorText}</span></div>
                <div class="product-price">¥${parseFloat(product.price).toFixed(2)}</div>
                <button class="add-cart-btn" onclick="event.stopPropagation(); quickAddToCart('${product.id}')">
                    🛒 加入购物车
                </button>
            </div>
        </div>
    `;
}

// 快速加入购物车（使用默认选项）
function quickAddToCart(productId) {
    const products = Storage.getProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
        Cart.add(product, product.sizes[0], product.colors[0], 1);
    }
}

// ===== 页面初始化 =====
function initPage(page) {
    // 增加浏览量（同一浏览器会话内只加一次）
    if (sessionStorage.getItem('yao_visited') !== '1') {
        Storage.addVisit();
        sessionStorage.setItem('yao_visited', '1');
    }

    // 只有首页显示问候语，且只在第一次访问时显示
    if (page === 'index') {
        showWelcome();
    }

    // 更新购物车数量
    Cart.updateCartCount();
}

// ===== 实时更新浏览量显示 =====
function updateVisitCounter(elemId) {
    const el = document.getElementById(elemId);
    if (!el) return;

    const animate = () => {
        const target = Storage.getVisitCount();
        const current = parseInt(el.textContent.replace(/[^\d]/g, '')) || 0;
        const diff = target - current;
        if (diff === 0) {
            el.textContent = target.toLocaleString('zh-CN');
            return;
        }
        const step = Math.max(1, Math.ceil(Math.abs(diff) / 10));
        const next = current + (diff > 0 ? step : -step);
        el.textContent = next.toLocaleString('zh-CN');
        setTimeout(animate, 80);
    };
    animate();
}
