$(function() {
    var userId = getUserId();
    var code = getQueryString('userId');
    var view = !!getQueryString('v');

    var fields = [{
        title: '账户名',
        field: 'loginName',
        maxlength: 255,
        required: true,
        readonly: true
    }, {
        title: '名称',
        field: 'name',
        required: true,
        readonly: true
    }, {
        title: "地址",
        type: "select",
        field: "province1",
        readonly: true,
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
        title: '负责人',
        field: 'owner',
        required: true,
        readonly: true
    }, {
        title: '联系方式',
        field: 'contact',
        required: true,
        readonly: true
    }, {
        title: '状态',
        field: 'status',
        type: 'select',
        key: "dealer_status",
        formatter: Dict.getNameForList("dealer_status"),
        required: true,
        readonly: true
    }, {
        title: '信息通知手机',
        field: 'mobile',
        mobile: true,
        required: true,
        readonly: view,
    }, {
        title: '缩略展示图',
        field: 'pic',
        type: 'img',
        required: true,
        readonly: view
    }, {
        title: '图文详述 ',
        field: 'detail',
        type: 'textarea',
        required: true,
        readonly: view
    }];

    var options = {
        fields: fields,
        code: {
            userId: userId
        },
        // userId: userId,

        view: view,
        detailCode: '619013',
    };

    options.buttons = [{
        title: '保存修改',
        handler: function() {
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
                reqApi({
                    code: "619004",
                    json: data
                }).done(function() {
                    toastr.success('操作成功');
                });
            }
        }
    }];

    buildDetail(options);

});