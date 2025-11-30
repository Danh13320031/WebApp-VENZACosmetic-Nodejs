const chatbotBtn = document.getElementById('button-chatbot');
const chatbotContainer = document.getElementById('chatbot-container');
const closeBtn = document.getElementById('chatbot-header-close');
const messageList = document.querySelector('.chat-message-list');
const messageContainer = document.querySelector('.chatbot-message-container');
const inputField = document.getElementById('chatbot-input-textarea');
const sendBtn = document.getElementById('chatbot-input-send');

let sessionId = localStorage.getItem('venza_chat_session_id');
if (!sessionId) {
  sessionId = 'sess_' + Date.now() + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('venza_chat_session_id', sessionId);
}

const scrollToBottom = () => {
  if (messageContainer) messageContainer.scrollTop = messageContainer.scrollHeight;
};

const renderUserMessage = (msg) => {
  const li = document.createElement('li');
  li.className = 'p-2 rounded-2 chat-message-item ms-auto';
  li.style =
    'background: var(--dark-gray-color, #333); color: #fff; max-width: 85%; list-style: none;';
  li.innerHTML = `<div class="chat-message-item-content text-end">${msg}</div>`;
  messageList.appendChild(li);
  scrollToBottom();
};

const renderBotMessage = (msg) => {
  const li = document.createElement('li');
  li.className = 'p-2 rounded-2 chat-message-item';
  li.style = 'background: var(--light-gray-color, #f2f2f2); max-width: 90%; list-style: none;';
  li.innerHTML = `
    <div class="d-flex gap-2 align-items-center mb-1">
        <img src="/client/images/chatbot.png" width="30px" />
        <div class="title-font fw-bold" style="font-size: 14px;">VENZA Chatbot</div>
    </div>
    <div class="chat-message-item-content">${msg}</div>
  `;
  messageList.appendChild(li);
  scrollToBottom();
};

const renderProductList = (items) => {
  const li = document.createElement('li');
  li.className = 'p-2 rounded-2 chat-message-item';
  li.style = 'background: var(--light-gray-color, #f2f2f2); max-width: 95%; list-style: none;';

  let html = `
    <div class="d-flex gap-2 align-items-center mb-2">
        <img src="/client/images/chatbot.png" width="30px" />
        <div class="title-font fw-bold" style="font-size: 14px;">Gợi ý sản phẩm</div>
    </div>
    <div class="d-flex flex-column gap-2">
  `;

  items.forEach((item) => {
    html += `
      <a href="/products/detail/${
        item.slug
      }" class="d-flex gap-2 align-items-start p-2 border rounded bg-white text-decoration-none text-dark" style="transition:0.2s; border-left: 3px solid #ff4d4f !important;">
          <img src="${
            item.thumbnail
          }" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">
          <div class="flex-grow-1 overflow-hidden">
              <div class="fw-bold text-truncate" style="font-size: 13px;">${item.title}</div>
              <div class="text-danger fw-bold" style="font-size: 12px;">${item.price}</div>
              ${
                item.description
                  ? `<div class="text-muted text-truncate" style="font-size: 11px; font-style: italic;">${item.description}</div>`
                  : ''
              }
          </div>
      </a>
    `;
  });

  html += `</div>`;
  li.innerHTML = html;
  messageList.appendChild(li);
  scrollToBottom();
};

const renderProductCategoryList = (items) => {
  const li = document.createElement('li');
  li.className = 'p-2 rounded-2 chat-message-item';
  li.style = 'background: var(--light-gray-color, #f2f2f2); max-width: 95%; list-style: none;';

  let html = `
    <div class="d-flex gap-2 align-items-center mb-2">
        <img src="/client/images/chatbot.png" width="30px" />
        <div class="title-font fw-bold" style="font-size: 14px;">Gợi ý sản phẩm</div>
    </div>
    <div class="d-flex flex-column gap-2">
  `;

  items.forEach((item) => {
    html += `
      <div class="d-flex gap-2 align-items-start p-2 border rounded bg-white text-decoration-none text-dark" style="transition:0.2s; border-left: 3px solid #ff4d4f !important;">
          <img src="${
            item.thumbnail
          }" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">
          <div class="flex-grow-1 overflow-hidden">
              <div class="fw-bold text-truncate" style="font-size: 13px;">${item.title}</div>
              ${
                item.description
                  ? `<div class="text-muted text-truncate" style="font-size: 11px; font-style: italic;">${item.description}</div>`
                  : ''
              }
          </div>
      </div>
    `;
  });

  html += `</div>`;
  li.innerHTML = html;
  messageList.appendChild(li);
  scrollToBottom();
};

const renderProductBrandList = (items) => {
  const li = document.createElement('li');
  li.className = 'p-2 rounded-2 chat-message-item';
  li.style = 'background: var(--light-gray-color); max-width: 95%; list-style: none;';

  let html = `
    <div class="d-flex gap-2 align-items-center mb-2">
        <img src="/client/images/chatbot.png" width="30px" />
        <div class="title-font fw-bold" style="font-size: 14px;">Gợi ý sản phẩm</div>
    </div>
    <div class="d-flex flex-column gap-2">
  `;

  items.forEach((item) => {
    html += `
      <div class="d-flex gap-2 align-items-start p-2 border rounded bg-white text-decoration-none text-dark" style="transition:0.2s; border-left: 3px solid var(--error-color) !important;">
          <img src="${item.thumbnail}" style="width: 60px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">
          <div class="flex-grow-1 overflow-hidden">
              <div class="fw-bold text-truncate" style="font-size: 13px;">${item.title}</div>
          </div>
      </div>
    `;
  });

  html += `</div>`;
  li.innerHTML = html;
  messageList.appendChild(li);
  scrollToBottom();
};

