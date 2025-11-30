const buttonChatBoxToggle = document.getElementById('button-chatbot');
const chatBoxHeaderClose = document.getElementById('chatbot-header-close');

if (buttonChatBoxToggle) {
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotInputTextArea = document.getElementById('chatbot-input-textarea');

  if (
    window.localStorage.getItem('chatbot').includes('show') &&
    !window.localStorage.getItem('chatbot').includes('d-none')
  ) {
    chatbotContainer
      ? chatbotContainer.classList.remove('d-none')
      : chatbotContainer.classList.add('d-none');
    chatbotContainer
      ? chatbotContainer.classList.add('show')
      : chatbotContainer.classList.remove('show');
    chatbotInputTextArea ? chatbotInputTextArea.focus() : chatbotInputTextArea.blur();
  } else {
    chatbotContainer
      ? chatbotContainer.classList.add('d-none')
      : chatbotContainer.classList.remove('d-none');
    chatbotContainer
      ? chatbotContainer.classList.remove('show')
      : chatbotContainer.classList.add('show');
    chatbotInputTextArea ? chatbotInputTextArea.blur() : chatbotInputTextArea.focus();
  }

  const showChatBox = () => {
    if (!chatbotContainer) return;

    chatbotContainer.classList.toggle('d-none');
    chatbotContainer.classList.toggle('show');
    window.localStorage.setItem('chatbot', chatbotContainer.getAttribute('class'));
  };

  buttonChatBoxToggle.addEventListener('click', showChatBox);
}

if (chatBoxHeaderClose) {
  chatBoxHeaderClose.addEventListener('click', () => {
    const chatbotContainer = document.getElementById('chatbot-container');

    if (!chatbotContainer) return;

    chatbotContainer.classList.add('d-none');
    chatbotContainer.classList.remove('show');
    window.localStorage.setItem('chatbot', chatbotContainer.getAttribute('class'));
  });
}
