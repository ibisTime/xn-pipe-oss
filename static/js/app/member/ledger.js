$(function() {
    var accountCode = getQueryString('accountCode') || '';
    var type = getQueryString('type'); //CNY XNB


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '用户名',
        search: true
    }, {
        field: 'accountNumber',
        title: '账号'
    }, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
        keyCode: "802006",
        formatter: Dict.getNameForList('channel_type', '802006')
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        keyCode: "802006",
        formatter: Dict.getNameForList('biz_type', '802006'),
        key: "biz_type",
        // data: bizData,
        search: true
    }, {
        field: 'transAmount',
        title: '变动金额',
        formatter: moneyFormat
    }, {
        field: 'preAmount',
        title: '变动前金额',
        formatter: moneyFormat
    }, {
        field: 'postAmount',
        title: '变动后金额',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',
        keyCode: "802006",
        formatter: Dict.getNameForList('jour_status', '802006'),
        search: true
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: "802520",
        searchParams: {
            accountNumber: accountCode,
            // status: 'effect'
        }
    });

    $("#activeBtn").remove();
    $('#ledgerBtn').remove();
    $("#importBtn").remove();
    $('#applyBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "apply.html?accountCode=" + selRecords[0].accountNumber;
    });

    $('#enchasBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "lengder.html?accountNumber=" + selRecords[0].accountNumber;
    });
});