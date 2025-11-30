const panelCommentBox = document.querySelector('.panel-body.comment-box-list');

if (panelCommentBox) {
  panelCommentBox.addEventListener('click', (e) => {
    const buttonRemoveComment = e.target.closest('a.btn-remove-comment');
    if (!buttonRemoveComment) return;

    const id = buttonRemoveComment.dataset.id;
    const userId = buttonRemoveComment.dataset.userId;

    if (!id) {
      alert('Không tìm thấy bình luận.');
      return;
    }

    socket.emit('CLIENT_REMOVE_COMMENT', { id, user_id: userId });
  });

  socket.on('CLIENT_DELETE_COMMENT', (comment) => {
    if (!comment) return;

    const commentBlock = panelCommentBox
      .querySelector(
        `.btn-remove-comment[data-id="${comment.productCommentId}"][data-user-id="${comment.productCommentUserId}"]`
      )
      ?.closest('.media-block-comment');

    if (commentBlock) {
      commentBlock.remove();
    }
  });
}
