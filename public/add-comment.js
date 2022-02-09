var commentBtn = $('.comment-btn');
var commentText;

commentBtn.click(function(){
    commentText = $(this).parent().siblings('textarea').val();
    console.log(commentText);
    blogId = $(this).parents('.blog').attr('blog-id');
    console.log(blogId);
    commentAppendSpot = $(this).parent().parent();

    $.ajax({
        url: window.location.href + 'api/comments',
        dataType: 'json',
        type: 'POST',
        data: {
            "post_id": parseInt(blogId),
            "commentContent": commentText,
            "date_created": new Date()
    },
        

        success: function(){
            console.log('comment added successfully');
            console.log(commentAppendSpot);
            userName = $('nav label').text();
            console.log($('nav label').text());
            commentAppendSpot.append(`<article class="comment-block">
                <span>${userName.substr(8).slice(0, -6)}</span>
                <span>${new Date()}</span>
                <p>${commentText}</p>
            </article>`);
        },

        error: function(){
         //   alert("There was an error sending your comment. Please try again later.");
        }
    });
});