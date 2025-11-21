const buttonChatBoxToggle = document.getElementById('button-chatbot');
const chatBoxHeaderClose = document.getElementById('chatbot-header-close');

console.log(socket);

if (buttonChatBoxToggle) {
  const chatbotContainer = document.getElementById('chatbot-container');

  if (window.localStorage.getItem('chatbot').includes('show')) {
    chatbotContainer.classList.add('show');
  } else {
    chatbotContainer.classList.remove('show');
  }

  const showChatBox = () => {
    if (!chatbotContainer) return;

    chatbotContainer.classList.toggle('show');
    window.localStorage.setItem('chatbot', chatbotContainer.getAttribute('class'));
  };

  buttonChatBoxToggle.addEventListener('click', showChatBox);
}

if (chatBoxHeaderClose) {
  chatBoxHeaderClose.addEventListener('click', () => {
    const chatbotContainer = document.getElementById('chatbot-container');

    if (!chatbotContainer) return;

    chatbotContainer.classList.remove('show');
    window.localStorage.setItem('chatbot', chatbotContainer.getAttribute('class'));
  });
}
