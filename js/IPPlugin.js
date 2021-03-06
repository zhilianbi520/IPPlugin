;(function($){
//插件的默认参数
$.fn.selfsettings={
		  	 parent_css:{},//当前元素的CSS样式
	         input_css:{"font-size":"20px","ime-mode":"disabled"},//生成的每个input标签的样式
	         xhforID:[],//生成的每个Input标签的ID属性数字
	         ipaddress:""//默认的IP数据 
};
//插件初始化的默认方法 
$.fn.ipAddress=function(option)
{
	bind_UUID_Math();
	$.fn.selfsettings.xhforID=new Array();
	for(var index=0;index<4;index++)
		{
			$.fn.selfsettings.xhforID.push(Math.uuidFast());
		}
	 this.selfsettings=$.extend({}, $.fn.selfsettings,option);
     $(this).data("myself",this);
     genIPinput(this);
     return this;
};

//对象方法，返回当前对象的IP值 
$.fn.getIPValue=function(){
     var ipresult=""; 
     var xharr=$(this).data("myself").selfsettings.xhforID;
     $(xharr).each(function(index,ip){
    	if($("#ipdz"+ip).val().length==0)
    		{
				alert("请输入第"+(index+1)+"项的IP内容！");
				ipresult="";
				return false;
    		}
    	else
    			index==xharr.length-1?ipresult+=$("#ipdz"+ip).val():ipresult+=$("#ipdz"+ip).val()+".";
    });
    return ipresult;
};
//向目标元素当中追加4个IP对应的input标签。
function genIPinput(targetarea)
{
	 //获取用户配置的IP地址，并利用.进行切割
	 var iparr=$(targetarea).data("myself").selfsettings.ipaddress.split(".");
	 //获取生成input标签的ID属性序号
	 var xharr=$(targetarea).data("myself").selfsettings.xhforID;
	 //设置当前对象的样式
	 $(targetarea).css($(targetarea).data("myself").selfsettings.parent_css);
	 //获取给IP标签所设置的样式
	 var ipinput_css=$(targetarea).data("myself").selfsettings.input_css;
	 //遍历ID序号数组生成每个input标签
    $(xharr).each(function(index,item)
    		{
	             var $IP=$("<input type='text'>");
	             $IP.attr(
	            		 {
	            			 "id":"ipdz"+item,
	            			 "numid":item,
	            			 "isfirst":index==0?"true":"false"
	             		 })
	             	.val(function(){
	             		return iparr[index]==undefined? "" : iparr[index];
	             	})
	             	.css(ipinput_css)
	                .keyup(function(event){
	                	var cur_parent=$(this).parent().data("myself");
	                	var self=this;
	                	var xhforID=cur_parent.selfsettings.xhforID;
	                	var id = $(self).attr("id");
	                	var value = parseInt($(self).val());
	                	var code = event.keyCode; // 当前输入的键盘值
	                	if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) {
	                			if ("ipdz"+xhforID[0] == id) 
	                			{
	                				if (value > 233) {
	                					alert(value + " 不是有效项，请指定一个1和233之间的值。");
	                					$(self).val("");
	                				} else {
	                					if ($(self).val().length == 3) { // 三位合法数字时，当光标在ipdz1时，跳到ipdz2
	                						$("#ipdz"+xhforID[1]).focus();
	                					}
	                				}
	                			} 
	                			else if ("ipdz"+xhforID[1] == id || "ipdz"+xhforID[2] == id || "ipdz"+xhforID[3] == id) {
	                				if (value > 255)
	                				{
	                					alert(value + " 不是有效项，请指定一个1和255之间的值。");
	                					$(self).val("");
	                				}
	                				else
	                				{
	                					if ($(self).val().length == 3)
	                					{ // 三位合法数字时
	                						if ("ipdz"+xhforID[1] == id) 
	                						{ // 当光标在ipdz2时，跳到ipdz3
	                							$("#ipdz"+xhforID[2]).focus();
	                						} else if ("ipdz"+xhforID[2] == id) 
	                						{ // 当光标在ipdz3时，跳到ipdz4
	                							$("#ipdz"+xhforID[3]).focus();
	                						}
	                					}
	                				}
	                			}
	                		}
	                }).
	                keydown(function(event){
	                	var cur_parent=$(this).parent().data("myself");
	                	var self=this;
	                	var xhforID=cur_parent.selfsettings.xhforID;;
	                	var id = $(self).attr("id"); // 当前输入框的ID
	            		var code = event.keyCode; // 当前输入的键盘值
	            		// 除了数字键、删除键、小数点之外全部不允许输入
	            		if (code == 8) 
	            		{ // 删除键
	            			if($(self).val().length==0)
	            				{
	            				if($(self).attr("isfirst")=="false")	
	            					$(self).prev().focus().select();
	            				}
	            			return true;
	            		} else if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) 
	            		{ // 数字键
	            			return true;
	            		} else if (code == 110 || code == 190) 
	            		{// 110、190代表键盘上的两个点
	            			if ("ipdz"+xhforID[0] == id) { // 如果是第一个框则第二个框获的焦点
	            				$("#ipdz"+xhforID[1]).focus();
	            			} else if ("ipdz"+xhforID[1] == id) { // 如果是第二个框则第三个框获的焦点
	            				$("#ipdz"+xhforID[2]).focus();
	            			} else if ("ipdz"+xhforID[2] == id) { // 如果是第三个框则第四个框获的焦点
	            				$("#ipdz"+xhforID[3]).focus();
	            			}
	            			return false;
	            		} else if (code == 37) { // 37:Left Arrow
	            			if ("ipdz"+xhforID[1] == id) {
	            				$("#ipdz"+xhforID[0]).focus();
	            			} else if ("ipdz"+xhforID[2] == id) {
	            				$("#ipdz"+xhforID[1]).focus();
	            			} else if ("ipdz"+xhforID[3] == id) {
	            				$("#ipdz"+xhforID[2]).focus();
	            			}
	            			return false;
	            		} else if (code == 39) { // 39:Right Arrow
	            			if ("ipdz"+xhforID[0] == id) {
	            				$("#ipdz"+xhforID[1]).focus();
	            			} else if ("ipdz"+xhforID[1] == id) {
	            				$("#ipdz"+xhforID[2]).focus();
	            			} else if ("ipdz"+xhforID[2] == id) {
	            				$("#ipdz"+xhforID[3]).focus();
	            			}
	            		} else {
	            			return false;
	            		}
	                })
	                .appendTo(targetarea);
    		});
 };
 function bind_UUID_Math() {
	 var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	 
	  Math.uuid = function (len, radix) {
	    var chars = CHARS, uuid = [], i;
	    radix = radix || chars.length;
	 
	    if (len) {
	      // Compact form
	      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	    } else {
	      // rfc4122, version 4 form
	      var r;
	 
	      // rfc4122 requires these characters
	      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	      uuid[14] = '4';
	 
	      // Fill in random data.  At i==19 set the high bits of clock sequence as
	      // per rfc4122, sec. 4.1.5
	      for (i = 0; i < 36; i++) {
	        if (!uuid[i]) {
	          r = 0 | Math.random()*16;
	          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	        }
	      }
	    }
	 
	    return uuid.join('');
	  };
	 
	  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
	  // by minimizing calls to random()
	  Math.uuidFast = function() {
	    var chars = CHARS, uuid = new Array(36), rnd=0, r;
	    for (var i = 0; i < 36; i++) {
	      if (i==8 || i==13 ||  i==18 || i==23) {
	        uuid[i] = '-';
	      } else if (i==14) {
	        uuid[i] = '4';
	      } else {
	        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
	        r = rnd & 0xf;
	        rnd = rnd >> 4;
	        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	      }
	    }
	    return uuid.join('');
	  };
	 
	  // A more compact, but less performant, RFC4122v4 solution:
	  Math.uuidCompact = function() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	      return v.toString(16);
	    });
	  };
}
})(jQuery);