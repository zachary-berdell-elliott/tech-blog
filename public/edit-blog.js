function newFormHandler (event) {
    event.preventDefault();
    const title = $('#blog-name').val().trim();
    const content = $('#blog-desc').val().trim();
    const id = $(this).attr("data-id");
    const urlText = window.location.href.substring(0, window.location.href.indexOf('/blog'));
    console.log(title, content)

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