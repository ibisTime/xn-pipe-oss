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
        title: "订单编号",
        field: 'code',

    }, {
        title: "需求简述",
        field: "summary",
        formatter: function(v, data) {
            return data.demand.summary;
        }
    }, {
        title: '接单人',
        field: 'mobile',
        formatter: function(v, data) {
            return data.user.mobile;
        },
        search: true
    }, {
        title: '接单时间',
        field: 'receiveDatetime',
        formatter: dateTimeFormat

    }, {
        title: "状态",
        field: "status",
        type: "select",
        search: true,
        key: "demand_order_status",
        formatter: Dict.getNameForList("demand_order_status")
    }, {
        title: "备注",
        field: "remark",

    }];
    buildList({
        router: 'norder',
        columns: columns,
        pageCode: '619070',
        searchParams: {
            dealerCode: code1
        }

    });

    $('#succBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 0) {
            toastr.info("该订单不是可以完成的状态");
            return;
        }
        window.location.href = "norder_up.html?Code=" + selRecords[0].code;
    });


    $('#cancelBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 0) {
            toastr.info("该订单不是可以完成的状态");
            return;
        }
        window.location.href = "norder_cancel.html?Code=" + selRecords[0].code + "&dealerCode" + +selRecords[0].dealerCode;

    });
});