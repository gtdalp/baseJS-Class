/*************************
* 2015-11-30 xisa
* base class
**************************/
let XSUtil = {
    // 获取时间的某部份
    getDateFn: function(){
        var __date = new Date();
        return {
            //获取当前年份(2位) 
            getYear: __date.getYear(),

            // 获取完整的年份(4位,1970-????) 
            getFullYear: __date.getFullYear(),

            // 获取当前月份(0-11,0代表1月) 
            getMonth: __date.getMonth(),

            // 获取当前日(1-31) 
            getDate: __date.getDate(),

            // 获取当前星期X(0-6,0代表星期天) 
            getDay: __date.getDay(),

            // 获取当前时间(从1970.1.1开始的毫秒数) 
            getTime: __date.getTime(),

            // 获取当前小时数(0-23)
            getHours: __date.getHours(),

            // 获取当前分钟数(0-59)
            getMinutes: __date.getMinutes(),

            // 获取当前秒数(0-59) 
            getSeconds: __date.getSeconds(),

            // 获取当前毫秒数(0-999) 
            getMilliseconds: __date.getMilliseconds(),

            // 获取当前日期
            toLocaleDateString: __date.toLocaleDateString(),

            // 获取当前时间
            toLocaleTimeString: __date.toLocaleTimeString(),

            // 获取日期与时间
            toLocaleString: __date.toLocaleString(),
        }
    },
    /*************************
    * input中val改变触发
    *
    * @parmValue    {string}    ele  指定元素ID
    * @return       {function}  cb   回调函数
    *
    *************************/
    inputChange : function( id, cb ) {
        var dom = document.getElementById(id);
        var callback = function () {
            cb(dom.value);
        }
        if (!dom) return;
        if( "\v" == "v" ) {
            dom.onpropertychange = callback;
        }else{
            dom.addEventListener("input", callback, false);
        }
    },
    /***********************
    * 验证是否为数字类型
    *
    * @parmValue    {string}    val     value值
    * @return       {boolean}   true匹配正确  false匹配错误
    *
    ***********************/
    isInt : function( val ) {
        var patrn = /^[0-9]\d*$/;
        if (!patrn.exec(val)) return false; 
        return true; 
    },

    /***********************
    * 验证是否为身份证号码
    *
    * @parmValue    {string}    val     value值
    * @return       {boolean}   true匹配正确  false匹配错误
    *
    ***********************/
    isIDCard : function( val ) {
        var patrn = /^\d{15}(\d{2}[A-Za-z0-9])?$/;
        if (!patrn.exec(val)) return false; 
        return true; 
    },

    /***********************
    * 验证是否为电话号码
    *
    * @parmValue    {string}    val value值
    * @return       {boolean}   true匹配正确  false匹配错误
    *
    ***********************/
    isPhone : function( val ) {
        var patrn = /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
        if (!patrn.exec(val)) return false; 
        return true; 
    },

    /***********************
    * 验证是否为手机号码
    *
    * @parmValue    {number}    val value值
    * @return       {boolean}   true匹配正确  false匹配错误
    *
    ***********************/
    isMobile : function( val ) {
        var patrn = /^0?1[3|4|5|8][0-9]\d{8}$/;
        if (!patrn.exec(val)) return false; 
        return true; 
    },

    /***********************
    * 验证图片是否全部加载完成
    *
    * @parmValue    {object}     imgObj需要查找的img
    * @return       {function}   callback 全部加载完毕回调
    *
    ***********************/
    isImgLoad : function(imgObj, callback){
        var t_img // 定时器
            , isLoad = true // 控制变量
            ;
        // 判断图片加载的函数
        var isImgLoad = function(){
            imgObj.each(function(){
                // 找到为0就将isLoad设为false，并退出each
                if(this.height === 0){
                    isLoad = false;
                    return false;
                }
            });

            // 为true，没有发现为0的。加载完毕
            if(isLoad){ 
                // 清除定时器
                clearTimeout(t_img);
                // 回调函数
                callback();
            }else{
                isLoad = true;
                t_img = setTimeout(function(){
                    // 递归扫描
                    isImgLoad(callback);
                },17);
            }
        }
        isImgLoad();
    },

    /***********************
    * 获取几分钟前、几小时前、几天前等时间差
    *
    * @parmValue    {date}      publishTime 时间戳
    * @return       {string}    返回剩余时间提示
    *
    ***********************/
    timeDifference : function(publishTime){
        var timeNow = Date.parse(new Date())
          , d = (timeNow - publishTime)/1000
          , d_seconds = parseInt(d)      // 秒
          , d_minutes = parseInt(d/60)   // 分
          , d_hours = parseInt(d/3600)   // 时   
          , d_days = parseInt(d/86400)   // 天
          ;

        if(d_days > 0 && d_days < 4) {       
            return d_days+"天前";       
        }
        else if(d_days <= 0 && d_hours > 0) {       
            return d_hours + "小时前";       
        }
        else if(d_hours <= 0 && d_minutes > 0) {       
            return d_minutes+"分钟前";       
        }
        else if(d_minutes <= 0 && d_seconds >= 0) {       
            // return d_seconds+"秒前";
            return "刚刚之前";       
        }
        else{       
            var s = new Date(publishTime);
            return s.getFullYear() + '年' + (s.getMonth() + 1) + "月" + s.getDate() + "日 " + s.getHours() + ':' + ':' + s.getMinutes() + ':' + s.getSeconds();
        }
    },


    /***********************
    * 判断是否为有效的数字
    *
    * @parmValue    {number}      val   验证val
    * @return       {boolean}     验证通过返回true 验证失败返回false
    *
    ***********************/
    isNumber: function(val) {
        if( isNaN(val) ){
            return true;
        }
        return false;
    },

    /***********************
    * 判断是否为有效的数字
    *
    * @parmValue    {string}      url   加载地址
    *
    ***********************/
    LoadStyle: function(url) {
        try {
            document.createStyleSheet(url)
        } catch(e) {
            var cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.type = 'text/css';
            cssLink.href = url;
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(cssLink)
        }
    },
    /***********************
    * 格式化CSS样式代码
    *
    * @parmValue    {string}      str   css样式
    * @return       {string}      返回格式化的css样式
    *
    ***********************/
    formatCss: function(str) {
        var str = str.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");

        // 清除连续分号
        str = str.replace(/;\s*;/g, ";"); 
        str = str.replace(/\,[\s\.\#\d]*{/g, "{");
        str = str.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
        str = str.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
        str = str.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
        return str;
    },

    /***********************
    * 压缩CSS样式代码
    *
    * @parmValue    {string}      str   css样式
    * @return       {string}      返回压缩过的css样式
    *
    ***********************/
    yasuoCss: function(str){
        // 删除注释
        str = str.replace(/\/\*(.|\n)*?\*\//g, ""); 
        str = str.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");

        // 容错处理
        str = str.replace(/\,[\s\.\#\d]*\{/g, "{"); 

        // 清除连续分号
        str = str.replace(/;\s*;/g, ";"); 

        // 去掉首尾空白
        str = str.match(/^\s*(\S+(\s+\S+)*)\s*$/); 
        return (str == null) ? "" : str[1];
    },

    /***********************
    * 检验URL链接是否有效
    *
    * @parmValue    {string}      URL   url地址
    * @return       {boolean}     验证通过返回true  验证失败返回false
    *
    ***********************/
    getIsUrlState: function(URL) { 
        var xmlhttp = new ActiveXObject("microsoft.xmlhttp"); 
        xmlhttp.Open("GET",URL, false);  
        try {  
            xmlhttp.Send(); 
        } catch(e) {
            // 
        } finally { 
            var result = xmlhttp.responseText; 
            if(result) { 
                if(xmlhttp.Status == 200) { 
                    return(true); 
                }else{ 
                    return(false); 
                } 
            }else{ 
                return(false); 
            } 
        } 
    },

    
    // 判断是否是字符串
    isString: function (obj) { 
        return typeof obj == 'string';
    },
    // 判断是否是数组
    isArray: function (obj) { 
        return Array.isArray(obj);
    },
    // 判断是否是函数
    isFunction: function (value) { 
        return typeof value == 'function';
    },
    // 判断是否是window
    isWindow: function (obj) { 
        return obj != null && obj == obj.window;
    },
    // 判断是否document
    isDocument: function (obj)   { 
        return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
    },
    // 判断是否是obj
    isObject: function (obj) { 
        return type(obj) == "object";
    },
    // 不用四舍五入 截取字符串2位数
    toFixed: function (val) {
        val = val.toString();
        if (val.indexOf('.') === -1) {
            val = val + '.00';
        } else {
            val = val.substring(0, val.lastIndexOf('.') + 3);
        }
        var str = val.split('.');
        if (str[1].length === 1) {
            val = val + '0';
        }
        return val;
    },
    // 获取几分钟前、几小时前、几天前等时间差
    timeDifference : function(publishTime){
        var d_seconds
          , d_minutes
          , d_hours
          , d_days
          , timeNow = Date.parse(new Date())
          , d = (timeNow - publishTime)/1000
          ;
        d_days = parseInt(d/86400);   // 天
        d_hours = parseInt(d/3600);   // 时   
        d_minutes = parseInt(d/60);   // 分
        d_seconds = parseInt(d);      // 秒

        if(d_days > 0 && d_days < 4) {       
            return d_days+"天前";       
        }
        else if(d_days <= 0 && d_hours > 0) {       
            return d_hours + "小时前";       
        }
        else if(d_hours <= 0 && d_minutes > 0) {       
            return d_minutes+"分钟前";       
        }
        else if(d_minutes <= 0 && d_seconds >= 0) {       
            // return d_seconds+"秒前";
            return "刚刚之前";       
        }
        else{       
            var s = new Date(publishTime);
            return s.getFullYear() + '年' + (s.getMonth() + 1) + "月" + s.getDate() + "日 " + s.getHours() + ':' + ':' + s.getMinutes() + ':' + s.getSeconds();
        }
    },
    // 判断是否是数字类型
    isNumber: function (n) {
        return typeof n === 'number' || !!(n && !isNaN(n));
    },
    // 判断是否是对象
    isObject: function () {
        return !!(o && typeof o === 'object' && o.constructor !== Array && o.constructor !== Date);
    },
    // 判断class是否存在
    hasClass: function (node, cls) {
        if (typeof node === 'string') {
            node = document.querySelector(node);
        }
        if (!node || !node.className || !cls) {
            return false;
        }
        return node.className.split(' ').indexOf(cls) >= 0;
    },
    // 获取element的宽高和定位
    getRect: function (element) {
        var rect = element.getBoundingClientRect();
        var top = document.documentElement.clientTop;
        var left= document.documentElement.clientLeft;
        return{
            top    :   rect.top - top,
            bottom :   rect.bottom - top,
            left   :   rect.left - left,
            right  :   rect.right - left,
            width  :   rect.width,
            height :   rect.bottom - rect.top
        }
    },
    // hash方法 数组去重
    unique: function (arr) {
        if (!Array.isArray(arr)) arr = [];
        if (!Array.prototype.unique) {
            Array.prototype.unique = function () {
                var hash   = {},
                    result = [],
                    type   = '',
                    i      = 0,
                    len    = this.length,
                    item;
                for (; i < len; i++) {
                    item = this[i];
                    type = Object.prototype.toString.call(item);

                    if (!hash[item + type]) {
                        hash[item + type] = true;
                        result.push(item);
                    }
                }

                return result;
            }
        }
        return arr.unique();
    },
    // 获取attr属性和值
    attr : function (dom, key) {
        var i = 0,
            domAttr = dom.attributes,
            len = domAttr.length,
            dataF,
            name,
            str = '';
        for (; i < len; i++) {
            dataF = domAttr[i];
            name = dataF.name;
            if (name == key) {
                str = dataF.nodeValue;
                break;
            }
        }
        return str;
    },
    // 等比例缩放图片
    /*
    obj = {
        title: '',
        alt: '',
        cls: '',
        style: ''
    }
    */
    resizeImageScale: function (obj) {
        // 算出比例返回图片标签字符串
        var imgTpl = function (o) {
          var title = o.title ? ' title="' + o.title + '" ' : '',
              alt = o.alt ? ' alt="' + o.alt + '" ' : '',
              cls = o.cls ? ' class="' + o.cls + '" ' : '',
              style = o.style || '',
              styl = '';

              // 容器宽度
          var containerW = +o.containerW,
              // 容器宽度
              containerH = +o.containerH;

              // 图片宽度
          var imgW = +o.imgW,
              // 图片高度
              imgH = +o.imgH;

              // 压缩比例
          var scale = Math.max(containerW/imgW, containerH/imgH),
              // 图片压缩之后宽度
              w = imgW*scale,
              // 图片压缩之后高度
              h = imgH*scale;

          // 宽度溢出
          if (w > containerW) {
            styl = 'margin-left:-' + (w-containerW)/2 + 'px;';
          }
          //高度溢出
          if (h > containerH) {
            styl = 'margin-top:-' + (h-containerH)/2 + 'px;';
          }

          styl = ' style="' + styl + style + '"';

          return '<img src="' + o.src + '" width="' + w + '" height="' + h + '"' + cls + title + alt + styl + ' />';
        }


        var html = '';
        if (Array.isArray(obj)) {
          for (var i = 0, len = obj.length; i < len; i++) {
            html += imgTpl(obj[i]);
          }
        } else {
          html = imgTpl(obj);
        }
        return html;
    },
    
    /***********************
    * 解析获取URL参数
    *
    * @parmValue    {string}      url   url地址
    * @parmValue    {string}      key   key值
    * @return       {string}      返回获取到的key
    *
    ***********************/
    getUrlParm: function(url, key) {
        var thisUrl = url
            , parmValue = ""
            , re = new RegExp(key + "=.*", "i")
            , mResult = re.exec(thisUrl)
            ;
        if(mResult != null) {
            mResult = mResult[0];
            if(mResult.indexOf("&") != -1){
                mResult = mResult.split("&")[0];
            }
            return mResult.split("=")[1];
        }
    },
    // 旧方法获取url参数
    requestParaMap () {
        var id = location.search;
        if (id == "" || id == null || typeof id == "undefined") {
            id = "";
        }
        var arrayObj = id.match(/([^?=&]+)(=([^&]*))?/g);
        var returnMap = {};
        if (arrayObj == null) return returnMap;
        for (var i = 0; i < arrayObj.length; i++) {
            var conment = arrayObj[i];
            var key = decodeURIComponent(conment.substring(0, conment.indexOf("=")));
            var value = decodeURIComponent(conment.substring(conment.indexOf("=") + 1, conment.length));
            returnMap[key] = value;
        };
        if(id == "undefined") {
            return null;
        }else{
            return returnMap;
        }
    },
    // 获取浏览器url中的key
    getParam (name) {
        let map = XSUtil.requestParaMap();
        if (name && map) {
            map = map[name];
            if (!map) {
                let after = window.location.hash.split("?")[1];
                if (after) {
                    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                    let r = after.match(reg);
                    if (r != null) {
                        return  decodeURIComponent(r[2]);
                    } else {
                        return null;
                    }
                }
            } else {
                return map;
            }
        } else {
            return null;
        }
    },
    // 判断IE浏览器
    jugdeIE () {
        var browser=navigator.appName 
        var b_version=navigator.appVersion 
        var version=b_version.split(";") || ''; 
        var trim_Version=(version[1] || '').replace(/[ ]/g,""); 
        var type = "chrome";
        if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") { 
            type = "6";
        }else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0") { 
            type = "7"; 
        }else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0") { 
            type = "8";
        } else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") { 
            type = "9"; 
        } 
        return type;
    },
    // 路由跳转下一页
    nextPage : function( str, param ) {
        var $nativeApi = {}, nextUrl = '';
        var route = configObj.route;
        var curl = window.location.href.split('?')[0];
        if( route == undefined ) {
            if( param == "" || param == undefined ) {
                //window.location.href = url;
                nextUrl = str;
            }else{
                var ustr = '?';
                var index = 0;
                for( var key in param ) {
                    if( index > 0 ) {
                        ustr += "&"+key;
                        ustr += "=" + param[key];
                    }else{
                        ustr += key;
                        ustr += "=" + param[key];
                    }
                    index++;
                }   
                nextUrl += ustr;
            }
        }else{
            var url = route[str];
            if(url){
                nextUrl = parseParam(url, param);
            } else {
                // nextUrl = str;
                nextUrl = route['404'];
            }
        }
        $nativeApi.go(nextUrl);
    },
    // 获取当前系统实时时间
    getDateTime (id) {
        
        let fn = function () {
            let date = new Date();
            let str = '星期';

            let y = date.getFullYear() + '';
            let m = date.getMonth() + 1 + '';
            let d = date.getDate() + '';
            let w = date.getDay();

            if (w == 0) {
                str += '日'
            } else if (w == 1) {
                str += '一'
            } else if (w == 2) {
                str += '二'
            } else if (w == 3) {
                str += '三'
            } else if (w == 4) {
                str += '四'
            } else if (w == 5) {
                str += '五'
            } else if (w == 6) {
                str += '六'
            }
            if (m < 10) m = '0' + m;
            if (d < 10) d = '0' + d;

            let hh = date.getHours() + '';
            let mm = date.getMinutes() + '';
            let ss = date.getSeconds() + '';

            if (hh < 10) hh = '0' + hh;
            if (mm < 10) mm = '0' + mm;
            if (ss < 10) ss = '0' + ss;
            
            document.getElementById(id).innerHTML = y + '-' + m + '-' + d + ' ' + hh + '<span class="time-span-m">:</span>' + mm + '<span class="time-span-m">:</span>' + ss + ' ' + str;
            setTimeout(function () {
                fn();
            }, 1000);
        }
        fn();
    }
    
};
window.XSUtil = XSUtil;
