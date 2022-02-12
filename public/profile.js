function newFormHandler (event) {
    event.preventDefault();
  
    const title = $('#blog-name').val().trim();
    const content = $('#blog-desc').val().trim();
  
    if (title && content) {
        $.ajax({
                url: `/api/blog`,
                type: 'POST',
                dataType: 'json',
                data: { "title": title, "content": content },
                success: () => document.location.replace('/dashboard'),
                error: () => alert('There was an error creating the blog post')
        });
    }
}
  
function delButtonHandler() {
    const id = $(this).attr('data-id');
  
    $.ajax({
        url: `/api/blog/${id}`,
        type: 'DELETE',
        success: () => document.location.replace('/profile'),
        error: () => alert('Failed to delete blog post')
    }); 
}

$('#blog-form').submit(newFormHandler);
$('.delete-blog').click(delButtonHandler);