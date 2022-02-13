$('#comment-creator').submit(function(){
    const commentText = $('#comment-entry').val();
    console.log(commentText);
    blogId = $(this).siblings('#blog-content').attr('blog-id');
    console.log(blogId);

    $.ajax({
        url: window.location.href + 'api/comments',
        dataType: 'json',
        type: 'POST',
        data: {
            "blog_id": parseInt(blogId),
            "commentContent": commentText,
            "date_created": new Date()
        },

        success: () => document.location.replace(window.location.href),

        error: function(){
         //   alert("There was an error sending your comment. Please try again later.");
        }
    });
});