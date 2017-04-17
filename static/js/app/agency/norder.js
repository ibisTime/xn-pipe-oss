$(function() {
    //var userId = getUserId();

    // var code1;
    // reqApi({
    //     code: "619013",
    //     json: { userId },
    //     sync: true
    // }).then(function(data) {
    //     code1 = data.code;
    // });



    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "订单编号",
        field: 'code',

    }, {
        title: '经销商名称',
        field: 'dealer',
        formatter: function(v, data) {
            return data.dealer.name;
        }

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
        // searchParams: {
        //     dealerCode: code1
        // }

    });


});