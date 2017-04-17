$(function() {



    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '用户名',
        field: 'loginName',
        search: true
    }, {
        title: '手机号',
        field: 'mobile',
        search: true
    }, {
        title: '微信号',
        field: 'nickname',
    }, {
        title: "性别",
        field: "gender",
        formatter: function(v, data) {
            var v = data.userExt.gender;
            if (v == 0) {
                return "未知"
            } else if (v == 1) {
                return "男"
            } else if (v == 2) {
                return "女"
            }
        }
    }, {
        title: "年龄(岁)",
        field: "birthday",
        formatter: function(v, data) {
            return data.userExt.birthday
        }
    }, {
        title: "工龄",
        field: "workTime",
        formatter: function(v, data) {
            if (data.userExt.workTime == "1") {
                return "1年以内"
            } else if (data.userExt.workTime == "2") {
                return "1-3年内"
            } else if (data.userExt.workTime == "3") {
                return "3-5年内"
            } else if (data.userExt.workTime == "5") {
                return "5年以上"
            } else {
                return　　 "-"
            }
        }
    }, {
        title: "地址",
        type: "select",
        field: "province1",
        formatter: function(v, data) {
            var result = (data.userExt.province || "") + (data.userExt.city || "") + (data.userExt.area || "") + (data.userExt.address || "");
            return result || "-";
        }
    }, {
        title: "有无电工证",
        field: "diploma",
        formatter: function(v, data) {
            var v = data.userExt.diploma;
            if (v == 0) {
                return "无"
            } else if (v == 1) {
                return "有"
            }
        }
    }, {
        title: "状态",
        field: 'status',
        type: "select",
        key: "account_status",
        search: true,
        formatter: Dict.getNameForList("account_status")
    }, {
        title: '备注',
        field: 'remark'
    }];
    buildList({
        router: 'member',
        columns: columns,
        pageCode: '805054',
        searchParams: {
            kind: "f1"
        }
    });
    $('#commentBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "comment.html?userId=" + selRecords[0].userId;
    });
    $('#lockBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections')
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 2) {
            toastr.info("该账户已被注销");
            return;
        }
        var status = selRecords[0].status,
            toStatus;
        status == 0 ? toStatus = 2 : toStatus = 0;
        confirm("确定注销该账户？").then(function() {
            reqApi({
                code: '805052',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: toStatus
                }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });

        });
    });
    $('#activeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 0) {
            toastr.info("该账户是已正常状态");
            return;
        }
        confirm("确定激活该账户？").then(function() {
            reqApi({
                code: '805052',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: '0'
                }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });

        });
    });
});