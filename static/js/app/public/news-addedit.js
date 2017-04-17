$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');
    var fields = [{
        title: "类型",
        field: "type",
        value: "1",
        required: true,
        type: "hidden",
    }, {
        field: "title",
        title: "新闻标题",
        required: true,
        maxlength: 64,
        readonly: view
    }, {
        field: "keywords",
        title: "关键字",
        maxlength: 32,
        readonly: view
    }, {
        field: "content",
        title: "新闻详情",
        type: 'textarea',
        required: true,
        readonly: view
    }, {
        field: "pic",
        title: "新闻缩略图",
        type: 'img',
        required: true,
        readonly: view
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255,
        readonly: view
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        addCode: "619080",
        editCode: "619082",
        detailCode: '619086',
    });

});