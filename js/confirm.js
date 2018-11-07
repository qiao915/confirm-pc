; (function ($) { // confirm弹出框
    var defaults = {
        title: '', //title提示
        msg: '',//提示文字
        type: "",
        confirmBtnText:"",//确认按钮
        cancelBtnText: "",//取消按钮
        isCancel: true, // 是否显示取消按钮
        isConfirm: true,//是否显示确定按钮
        isMag: true,//是否显示提示框标题栏
        isInput: true,//是否显示提示框标题栏
        confirm: function () { }, // 确定调用方法
        cancel: function () { }, // 取消调用方法
    };
    var ConfirmRe = function (options) {
        this.init(options);
    };
    ConfirmRe.prototype = {
        init: function (options) {
            $('body').append(this.createTags(options));
            $('head').append(this.icon(options));
            $('body').find('.promitMsgLayer').css({ 'display': 'none', 'width': '100%', 'height': '100%', 'position': 'fixed', 'left': '0', 'top': '0', 'z-index': '9999', 'background': 'rgba(0,0,0,0.3)' });
            $('body').find('.promitMsgLayerList').css({ 'position': 'absolute', 'max-width': '420px', 'width': '70%', 'padding-bottom': '10px', 'left': '50%', 'top': '50%', 'background-color': '#fff', 'border-radius': '4px', 'font-size': '18px', 'box-shadow': '0 2px 12px 0 rgba(0,0,0,.1)', 'text-align': 'left', 'overflow': 'hidden', 'transform': 'translate(-50%,-50%)' });
            $('body').find('.promitMsgLayerList .promitTitle').css({ 'position': 'relative', 'padding-bottom': '6px' });
            $('body').find('.promitMsgLayerList .Button').css({ 'cursor': 'pointer', 'padding': '5px 15px', 'font-size': '12px', 'border-radius': '3px', 'border': '1px solid #dcdfe6', 'margin-left': '5px', 'online': 'none' });
            $('body').find('.promitMsgLayerList .promitConfirmButton').hover(function(){
                $('body').find('.promitMsgLayerList .promitConfirmButton').css({'background':'#66b1ff ','borderColor':'#66b1ff '});
            },function(){
                $('body').find('.promitMsgLayerList .promitConfirmButton').css({'background':'#2681FE ','borderColor':'#2681FE '});
            })
            $('body').find('.promitMsgLayerList .promitCancleButton').hover(function(){
                $('body').find('.promitMsgLayerList .promitCancleButton').css({'color':'#409eff','background':'#ecf5ff ','borderColor':'#c6e2ff '});
            },function(){
                $('body').find('.promitMsgLayerList .promitCancleButton').css({'color':'#333','background':'#fff ','borderColor':'#dcdfe6 '});
            })
            $('body').find('.promitMsgLayer').fadeIn(200);

            this.inputFocus();
            var self = this;
            if (options.isConfirm) { // 是否有确认按钮
                $('.promitConfirmButton').click(function (ev) {
                    self.confirm(options);
                });
            };
            if (options.isCancel) { // 是否有取消按钮
                $('.promitCancleButton').click(function (ev) {
                    $(this).parents('.promitMsgLayer').remove();
                    options.cancel();
                });
            };
            $('#clo').click(function (ev) {    //弹窗关闭
                $(this).parents('.promitMsgLayer').remove();
            });
        },
        confirm: function (options) {     //点击确认按钮处理
            var value = $('body').find('.promitMsgLayer #input').val();
            if (!!options.isInput && !!!value) {
                $('body').find('.promitMsgLayer #input').css({ 'border-color': 'red' });
                return false;
            }
            $('body').find('.promitMsgLayer').remove();
            options.confirm(value);
        },
        inputFocus: function () {
            $('#input').focus(function (ev) {
                $(this).css({ 'border-color': '#e6e6e6' });
            });
        },
        createTags: function (options) {
            var tags = '<div class="promitMsgLayer">';
            tags += '<div class="promitMsgLayerList">';
            tags += '<div class="promitTitle">';
            tags += '<div style="padding:8px 15px;background-color: #2681FE;color: #fff;overflow: hidden;">';
            tags += '<div style="padding-left: 0;margin-bottom: 0;font-size: 14px;float: left;line-height: 16px;">' + options.title + '</div>';
            tags += '<i class="iconfont icon-guanbi" id="clo" style="display:inline-block;cursor:pointer;float: right;font-size: 12px;color:#fff;"></i>'
            tags += '</div>';
            tags += '</div>';
            if (!!options.isMag) {    //是否显示文字提示部分
                tags += '<div style="position: relative;padding: 5px 15px;color: #606266;">';
                tags += '<p style="margin: 0;line-height: 16px;font-size: 14px;">'
                if (options.type == "error") {    //提示类型图标
                    tags += '<i class="iconfont icon-cuowuguanbi-" style="font-size: 12px;color:#F56C6C;margin-right:5px;"></i>'      //错误
                } else if (options.type == "success") {
                    tags += '<i class="iconfont icon-chenggong" style="font-size: 12px;color:#67C23A;margin-right:5px;"></i>'         //成功
                } else {
                    tags += '<i class="iconfont icon-warning" style="font-size: 12px;color:#e6a23c;margin-right:5px;"></i>'           //警告
                }
                tags += options.msg + '</p>'
                tags += '</div>';
            };
            if (!!options.isInput) {   //是否显示输入框
                tags += '<div style="padding:0 15px;box-sizing: border-box;">';
                tags += '<input id="input" type="text" style="display: block;width:100%; padding:0 5px; box-sizing: border-box ; height: 32px;margin: 0px auto 5px;line-height: 32px;border: 1px solid #a4a7af;border-radius:3px;color: #333;"/>';
                tags += '</div>';
            };
            tags += '<div style="padding: 5px 15px 0;text-align: right;">';
            if (!!options.isCancel) {   //是否显示取消按钮
                tags += '<button type="button" class="Button promitCancleButton" style="color:#333;background:#fff;border-color: #dcdfe6;">';
                tags += '<span>' + (options.cancelBtnText || '取消') + '</span>';
                tags += '</button>';
            };
            if (!!options.isConfirm) {   //是否显示确认按钮
                tags += '<button type="button" class="Button promitConfirmButton"  style="color:#fff;background-color:#2681FE;border-color:#2681FE">';
                tags += '<span>' + (options.confirmBtnText || '确定') + '</span>';
                tags += '</button>';
            };
            tags += '</div>';
            tags += '</div>';
            tags += '</div>';
            return tags;
        },
        icon:function() {
            var tags = '<link rel="stylesheet" href="https://at.alicdn.com/t/font_810168_1fuhm7ycoc2.css">';
            return tags;
        },
    };
    $.ConfirmBox = function (options) {
        new ConfirmRe($.extend({}, defaults, options));
    };
})(jQuery);