$(function() {
    //var userId = getUserId();
    var userId = getQueryString('userId');
    // var code1;
    // reqApi({
    //     code: "619013",
    //     json: { userId },
    //     sync: true
    // }).then(function(data) {
    //     code1 = data.code;
    // });



    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "经销商",
        field: 'commentator',
    }, {
        title: '评论内容',
        field: 'content',
    }, {
        title: '评论时间',
        field: 'commDatetime',
        formatter: dateTimeFormat
    }];
    buildList({
        router: 'need_receiveshui',
        columns: columns,
        pageCode: '619095',
        // code: code,
        searchParams: {
            entityCode: userId,
        }

    });




    $('#delete2Btn').remove();
    $('#edit2Btn').remove();
    $('#delete2Btn').remove();
    $('#detailBtn').remove();
    $('#releaseBtn').remove();
    $('#addBtn').remove();
    $("#sendBtn").remove();
    $('#shdetailBtn').remove();
    $("#commentBtn").remove();
});