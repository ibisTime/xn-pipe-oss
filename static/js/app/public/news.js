$(function() {

    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: "title",
            title: "新闻标题",
            search: true
        }, {
            field: "keywords",
            title: "关键字",
            search: true
        },

        {
            field: 'updateDatetime',
            title: '更新时间',
            formatter: dateTimeFormat
        }, {
            field: 'status',
            title: '状态',
            type: "select",
            key: 'news2_status',
            formatter: Dict.getNameForList("news2_status"),
        }, {
            field: "remark",
            title: "备注",
        }
    ];
    buildList({
        router: 'news',
        columns: columns,
        pageCode: '619085',
        deleteCode: "619081"
    });
    $('#frarmeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            toastr.info("该条新闻已经上架");
            return;
        }
        window.location.href = "news_up.html?code=" + selRecords[0].code;

    });
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            confirm("确认下架该新闻？").then(function() {
                reqApi({
                    code: '619084',
                    json: { "code": selRecords[0].code }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });

                });
            });

        } else {
            toastr.info("该新闻不是待下架状态");
            return;
        }

    });
    $('#edit2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            toastr.info("请先下架，再修改信息");
            return;
        }

        window.location.href = "news_addedit.html?code=" + selRecords[0].code;

    });

    $('#delete2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            toastr.info("已上架，不可删除新闻");
            return;
        }

        confirm("确认删除该新闻？").then(function() {
            reqApi({
                code: '619081',
                json: { "code": selRecords[0].code, }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });

            });
        });

    });
});