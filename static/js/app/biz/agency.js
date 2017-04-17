$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '账户名',
        field: 'loginName',
        search: true
    }, {
        title: '经销商名称',
        field: 'name',
        search: true
    }, {
        title: '负责人',
        field: 'owner',
        search: true
    }, {
        title: '联系方式',
        field: 'contact',
    }, {
        title: '信息通知手机',
        field: 'mobile',
    }, {
        title: "地址",
        type: "select",
        field: "province1",
        formatter: function(v, data) {
            var result = (data.province || "") + (data.city || "") + (data.area || "") + (data.address || "");
            return result || "-";
        },
        // afterSet: function(v, data) {
        //     if (view) {
        //         $('#province').html(data.province);
        //         data.city && $('#city').html(data.city);
        //         data.area && $('#area').html(data.area);
        //         data.address && $("#address").html(data.address);
        //     }
        // },
    }, {
        title: "状态",
        field: 'status',
        type: "select",
        key: "dealer_status",
        search: true,
        formatter: Dict.getNameForList("dealer_status")
    }];
    buildList({
        router: 'agency',
        columns: columns,
        pageCode: '619010',
    });

    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            toastr.info("该经销商已上架");
            return;
        }
        confirm("确认上架该经销商？").then(function() {
            reqApi({
                code: '619002',
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
            toastr.info("该经销商还未上架");
            return;
        }
        confirm("确认下架该经销商？").then(function() {
            reqApi({
                code: '619003',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });
    $('#edit2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            toastr.info("已上架，不可以修改信息");
            return;
        }
        window.location.href = "agency_addedit.html?Code=" + selRecords[0].code;
    });

    $('#delete2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        //var msg = selRecords[0].status == 1 ? "确认下架该活动？": "确认上架该活动？";
        if (selRecords[0].status == 1) {
            toastr.info("已上架，不能删除该记录");
            return;
        }
        confirm("确定删除该记录？").then(function() {
            reqApi({
                code: '618081',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });
    //
    $('#needBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        //var msg = selRecords[0].status == 1 ? "确认下架该活动？": "确认上架该活动？";
        // if (selRecords[0].status == 1) {
        //     toastr.info("已上架，不能删除该记录");
        //     return;
        // }
        window.location.href = "agency_addedit.html?Code=" + selRecords[0].code;

    });
    $("#needBtn").remove();
});