$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: '评论内容',
        field: 'content',
    }, {
        title: '评论时间',
        field: 'commDatetime',
        formatter: dateTimeFormat
    }, {
        title: '评价人',
        field: 'commentator',
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,

        // addCode: "806040",
        // editCode: "806042",
        detailCode: '619096'
    });

});