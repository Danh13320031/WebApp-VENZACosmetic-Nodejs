const btnCommentOwner = document.getElementById('btn-comment-owner');

const createBlockComment = (comment) => {
  const blockComment = `
    <a class="media-left" href="#"
      ><img
        class="img-circle img-sm me-2"
        alt="Profile Picture"
        src="${comment.userComment.avatar}"
    /></a>
    <div class="media-body">
      <div class="mar-btm">
        <a
          href="#"
          class="title-font text-decoration-none btn-link text-semibold media-heading box-inline"
          style="color: var(--primary-color)"
        >
          ${comment.userComment.fullname}
        </a>
        <p class="text-muted text-sm">${comment.createdAt}</p>
      </div>
      <p class="content-font">${comment.productComment.content}</p>
      <div class="pad-ver">
        <div class="btn-group">
          <a class="btn btn-sm btn-default btn-hover-success" href="#">
            <i class="fa fa-thumbs-up"></i>
          </a>
          <a class="btn btn-sm btn-default btn-hover-danger" href="#">
            <i class="fa fa-thumbs-down"></i>
          </a>
          <a
            href="javascript:void(0)"
            class="btn btn-sm btn-default btn-hover-danger btn-remove-comment"
            data-id="${comment.productComment._id}"
            data-user-id="${comment.userComment._id}"
          >
            Xóa
          </a>
        </div>
      </div>
      <hr />
    </div>
  `;

  return blockComment;
};

if (btnCommentOwner) {
  btnCommentOwner.addEventListener('click', () => {
    const textareaCommentOwner = document.getElementById('textarea-comment-owner');
    const commentValue = textareaCommentOwner.value.trim();
    const productId = textareaCommentOwner.getAttribute('data-product-id');
    const userId = textareaCommentOwner.getAttribute('data-user-id');

    if (!commentValue) {
      alert('Vui lòng nhập bình luận.');
      return;
    }
    if (!userId) window.location.href = '/login';
    if (!productId) window.location.href = '/error/404';

    const confirm = window.confirm(
      'Để tránh các bình luận tiêu cực, bình luận của bạn sẽ được kiểm duyệt'
    );
    if (!confirm) return;

    const data = {
      content: commentValue,
      product_id: productId,
      user_id: userId,
    };

    if (socket && textareaCommentOwner) {
      socket.emit('sendComment', data);
      textareaCommentOwner.value = '';
    }
  });
}

socket.off('newComment');
socket.on('newComment', (comment) => {
  if (comment === null) {
    window.location.href = '/login';
    return;
  }

  const panelCommentBox = document.querySelector('.panel-body.comment-box-list');
  if (!panelCommentBox) return;

  const mediaBlock = document.createElement('div');

  mediaBlock.classList.add('py-3');
  mediaBlock.classList.add('media-block');
  mediaBlock.classList.add('media-block-comment');
  mediaBlock.innerHTML = createBlockComment(comment);
  panelCommentBox.insertBefore(mediaBlock, panelCommentBox.firstChild);
});
