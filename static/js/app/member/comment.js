$(function() {
    //var userId = getUserId();
    var userId = getQueryString('userId');
    var code = getQueryString('code');

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
    }, {
        title: '评论时间',
        field: 'commDatetime',
        formatter: dateTimeFormat
    }];
    buildList({
        router: 'comment',
        columns: columns,
        pageCode: '619095',
        searchParams: {
            entityCode: userId
        }

    });
    $("#commentBtn").remove();




});