$(function() {
    var userId = getUserId();
    var contentDict = Dict.getNameForList("find_content");
    var code = getQueryString('code');

    var code1;
    var latitude;
    var longitude;

    reqApi({
        code: "619013",
        json: { userId },
        sync: true
    }).then(function(data) {
        code1 = data.code;
        longitude = data.longitude;
        latitude = data.latitude;
    });
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '姓名',
        field: 'nickname',
        formatter: function(v, data) {
            return data.user.nickname
        }
    }, {
        title: '性别',
        field: 'gender',
        type: 'select',
        formatter: function(v, data) {
            var v = data.user.gender;
            if (v == 0) {
                return "女"
            } else if (v == 1) {
                return "男"
            }
        }
    }, {
        title: '年龄',
        field: 'birthday',
        formatter: function(v, data) {
            return data.user.birthday;　
        }

    }, {
        title: '工龄',
        field: 'workTime',
        formatter: function(v, data) {
            if (data.user.workTime == "1") {
                return "1年以内"
            } else if (data.user.workTime == "2") {
                return "1-3年内"
            } else if (data.user.workTime == "3") {
                return "3-5年内"
            } else if (data.user.workTime == "5") {
                return "5年以上"
            }
        }

    }, {
        title: '联系电话',
        field: 'mobile',
        formatter: function(v, data) {
            return data.user.mobile;　
        }
    }, {
        title: "地址",
        type: "select",
        field: "province1",
        formatter: function(v, data) {
            var result = (data.user.province || "") + (data.user.city || "") + (data.user.area || "") + (data.user.address || "");
            return result || "-";
        }
    }, {
        title: '接活范围',
        field: 'content',
        formatter: function(data) {
            var arr = data.split(/,/),
                str = "";
            for (var i = 0; i < arr.length; i++) {
                str += contentDict(arr[i]) + "、";
            }
            return i && str.substr(0, str.length - 1) || "";
        }
    }];
    buildList({
        router: 'need_receive',
        columns: columns,
        pageCode: '619051',
        searchParams: {
            status: "1",
            latitude: latitude,
            longitude: longitude
        }

    });
    $('#delete2Btn').remove();
    $('#edit2Btn').remove();
    $('#delete2Btn').remove();
    $('#detailBtn').remove();
    $('#releaseBtn').remove();
    $('#addBtn').remove();
    $('#shdetailBtn').remove();

    $('#commentBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "need_receiveshui.html?userId=" + selRecords[0].userId;
    });
    $('#releaseBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 0 && selRecords[0].status != 2) {
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
    $('#releaseBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 0 && selRecords[0].status != 2) {
            toastr.info("不是待发布的状态");
            return;
        }
        window.location.href = "need_receive.html?code=" + selRecords[0].code;

    });
    $('#sendBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        reqApi({
            code: '619025',
            json: { "code": code, userId: selRecords[0].userId }
        }).then(function() {
            toastr.info("操作成功");
            // $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            window.location.href = "need.html?userId=" + selRecords[0].userId;
        });
    });
});