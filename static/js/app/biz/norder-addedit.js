$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    // var Status=Dict.getNameForList("order_status");


    var fields = [{
            title: "订单编号",
            field: 'code1',
            formatter: function(v, data) {
                return code;
            },
            readonly: true,
        }, {
            title: "接单人手机号",
            field: "contact",
            readonly: true,
            formatter: function(v, data) {
                return data.user.mobile;
            },
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
            title: '需求时间',
            field: 'startDatetime',
            formatter: function(v, data) {
                return dateTimeFormat(data.demand.startDatetime) + "--" +
                    dateTimeFormat(data.demand.endDatetime);
            },
            readonly: true,

        }, {
            title: "地点",
            type: "select",
            field: "province1",
            readonly: true,
            formatter: function(v, data) {
                var result = (data.demand.province || "") + (data.demand.city || "") + (data.demand.area || "") + (data.demand.address || "");
                return result || "-";
            },
            afterSet: function(v, data) {
                if (view) {
                    $('#province').html(data.demand.province);
                    data.demand.city && $('#city').html(data.demand.city);
                    data.demand.area && $('#area').html(data.demand.area);
                    data.demand.address && $("#detail").html(data.demand.address);
                }
            },
        }, {
            title: '价格区间',
            field: "price",
            readonly: true,
            formatter: function(v, data) {
                return data.demand.price
            },
        }, {
            title: '需求简述',
            field: 'summary',
            formatter: function(v, data) {
                return data.demand.summary
            },
            readonly: true,
        }, {
            title: '需求详述',
            field: 'detail',
            type: "textarea",
            normalArea: true,
            formatter: function(v, data) {
                return data.demand.detail
            },
            readonly: true,
        }, {
            title: "备注",
            field: "remark",
            readonly: true,
        }, {
            title: '施工图',
            field: 'pic',
            type: 'img',
            required: true,
            readonly: view
        }
    ];


    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '619072'
    });
});
