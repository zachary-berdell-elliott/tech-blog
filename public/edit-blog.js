const newFormHandler = (event) => {
    event.preventDefault();
    const title = $('#blog-name').val().trim();
    const content = $('#blog-desc').val().trim();
    const id = event.target.attr("data-id");

    if (title && content) {
      $.ajax({
          url: `/api/blog/${id}`,
          type: 'PUT',
          data: JSON.stringify({ title, content }),
          dataType: 'json',
          success: () => document.location.replace('/'),
          error: () => alert('Failed to create blog post')
      });
    }
}

$('.edit-blog-form').on('submit', newFormHandler);