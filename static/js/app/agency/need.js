$(function() {
    var userId = getUserId();


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '需求类型',
        field: 'type',
        type: "select",
        key: "demand_type",
        search: true,
        formatter: Dict.getNameForList("demand_type")
    }, {
        title: '经销商名称',
        field: 'name',
        formatter: function(v, data) {
            return data.dealer.name;
        }

    }, {
        title: '需求简述',
        field: 'summary',

    }, {
        title: '开始时间',
        field: 'startDatetime',
        type: "datetime",
        formatter: dateTimeFormat,

        required: true
    }, {
        title: '结束时间',
        field: 'endDatetime',
        type: "datetime",
        formatter: dateTimeFormat,

        required: true
    }, {
        title: "地址",
        type: "select",
        field: "province1",
        formatter: function(v, data) {
            var result = (data.province || "") + (data.city || "") + (data.area || "") + (data.address || "");
            return result || "-";
        },
        afterSet: function(v, data) {
            if (view) {
                $('#province').html(data.province);
                data.city && $('#city').html(data.city);
                data.area && $('#area').html(data.area);
                data.address && $("#address").html(data.address);
            }
        },
    }, {
        title: '价格',
        field: 'price'
    }, {
        title: "状态",
        field: "status",
        type: 'select',
        key: 'demand_status',
        search: true,
        formatter: Dict.getNameForList("demand_status")
    }];
    buildList({
        router: 'need',
        columns: columns,
        pageCode: '619030',
        // searchParams: {
        //     dealerCode: code1
        // }
        //deleteCode: ''
    });


});