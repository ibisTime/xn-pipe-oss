$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var userId = getUserId();

    var code1;
    reqApi({
        code: "619013",
        json: { userId },
        sync: true
    }).then(function(data) {
        code1 = data.code;
    });
    var start = {
        elem: '#startDatetime',
        format: 'YYYY-MM-DD',
        min: laydate.now(), //设定最小日期为当前日期
        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateFormat(d);
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
        }
    };
    var end = {
        elem: '#endDatetime',
        format: 'YYYY-MM-DD',
        min: laydate.now(),
        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateFormat(d);
            start.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };

    var fields = [{
        title: "经销商编号",
        field: "dealerCode",
        value: code1,
        type: "hidden",
        required: true,
    }, {
        title: '需求类型',
        field: 'type',
        type: "select",
        key: "demand_type",
        required: true,
        readonly: view,
        // formatter: Dict.getNameForList("demand_type")
    }, {
        title: '开始时间',
        field: 'startDatetime',
        type: "datetime",
        formatter: dateTimeFormat,
        dateOption: start,
        readonly: view,
        required: true
    }, {
        title: '结束时间',
        field: 'endDatetime',
        type: "datetime",
        dateOption: end,
        formatter: dateTimeFormat,
        readonly: view,
        required: true
    }, {
        title: '地点',
        field: "province1",
        required: true,
        type: 'citySelect',
        readonly: view,
    }, {
        title: '详细地址',
        field: 'address',
        required: true,
        maxlength: 255,
        readonly: view
    }, {
        title: '经度',
        field: 'longitude',
        west: true,
        readonly: view,
        hidden: !view
    }, {
        title: "纬度",
        field: 'latitude',
        north: true,
        readonly: view,
        hidden: !view
    }, {
        title: "价格",
        field: 'price',
        required: true,
        // amount: true,
        // formatter: moneyFormat,
        readonly: view
    }, {
        title: '缩略展示图',
        field: 'pic',
        type: 'img',
        required: true,
        readonly: view
    }, {
        title: '简述',
        field: 'summary',
        maxlength: 255,
        readonly: view,
        required: true
    }, {
        title: '详述',
        field: 'detail',
        type: "textarea",
        normalArea: true,
        required: true,
        readonly: view,
    }];


    var options = {
        fields: fields,
        code: code,
        view: view,
        addCode: "619020",
        editCode: "619022",
        detailCode: '619032',
    };

    buildDetail(options);

    $('#subBtn').off("click").click(function() {
        if ($('#jsForm').valid()) {
            var data = $('#jsForm').serializeObject();
            $('#jsForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
                var values = [];
                var imgs = $(el).find('.img-ctn');
                imgs.each(function(index, img) {
                    values.push($(img).attr('data-src') || $(img).find('img').attr('src'));
                });
                data[el.id] = values.join('||');
            });
            if ($('#jsForm').find('#province')[0]) {
                var province = $('#province').val();
                var city = $('#city').val();
                var area = $('#area').val();
                if (!city) {
                    data['city'] = province;
                    data['area'] = province;
                } else if (!area) {
                    data['city'] = province;
                    data['area'] = city;
                }
            }
            for (var i = 0, len = fields.length; i < len; i++) {
                var item = fields[i];
                if (item.equal && (!$('#' + item.field).is(':hidden') || !$('#' + item.field + 'Img').is(':hidden'))) {
                    data[item.equal] = $('#' + item.field).val() || $('#' + item.field).attr('src');
                } else if (item.emptyValue && !data[item.field]) {
                    data[item.field] = item.emptyValue;
                } else if (item.readonly && item.pass) {
                    data[item.field] = $('#' + item.field).attr('data-value') || $('#' + item.field).html();
                }
                if (item.type == 'select' && item.passValue) {
                    data[item.field] = $('#' + item.field).find('option:selected').html();
                }
                if (item.type == "checkbox") {
                    data[item.field] = $.isArray(data[item.field]) ? data[item.field].join(",") : data[item.field];
                }
            }
            data['id'] = data['code'];

            var addr = data.province + data.city + data.area + data.detail;
            var myGeo = new BMap.Geocoder();
            myGeo.getPoint(addr, function(point) {
                if (point) {
                    data.longitude = point.lng;
                    data.latitude = point.lat;
                    reqApi({
                        code: code ? options.editCode : options.addCode,
                        json: data
                    }).done(function(data) {
                        sucDetail();
                    });
                } else {
                    alert("无法解析当前地址的经纬度!");
                }
            });

        }
    });
});