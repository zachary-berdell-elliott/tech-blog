$('#comment-creator').submit(function(event){
    event.preventDefault();
    var commentText = $('#comment-entry').val();
    var blogId = $(this).siblings('#blog-content').attr('data-id');

    $.ajax({
        url: '/api/comments',
        dataType: 'json',
        type: 'POST',
        data: {
            "blog_id": parseInt(blogId),
            "comment_content": commentText
        },

       success: () => {
           document.location.replace(window.location.href);
       },

        error: function(){
            alert("There was an error sending your comment. Please try again later.");
        }
    });
});