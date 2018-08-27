;(function($){ // confirm弹出框
  var defaults = {
    title:'', //title提示
    msg:'',//提示文字
    confirmBtn:{},//确认按钮
    cancelBtn:{},//取消按钮
    isCancel:true, // 是否显示取消按钮
    isConfirm:true,//是否显示确定按钮
    isMag:true,//是否显示提示框标题栏
    isInput:true,//是否显示提示框标题栏
    confirm:function(){}, // 确定调用方法
    cancel:function(){}, // 取消调用方法
  };
  var ConfirmRe = function(options){
    this.init(options);
  };
  ConfirmRe.prototype = {
    init:function(options){
      $('body').append(this.createTags(options));
      $('body').find('.promitMsgLayer').css({'display':'none','width': '100%','height': '100%','position': 'fixed','left': '0','top': '0','z-index': '9999','background':'rgba(0,0,0,0.3)'});
      $('body').find('.promitMsgLayerList').css({'position': 'absolute','max-width': '420px','width':'70%','padding-bottom': '10px','left': '50%','top':'50%','background-color': '#fff','border-radius': '4px','border': '1px solid #ebeef5','font-size': '18px','box-shadow': '0 2px 12px 0 rgba(0,0,0,.1)','text-align': 'left','overflow': 'hidden','transform': 'translate(-50%,-50%)'});
      $('body').find('.promitMsgLayerList .promitTitle').css({'position': 'relative','padding-bottom':'6px'});
      $('body').find('.promitMsgLayerList .Button').css({'cursor':'pointer','padding': '9px 15px','font-size': '12px','border-radius': '3px','border': '1px solid #dcdfe6','margin-left':'5px','online':'none'});
      $('body').find('.promitMsgLayer').fadeIn(200);
      this.inputFocus();
      var self = this;
      if(options.isConfirm) { // 是否有确认按钮
        $('.promitConfirmButton').click(function (ev) {
          self.confirm(options);
        });
      };
      if(options.isCancel) { // 是否有取消按钮
        $('.promitCancleButton').click(function(ev){
            self.closeBox();
          options.cancel();
        });
      };
      $('#clo').click(function (ev) {    //弹窗关闭
        self.closeBox();
      });
    },
    confirm:function (options) {     //点击确认按钮处理
      var value = $('body').find('.promitMsgLayer #input').val();
      if(!!options.isInput && !!!value){
          $('body').find('.promitMsgLayer #input').css({'border-color':'red'});
          return false;
      }
        this.closeBox();
      options.confirm(value);
    },
      closeBox:function () {
          $('body').find('.promitMsgLayer').remove();
      },
    inputFocus:function(){
      $('#input').focus(function(ev){
        $(this).css({'border-color':'#e6e6e6'});
      });
    },
    createTags:function(options){
      var tags = '<div class="promitMsgLayer">';
      tags +=       '<div class="promitMsgLayerList">';
      tags +=				    '<div class="promitTitle">';
      tags +=             '<div style="padding:8px 28px;background-color: #F8F8F8;color: #303133;overflow: hidden;">';
      tags +=                 '<div style="padding-left: 0;margin-bottom: 0;font-size: 14px;float: left;line-height: 14px;">' + options.title + '</div>';
      tags +=                 '<img id="clo" style="display:inline-block;cursor:pointer;float: right;" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAMAAwDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAACQAF/8QAHRAAAwEAAwEBAQAAAAAAAAAABQYHBAIDCAEACf/EABYBAQEBAAAAAAAAAAAAAAAAAAAEBf/EACQRAQEAAQMDAwUAAAAAAAAAAAIBAwAREgQTQiEiMjFBUVJU/9oADAMBAAIRAxEAPwB0fT/p+ifygoh5eXj3H0VKvRXF6ok3m9EejRCg+XaCQNcNze/v7fu4H2PV4u1MZ/uPNjYe7u41NDXdpFCtJIaS6ekfpYcI60S2dtY+AbA9mYeAA/p/Qef1vptppEvNvmHUtzv6w1e60e41aqmOVTolIU63SkiemWBkCA8WXHLlBDdA62AmYFbDAQSVmz9GnZsCjs5cpv2EiOrt/SZssT2GLGAJwAeKJklL5petdW6f4Vp+2mrzD5tna3qutXYfpiq1a40etKdIolT5BGRgMz1JpTohqEux5cQMMtgZmAWw/RnzJQICOC7NmneUL5yJLZ26vzLmamITYAY8TAHIktTkn8uVdvmrVPGzTWV5s82ZY1lsEolFgsCRKkiwac87nefTNWZfnK+zTWZvepMTNT5M2xjGpg1jbD2heXtB7bjAY9vwWL+ZhubLl6XUdRVcbePG28e7d7kTUyZByUGQmqkne8ZbZvd7bdNf/9k=" />'
      tags +=              '</div>';
      tags +=				 '</div>';
      if(!!options.isMag){    //是否显示文字提示部分
        tags +=			 '<div style="position: relative;padding: 5px 15px;color: #606266;font-size: 14px;height: 24px">';
        tags +=				     '<div style="position: absolute;top: 50%;transform: translateY(-50%)">';
        tags +=				        '<img style="height: 20px" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAYABoDAREAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAABwgKCf/EACwQAAEEAQIFAgUFAAAAAAAAAAECAwQFBgcTAAgREhQWQRUXITFRI2FiY8H/xAAXAQADAQAAAAAAAAAAAAAAAAAGCAkH/8QANBEAAQIFAgMGBQIHAAAAAAAAAQIRAwQFBiEHEgAUFggTFSIxQSRRYYGRFyU1UlRVcXXw/9oADAMBAAIRAxEAPwCr7nH5q73Dbd/SrTWeay8itNOZXk0dITLrDLYTIjVNO+CUxJ7kRvckzSAWUrCEhJCuEc7SfaArFtzwsOw57kJ/BrldOVSjs1KpRZLxSA61M6S6Ukh1LZbRrSSn12W6oumRVPSPmFFkWYRC5BUoe4OdoJKdp3EE7dqQ4nonqNqvgGc6zt5TXyI2IO2jto7kN1cP5DZO1tfGt7CQxLEWUEAxJPQCZM+/29wFZt7S2+L+tG69TzXqcVWyYnOmt1Gqrq04aekTyt8RKFQ4ZIPl7xSO8LpQVEEDcazfVu2jcNAskU5k1pMMAU8JEihMQmHDSEuCUkpIAQkhLB9oIJJfLdzc5lpzkNXj+b3dlk2nlg+xCkN3D8iwssXZeOxHsKeS+DMVCi/UTachRHcTB6Hg50S7Rd0WRWJGl3RP1SuWTPp27p8AztGAyOTBYsGHwLgH5jB4GtTNHqPcUhPVW35Dw+ugkgAkJrJUQVbgMblfzkEpJ3B3IO4Dcpl5tDzK0PNOoS4062tlSHW3EhSHEKBPchaSFJPuCDxU2DFhRYMKLDmAYcSGiJDO5OULSFJOWOUkHLHhIO6jDBUQRhm9G9sY/HE5Gvvn/O/VT4r08715kW7+Njz5fi/v08Lp/vtxFXV7xD9UL78Sbnep6ozM38RwzfRm+j8Uh0+5foe0uU9PDKX8v+/GPvwTNJtWoeJ8v2v+DSrBmPa5Q1jnwCO69+tO+JSDT5J43X8VABHv9ODnTjUGWtzR/Vq15qoNPVsUzwP7tJ1n/PwWC7fccCt3WjM1bUCwq9yDyEgqqGewPYEyXr8lMcZcBvTCr8YHxr3FFWlnrH5Y6c7+zv8AoPEN7d3t3d9P125u/wBnf3d/8uvFl7B6s6Fst+7fpK3Hf1fweTd/rxOG6unep7j/AN9WPn/cJjhO+cflUvcyt39VdNYBs7yU003leMx1BUuzMRhMeNbU7AATLntxHNuTCJJeSgLSVEq4XXtJ9n+sXJPC/LDkefn8CuUI4VNszVWlB1NFALLS7qLqSAHSjXNGtW6fQpbpe6Z5UjI+Y0WedxDLklKj7AZ2kgJ2jaSDt3IPjme2WnOG6k6X2+nNe/a5s3BguT8iq5ELIseeiJUnoxGkxPMKR17oIBHhz0pJ6gdCoVCvGoWRa992HVbEpfO3SX/e6Z+8UjBDEt6F39i6RlndgarQJe5KzQLpla+eRoTlpAtRZ129Q+fTy+2XA4M3LdyjZlqPkNVkOcUdljGnUB9idIFxHkV1llLLJ349dXx5BEsQpXUmbckj7EQvrxp+iPZ1ue961I1y6ZGp0SypFIV3c8UhdZSSADJJJfaf65mx82HATqZrFR7dp89Srfn/ABCuqUUghymjKSdqgohxuGfISFEjaAGJG37cVlltDLKEMtNIS2002hlKGm20hKG0JAHahCQEpHsABxU6DChQoMKFDlwIcOGiHDG1OEISEpGXOEgDLnhIe9jHJSSTl39X98Y/HH//2Q==" />';
        tags +=				     '</div>';
        tags +=				     '<div style="padding-left: 36px;padding-right: 12px;">';
        tags +=                '<p style="margin: 0;line-height: 20px;">' + options.msg + '</p>'
        tags +=				     '</div>';
        tags +=				'</div>';
      };
      if(!!options.isInput){   //是否显示输入框
        tags +=				'<div style="padding:0 15px;box-sizing: border-box;">';
        tags +=            '<input id="input" type="text" style="display: block;width:100%; padding:0 5px; box-sizing: border-box ; height: 30px;margin: 10px auto;line-height: 30px;border: 1px solid #e6e6e6;color: #333;"/>';
        tags +=				'</div>';
      };
      tags +=         '<div style="padding: 5px 15px 0;text-align: right;">';
      if(!!options.isCancel){   //是否显示取消按钮
        tags +=             '<button type="button" class="Button promitCancleButton" style="color:' + (options.cancelBtn.color || '#333') +';background:' + (options.cancelBtn.background || '#fff') +';border-color: #dcdfe6;">';
        tags +=                 '<span>' + (options.cancelBtn.text || '取消') + '</span>';
        tags +=             '</button>';
      };
      if(!!options.isConfirm){   //是否显示确认按钮
        tags +=             '<button type="button" class="Button promitConfirmButton" style="color:' + (options.confirmBtn.color || '#fff') +';background-color:' + (options.confirmBtn.background || '#409eff') +';border-color:' + (options.confirmBtn.background || '#409eff' )+'">';
        tags +=                  '<span>' + (options.confirmBtn.text || '确定') + '</span>';
        tags +=             '</button>';
      };
      tags +=             '</div>';
      tags +=			    '</div>';
      tags +=			  '</div>';
      return tags;
    }
  };
  $.ConfirmBox = function(options){
    new ConfirmRe($.extend({},defaults,options));
  };
})(jQuery);