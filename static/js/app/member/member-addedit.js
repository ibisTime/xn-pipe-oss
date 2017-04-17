$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
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
        title: "年龄",
        field: "birthday",
        formatter: function(v, data) {
            return data.userExt.birthday
        }
    }, {
        title: "工龄(年)",
        field: "workTime",
        formatter: function(v, data) {
            return data.userExt.workTime
        }
    }, {
        title: "地址",
        type: "select",
        field: "province1",
        formatter: function(v, data) {
            var result = (data.userExt.province || "") + (data.userExt.city || "") + (data.userExt.area || "") + (data.userExt.address || "");
            return result || "-";
        },
        afterSet: function(v, data) {
            if (view) {
                $('#province').html(data.userExt.province);
                data.userExt.city && $('#city').html(data.userExt.city);
                data.userExt.area && $('#area').html(data.userExt.area);
                data.userExt.address && $('#address').html(data.userExt.address);
            }
        },
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
        title: '积分余额',
        field: 'ljAmount',
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

    buildDetail({
        fields: fields,
        code: {
            userId: code
        },
        view: view,
        // code: code,
        detailCode: '805056'
    });

});