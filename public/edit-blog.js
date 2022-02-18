function newFormHandler (event) {
    event.preventDefault();
    const title = $('#blog-name').val().trim();
    const content = $('#blog-desc').val().trim();
    const id = $(this).attr("data-id");

    if (title && content) {
      $.ajax({
          url:  `/api/blog/${id}`,
          type: 'PUT',
          dataType: 'json',
          data: {"title": title, "content": content },
          success: () => document.location.replace(`/blog/${id}`),
          error: () => alert('Failed to create blog post')
      });
    }
}

$('.edit-blog-form').on('submit', newFormHandler);