$(function() {
    var code = getQueryString('code');

    var fields = [{
        title: 'UI位置',
        field: 'location',
        type: "hidden",
        value: "1",
        key: "news2_location",
        // formatter: Dict.getNameForList("news2_location"),
        required: true,

    }, {
        title: 'UI次序',
        field: 'orderNo',
        number: true,
        required: true
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '619086',

    };

    options.buttons = [{
            title: '确定',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data["code"] = code;
                    confirm("确认上架该新闻？").then(function() {
                        reqApi({
                            code: "619083",
                            json: data
                        }).done(function() {
                            sucDetail();
                        });
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