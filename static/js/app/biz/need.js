$(function() {
    var userId = getUserId();

    var code1;

    reqApi({
        code: "619013",
        json: { userId },
        sync: true
    }).then(function(data) {
        code1 = data.code;
    });
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '需求类型',
        field: 'type',
        type: "select",
        key: "demand_type",
        search: true,
        formatter: Dict.getNameForList("demand_type")
    },{
        title: '需求简述',
        field: 'summary',

    }, {
        title: '开始时间',
        field: 'startDatetime',
        type: "datetime",
        formatter: dateTimeFormat,

        required: true
    }, {
        title: '结束时间',
        field: 'endDatetime',
        type: "datetime",
        formatter: dateTimeFormat,

        required: true
    }, {
        title: "地址",
        type: "select",
        field: "province1",
        formatter: function(v, data) {
            var result = (data.province || "") + (data.city || "") + (data.area || "") + (data.address || "");
            return result || "-";
        }
    }, {
        title: '价格',
        field: 'price'
    }, {
        title: "状态",
        field: "status",
        type: 'select',
        key: 'demand_status',
        search: true,
        formatter: Dict.getNameForList("demand_status")
    }];
    buildList({
        router: 'need',
        columns: columns,
        pageCode: '619030',
        searchParams: {
            dealerCode: code1
        }
        //deleteCode: ''
    });

    $('#delete2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 0) {
            toastr.info("不是可以删除的状态");
            return;
        }
        confirm("确定删除该记录？").then(function() {
            reqApi({
                code: '619021',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 1) {
            toastr.info("还未上架");
            return;
        }
        confirm("确定下架该记录？").then(function() {
            reqApi({
                code: '619024',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });
    //
    $('#edit2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 0 && selRecords[0].status != 2) {
            toastr.info("不是可以修改的状态");
            return;
        }
        window.location.href = "need_addedit.html?Code=" + selRecords[0].code;
    });
    $('#releaseBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 0 && selRecords[0].status != 2 && selRecords[0].status != 5) {
            toastr.info("不是待发布的状态");
            return;
        }
        confirm("确定发布该需求？").then(function() {
            reqApi({
                code: '619023',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });
    $('#sendBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if ( !(selRecords[0].status == 0 || selRecords[0].status == 1 || selRecords[0].status == 2 || selRecords[0].status == 5)) {
            toastr.info("不是可以派单的状态");
            return;
        }
        window.location.href = "need_receive.html?code=" + selRecords[0].code;

    });
    $('#shdetailBtn').remove();
    $('#commentBtn').remove();
});
