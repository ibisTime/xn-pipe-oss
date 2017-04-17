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
        title: '用户',
        field: 'nickName',
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
        title: '年龄(岁)',
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
            var result = (data.user.address || "");
            return result || "-";
        }
    }, {
        title: '接活范围',
        field: 'content',
        formatter: function(data) {
            if (data != "" && data != null) {
                var arr = data.split(/,/),
                    str = "";
                for (var i = 0; i < arr.length; i++) {
                    str += contentDict(arr[i]) + "、";
                }
                return i && str.substr(0, str.length - 1) || "";
            } else {
                return "-";
            }
        }
    }];
    buildList({
        router: 'near',
        columns: columns,
        pageCode: '619051',
        searchParams: {
            latitude: latitude,
            longitude: longitude
        }

    });

});