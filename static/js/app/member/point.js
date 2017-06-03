$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "用户名",
        field: 'realName',
        search: true
    }, {
        title: '类型',
        field: 'type',
        type: 'select',
        key: "account_kind",
        formatter: Dict.getNameForList("account_kind"),
        //search: true
    }, {
        title: '类型',
        field: 'type',
        type: 'select',
        key: "account_kind",
        formatter: Dict.getNameForList("account_kind"),
        //search: true
    }
    , {
        title: "积分",
        field: "amount",
        formatter: moneyFormat
    }, ];
    buildList({
        router: 'point',
        columns: columns,
        pageCode: '802500',
        searchParams: {
            currency: "JF",
            companyCode: OSS.company
        }

    });
    $('#ledgerBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "ledger.html?type=JF&accountCode=" + selRecords[0].accountNumber;
    });
});