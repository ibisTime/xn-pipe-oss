$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var dealerCode = getQueryString('dealerCode');

    // var Status=Dict.getNameForList("order_status");


    var fields = [{
        title: "订单编号",
        field: 'code1',
        formatter: function(v, data) {
            return data.code;
        },
        readonly: true,
    }, {
        title: '发单时间',
        field: '',
        formatter: dateTimeFormat,
        readonly: true,

    }, {
        title: '接单人',
        field: 'receiver',
        readonly: true,
    }, {
        title: "接单人联系方式",
        field: "contact",
        readonly: true,
        // formatter: function(v, data) {

        // }
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
        title: "备注",
        maxlength: 255,
        field: "remark",
        required: true,
    }, {
        field: "dealerCode",
        value: "dealerCode",
        required: true,
        type: "hidden"
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
                        code: "619061",
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