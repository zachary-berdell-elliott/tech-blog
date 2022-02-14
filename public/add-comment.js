$('#comment-creator').submit(function(event){
    event.preventDefault
    const commentText = $('#comment-entry').val();
    console.log(commentText);
    blogId = $(this).siblings('#blog-content').attr('blog-id');
    const urlText = window.location.href.substring(0, window.location.href.indexOf('/blog'));

    $.ajax({
        url: urlText + 'api/comments',
        dataType: 'json',
        type: 'POST',
        data: {
            "blog_id": parseInt(blogId),
            "commentContent": commentText,
            "date_created": new Date()
        },

       // success: () => document.location.replace(window.location.href),

        error: function(){
         //   alert("There was an error sending your comment. Please try again later.");
        }
    });
});