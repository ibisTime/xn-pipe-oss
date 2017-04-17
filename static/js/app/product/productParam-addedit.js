$(function() {
	var code = getQueryString('code');
	var pCode = getQueryString('pCode')
	
	var fields = [{
		title: '参数名',
		field: 'dkey',
		required: true,
		maxlength: 20
	}, {
		title: '参数值',
		field: 'dvalue',
		required: true,
		maxlength: 25
	}, {
		title: '序号',
		field: 'orderNo',
		required: true,
		number: true
	}];
	
	buildDetail({
		fields: fields,
		code: code,
		addCode:'808030',
		detailCode: '808036',
		editCode: '808032',
		beforeSubmit: function(data){
			if(code)
				data.code=code;
			else
				data.productCode=pCode;
			
			return data;
		}
	});
});