const renderCouponList = (items) => {
  const li = document.createElement('li');
  li.className = 'p-2 rounded-2 chat-message-item';
  li.style =
    'background: var(--light-primary-color); max-width: 95%; list-style: none; border: 1px dashed var(--primary-color)';

  let html = '';

  items.forEach((item) => {
    html += `
      <div class="d-flex gap-2 align-items-center p-2 border rounded bg-white" style="border: 1px dashed var(--dark-gray-color) !important;">
          <div class="text-center px-1 py-4 h-100 bg-warning text-white rounded fw-bold" style="min-width: 50px; font-size: 12px;">${
            item.valueType === 'percent' ? `${item.value}%` : `${item.value / 1000}K`
          }</div>
          <div class="flex-grow-1">
              <div class="fw-bold text-dark cursor-pointer" style="font-size: 13px;"  onclick="navigator.clipboard.writeText('${
                item.code
              }'); alert('Đã copy mã: ${item.code}')"><i class="fas fa-copy"></i> ${item.code}</div>
              <div class="content-font fs-6" style="font-size: 12px !important;">
                ${item.description}
              </div>
          </div>
      </div>
    `;
  });

  html += `</div>`;
  li.innerHTML = html;
  messageList.appendChild(li);
  scrollToBottom();
};

const renderPostList = (items) => {
  const li = document.createElement('li');
  li.className = 'p-2 rounded-2 chat-message-item';
  li.style = 'background: var(--light-gray-color); max-width: 95%; list-style: none;';

  let html = `
    <div class="d-flex gap-2 align-items-center mb-2">
        <img src="/client/images/chatbot.png" width="30px" />
        <div class="title-font fw-bold" style="font-size: 14px;">Bài viết mới</div>
    </div>
    <div class="d-flex flex-column gap-2">
  `;

  items.forEach((item) => {
    html += `
      <a href="/posts/detail/${
        item.slug
      }" class="d-block p-0 border rounded bg-white text-decoration-none text-dark overflow-hidden">
          <img src="${item.thumbnail}" style="width: 100%; height: 100px; object-fit: cover;">
          <div class="p-2">
              <div class="fw-bold text-truncate" style="font-size: 13px;">${item.title}</div>
              ${
                item.summary
                  ? `<div class="text-muted text-truncate" style="font-size: 11px; font-style: italic;">${item.summary}</div>`
                  : ''
              }
              <div class="text-primary mt-1" style="font-size: 11px;">Đọc ngay <i class="fas fa-arrow-right"></i></div>
          </div>
      </a>
    `;
  });

  html += `</div>`;
  li.innerHTML = html;
  messageList.appendChild(li);
  scrollToBottom();
};

const showTyping = () => {
  const li = document.createElement('li');
  li.className = 'p-2 rounded-2 chat-message-item bot-typing';
  li.style = 'background: var(--light-gray-color, #f2f2f2); width: fit-content; list-style: none;';
  li.innerHTML = `
    <div class="d-flex gap-2 align-items-center">
      <img src="/client/images/chatbot.png" width="20px"/>
      <div class="fst-italic text-muted" style="font-size: 12px;">Đang trả lời...</div>
    </div>
  `;
  messageList.appendChild(li);
  scrollToBottom();
};
const removeTyping = () => {
  const el = document.querySelector('.bot-typing');
  if (el) el.remove();
};

socket.emit('CLIENT_JOIN_CHAT', sessionId);

socket.on('SERVER_SEND_CHATBOT_HISTORY', (history) => {
  messageList.innerHTML = '';
  history.forEach((msg) => {
    if (msg.role === 'user') {
      renderUserMessage(msg.content);
    } else {
      if (msg.content) renderBotMessage(msg.content);

      if (msg.data && msg.data.length > 0) {
        switch (msg.type) {
          case 'product_list':
            renderProductList(msg.data);
            break;
          case 'product_category_list':
            renderProductCategoryList(msg.data);
            break;
          case 'product_brand_list':
            renderProductBrandList(msg.data);
            break;
          case 'coupon_list':
            renderCouponList(msg.data);
            break;
          case 'post_list':
            renderPostList(msg.data);
            break;
          default:
            renderProductList(msg.data);
        }
      }
    }
  });
});

socket.on('SERVER_SEND_CHATBOT_TYPING', (data) => {
  if (data.show) showTyping();
  else removeTyping();
});

socket.on('SERVER_RETURN_CHATBOT_MESSAGE', (res) => {
  if (res.text) renderBotMessage(res.text);

  if (res.data && res.data.length > 0) {
    switch (res.type) {
      case 'product_list':
        renderProductList(res.data);
        break;
      case 'product_category_list':
        renderProductCategoryList(res.data);
        break;
      case 'product_brand_list':
        renderProductBrandList(res.data);
        break;
      case 'coupon_list':
        renderCouponList(res.data);
        break;
      case 'post_list':
        renderPostList(res.data);
        break;
      default:
        renderProductList(res.data);
    }
  }
});

const handleSend = () => {
  const msg = inputField.value.trim();

  if (!msg) return;

  renderUserMessage(msg);
  inputField.value = '';
  inputField.style.height = 'auto';
  socket.emit('CLIENT_SEND_CHATBOT_MESSAGE', { content: msg, sessionId });
};

sendBtn.addEventListener('click', handleSend);
inputField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

chatbotBtn.addEventListener('click', () => {
  chatbotContainer.classList.remove('d-none');
  setTimeout(() => inputField.focus(), 100);
  scrollToBottom();
});
closeBtn.addEventListener('click', () => chatbotContainer.classList.add('d-none'));
