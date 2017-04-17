$(function() {
    var view = 1;

    reqApi({
        code: '802503',
        json: {
            userId: getUserId()
        }
    }).done(function(data) {
        $("#amount-JF").text(data[1].amount / 1000 + "积分");
        $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
    });

    $('#grantBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"></ul>' +
                '</form>'
        });

        dw.showModal();
        buildDetail({
            fields: [{
                title: '发放用户',
                field: 'mobile',
                type: 'select',
                listCode: "805055",
                params: {
                    //userReferee: getUserId(),
                    kind: "f1",
                    updater: ""
                },
                keyName: 'mobile',
                valueName: '{{nickname.DATA}}--{{mobile.DATA}}',
                searchName: "mobile",
                required: true
            }, {
                title: '数量',
                field: 'amount',
                amount: true,
                min: 0,
                formatter: moneyFormat,
                required: true
            }],
            container: $('#formContainer'),
            buttons: [{
                title: '发放',
                handler: function() {
                    if ($('#popForm').valid()) {

                        var data = $('#popForm').serializeObject();
                        data.storeOwner = getUserId();
                        data.currency = "JF";
                        reqApi({
                            code: '802400',
                            json: data
                        }).done(function(data) {
                            sucList();
                            dw.close().remove();
                            $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                        });
                    }
                }
            }, {
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });
        dw.__center();
    });
    $("#accountBtn").click(
        function() {
            window.location.href = 'account_detail.html'
        }
    );

    // $('#purchaseBtn-JF').click(function() {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     var dw = dialog({
    //         content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
    //             '<ul class="form-info" id="formContainer"></ul>' +
    //             '</form>'
    //     });

    //     dw.showModal();
    //     buildDetail({
    //         fields: [{
    //             title: '购买数量',
    //             field: 'amount',
    //             formatter: moneyFormat,
    //             required: true,
    //             onKeyup: function(v) {
    //                 $("#price").html(v * 1);
    //             }
    //         }, {
    //             title: '金额',
    //             field: 'price',
    //             formatter: moneyFormat,
    //             readonly: view
    //         }],
    //         container: $('#formContainer'),
    //         buttons: [{
    //             title: '购买',
    //             handler: function() {
    //                 if ($('#popForm').valid()) {

    //                     var data = $('#popForm').serializeObject();

    //                     if (data.length <= 0) {
    //                         toastr.info("请选择记录");
    //                         return;
    //                     }

    //                     data.fromUserId = getUserId();
    //                     data.toUserId = OSS.SYS_USER;
    //                     data.currency = "CGB";
    //                     reqApi({
    //                         code: '802530',
    //                         json: data
    //                     }).done(function(data) {
    //                         sucList();

    //                         dw.close().remove();
    //                         var dw1 = dialog({
    //                             title: '扫描微信二维码付款',
    //                             content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
    //                                 '<div id="qrcode"></div></form>',
    //                             quickClose: true,
    //                         });

    //                         dw1.showModal();

    //                         var qrcode = new QRCode('qrcode', data);
    //                         qrcode.makeCode(data);

    //                     });

    //                 }
    //             }
    //         }, {
    //             title: '取消',
    //             handler: function() {
    //                 dw.close().remove();
    //             }
    //         }]
    //     });
    //     dw.__center();
    //     h = "<br/><p class='huilv'>当前汇率1</p>";
    //     $(h).insertAfter("#amount");
    // });


});