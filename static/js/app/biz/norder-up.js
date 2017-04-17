$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    // var Status=Dict.getNameForList("order_status");


    var fields = [{
        title: "订单编号",
        field: 'code1',
        formatter: function(v, data) {
            return data.code;
        },
        readonly: true,
    }, {
        title: '需求时间',
        field: 'time',
        formatter: function(v, data) {
            return dateTimeFormat(data.demand.startDatetime) + "--" +
                dateTimeFormat(data.demand.endDatetime);
        },
        readonly: true,

    }, {
        title: '接单人',
        field: 'nickname',
        formatter: function(v, data) {
            return data.user.nickname;
        },
        readonly: true,
    }, {
        title: "接单人联系方式",
        field: "contact",
        readonly: true,
        formatter: function(v, data) {
            return data.user.mobile;
        }
    }, {
        title: '接单时间',
        field: 'receiveDatetime',
        formatter: dateTimeFormat,
        readonly: true,

    }, {
        title: "状态",
        field: "status",
        type: "select",
        readonly: true,
        key: "demand_order_status",
        formatter: Dict.getNameForList("demand_order_status")
    }, {
        title: "评价水电工",
        field: "evaluate",
        required: true,
        type: "textarea",
        normalArea: true,
        maxlength: 255,

    }, {
        title: '赠送积分数量',
        field: 'giveIntegral',
        amount: true,
        required: true,

    }, {
        title: "备注",
        maxlength: 255,
        field: "remark",
        required: true,
    }];


    var options = {
        fields: fields,
        code: code,
        detailCode: '619072',

    };

    options.buttons = [{
            title: '确定',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    // data["code"] = code;
                    reqApi({
                        code: "619062",
                        json: data
                    }).done(function() {
                        sucDetail();
                    });
                }
            }
        },
        {
            title: '返回',
            handler: function() {
                goBack();
            }
        }
    ];

    buildDetail(options);
});