// pages/rili/index.js
const calendar = {
    
    /**
      * 农历1900-2100的润大小信息表
      * @Array Of Property
      * @return Hex 
      */
    lunarInfo:[0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
            0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
            0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
            0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
            0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
            0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
            0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
            0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
            0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
            0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,//1990-1999
            0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
            0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
            0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
            0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
            0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
            /**Add By JJonline@JJonline.Cn**/
            0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
            0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
            0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
            0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
            0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
            0x0d520],//2100
                
    
    /**
      * 公历每个月份的天数普通表
      * @Array Of Property
      * @return Number 
      */
    solarMonth:[31,28,31,30,31,30,31,31,30,31,30,31],
    
 
    /**
      * 天干地支之天干速查表
      * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
      * @return Cn string 
      */
    Gan:["\u7532","\u4e59","\u4e19","\u4e01","\u620a","\u5df1","\u5e9a","\u8f9b","\u58ec","\u7678"],
    
    
    /**
      * 天干地支之地支速查表
      * @Array Of Property 
      * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
      * @return Cn string 
      */
    Zhi:["\u5b50","\u4e11","\u5bc5","\u536f","\u8fb0","\u5df3","\u5348","\u672a","\u7533","\u9149","\u620c","\u4ea5"],
    
    
    /**
      * 天干地支之地支速查表<=>生肖
      * @Array Of Property 
      * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
      * @return Cn string 
      */
    Animals:["\u9f20","\u725b","\u864e","\u5154","\u9f99","\u86c7","\u9a6c","\u7f8a","\u7334","\u9e21","\u72d7","\u732a"],
    
    
    /**
      * 24节气速查表
      * @Array Of Property 
      * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
      * @return Cn string 
      */
    solarTerm:["\u5c0f\u5bd2","\u5927\u5bd2","\u7acb\u6625","\u96e8\u6c34","\u60ca\u86f0","\u6625\u5206","\u6e05\u660e","\u8c37\u96e8","\u7acb\u590f","\u5c0f\u6ee1","\u8292\u79cd","\u590f\u81f3","\u5c0f\u6691","\u5927\u6691","\u7acb\u79cb","\u5904\u6691","\u767d\u9732","\u79cb\u5206","\u5bd2\u9732","\u971c\u964d","\u7acb\u51ac","\u5c0f\u96ea","\u5927\u96ea","\u51ac\u81f3"],
    
    
    /**
      * 1900-2100各年的24节气日期速查表
      * @Array Of Property 
      * @return 0x string For splice
      */
    sTermInfo:[
      '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f',
      '97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
      '97bcf97c359801ec95f8c965cc920f','97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa',
      '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f','97bd0b06bdb0722c965ce1cfcc920f',
      'b027097bd097c36b0b6fc9274c91aa','9778397bd19801ec9210c965cc920e','97b6b97bd19801ec95f8c965cc920f',
      '97bd09801d98082c95f8e1cfcc920f','97bd097bd097c36b0b6fc9210c8dc2','9778397bd197c36c9210c9274c91aa',
      '97b6b97bd19801ec95f8c965cc920e','97bd09801d98082c95f8e1cfcc920f','97bd097bd097c36b0b6fc9210c8dc2',
      '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec95f8c965cc920e','97bcf97c3598082c95f8e1cfcc920f',
      '97bd097bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e',
      '97bcf97c3598082c95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
      '97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722',
      '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',
      '97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
      '97bcf97c359801ec95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
      '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f','97bd097bd07f595b0b6fc920fb0722',
      '9778397bd097c36b0b6fc9210c8dc2','9778397bd19801ec9210c9274c920e','97b6b97bd19801ec95f8c965cc920f',
      '97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
      '97b6b97bd19801ec95f8c965cc920f','97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2',
      '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e','97bd07f1487f595b0b0bc920fb0722',
      '7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
      '97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
      '97b6b97bd19801ec9210c965cc920e','97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
      '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf7f1487f531b0b0bb0b6fb0722',
      '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
      '97bcf7f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
      '97b6b97bd19801ec9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
      '9778397bd097c36b0b6fc9210c91aa','97b6b97bd197c36c9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722',
      '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
      '97b6b7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2',
      '9778397bd097c36b0b70c9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
      '7f0e397bd097c35b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
      '7f0e27f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
      '97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
      '9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
      '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
      '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9274c91aa',
      '97b6b7f0e47f531b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
      '9778397bd097c36b0b6fc9210c91aa','97b6b7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
      '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','977837f0e37f149b0723b0787b0721',
      '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722','7f0e397bd097c35b0b6fc9210c8dc2',
      '977837f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
      '7f0e397bd097c35b0b6fc9210c8dc2','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
      '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','977837f0e37f14998082b0787b06bd',
      '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
      '977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
      '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
      '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14998082b0787b06bd',
      '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
      '977837f0e37f14998082b0723b06bd','7f07e7f0e37f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
      '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b0721',
      '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f595b0b0bb0b6fb0722','7f0e37f0e37f14898082b0723b02d5',
      '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f531b0b0bb0b6fb0722',
      '7f0e37f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
      '7f0e37f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35','7ec967f0e37f14998082b0787b06bd',
      '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35',
      '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
      '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f149b0723b0787b0721',
      '7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0723b06bd',
      '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722','7f0e37f0e366aa89801eb072297c35',
      '7ec967f0e37f14998082b0723b06bd','7f07e7f0e37f14998083b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
      '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14898082b0723b02d5','7f07e7f0e37f14998082b0787b0721',
      '7f07e7f0e47f531b0723b0b6fb0722','7f0e36665b66aa89801e9808297c35','665f67f0e37f14898082b0723b02d5',
      '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722','7f0e36665b66a449801e9808297c35',
      '665f67f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
      '7f0e36665b66a449801e9808297c35','665f67f0e37f14898082b072297c35','7ec967f0e37f14998082b0787b06bd',
      '7f07e7f0e47f531b0723b0b6fb0721','7f0e26665b66a449801e9808297c35','665f67f0e37f1489801eb072297c35',
      '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722'
      ],

      /**
      * 公历节日
      */
      V:{
        "0101": "元旦",
        "0214": "情人节",
        "0305": "学雷锋纪念日",
        "0308": "妇女节",
        "0312": "植树节",  
        "0315": "消费者权益日",
        "0401": "愚人节",
        "0422": "地球日",
        "0501": "劳动节",
        "0504": "青年节",
        "0512": "护士节",
        "0601": "儿童节",
        "0701": "建党节",
        "0801": "建军节", 
        "0903": "抗战胜利日",
        "0910": "教师节",
        "1001": "国庆节",
        "1201": "艾滋病日",
        "1224": "平安夜",
        "1225": "圣诞节"}, 

      /**
      * 农历节日
      */
      T:{  
            "0101": "春节",  
            "0115": "元宵节", 
            "0202": "龙抬头", 
            "0308": "清明节", 
            "0505": "端午节",  
            "0707": "七夕节", 
            "0715": "中元节",   
            "0815": "中秋节",  
            "0909": "重阳节",  
            "1208": "腊八节",  
            "0100": "除夕"  
        },

      //节假日休息补
      Festivalbuxiu:{
        "0101":"休",
        "0211":"班",
        "0215":"休",
        "0216":"休",
        "0217":"休",
        "0218":"休",
        "0219":"休",
        "0220":"休",
        "0221":"休",
        "0224":"班",
        "0405":"休",
        "0406":"休",
        "0407":"休",
        "0408":"班",
        "0428":"班",
        "0429":"休",
        "0430":"休",
        "0501":"休",
        "0616":"休",
        "0617":"休",
        "0618":"休",
        "0922":"休",
        "0923":"休",
        "0924":"休",
        "0929":"班",
        "0930":"班",
        "1001":"休",
        "1002":"休",
        "1003":"休",
        "1004":"休",
        "1005":"休",
        "1006":"休",
        "1007":"休"
      },


    //判断是否是农历一年中的最后一天
    lunarEnd:function(i, h){  
        return ((calendar.lunarInfo[i - 1900] & (65536 >> h)) ? 30 : 29)  
    }, 

    //返回公历节假日
    solarFestival:function(cMonth,cDay){
      var month_str=cMonth<10?'0'+cMonth:cMonth;
      var day_str=cDay<10?'0'+cDay:cDay;
      var str=month_str+day_str;
      return calendar.V[str];
    },

    //返回农历节假日
    lunarFestival:function(y,m,d){
      var month_str=m<10?'0'+m:m;
      var day_str=d<10?'0'+d:d;
      var str=month_str+day_str;
      if(m==12 && d==calendar.lunarEnd(y,12)){
        str='0100'
      }

      return calendar.T[str];
    },

    //返回节假日补休日期
    solarFestivalBX:function(cyear,cMonth,cDay){
      var that=this;
      var month_str=cMonth<10?'0'+cMonth:cMonth;
      var day_str=cDay<10?'0'+cDay:cDay;
      var str=month_str+day_str;
      if(cyear==new Date().getFullYear()){
        return calendar.Festivalbuxiu[str];
      }else{
        return '';
      }
      
    },

    /**
      * 数字转中文速查表
      * @Array Of Property 
      * @trans ['日','一','二','三','四','五','六','七','八','九','十']
      * @return Cn string 
      */
    nStr1:["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341"],
    
    
    /**
      * 日期转农历称呼速查表
      * @Array Of Property 
      * @trans ['初','十','廿','卅']
      * @return Cn string 
      */
    nStr2:["\u521d","\u5341","\u5eff","\u5345"],
    
 
    /**
      * 月份转农历称呼速查表
      * @Array Of Property 
      * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
      * @return Cn string 
      */
    nStr3:["\u6b63","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341","\u51ac","\u814a"],
    
    
    /**
      * 返回农历y年一整年的总天数
      * @param lunar Year
      * @return Number
      * @eg:var count = calendar.lYearDays(1987) ;//count=387
      */
    lYearDays:function(y) {
        var i, sum = 348;
        for(i=0x8000; i>0x8; i>>=1) { sum += (calendar.lunarInfo[y-1900] & i)? 1: 0; }
        return(sum+calendar.leapDays(y));
    },
    
    
    /**
      * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
      * @param lunar Year
      * @return Number (0-12)
      * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
      */
    leapMonth:function(y) { //闰字编码 \u95f0
        return(calendar.lunarInfo[y-1900] & 0xf);
    },
    
    
    /**
      * 返回农历y年闰月的天数 若该年没有闰月则返回0
      * @param lunar Year
      * @return Number (0、29、30)
      * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
      */
    leapDays:function(y) {
        if(calendar.leapMonth(y))  { 
            return((calendar.lunarInfo[y-1900] & 0x10000)? 30: 29); 
        }
        return(0);
    },
    
    
    /**
      * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
      * @param lunar Year
      * @return Number (-1、29、30)
      * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
      */
    monthDays:function(y,m) {
        if(m>12 || m<1) {return -1}//月份参数从1至12，参数错误返回-1
        return( (calendar.lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
    },
    
    
    /**
      * 返回公历(!)y年m月的天数
      * @param solar Year
      * @return Number (-1、28、29、30、31)
      * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
      */
    solarDays:function(y,m) {
        if(m>12 || m<1) {return -1} //若参数错误 返回-1
        var ms = m-1;
        if(ms==1) { //2月份的闰平规律测算后确认返回28或29
            return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
        }else {
            return(calendar.solarMonth[ms]);
        }
    },
 
    /**
     * 农历年份转换为干支纪年
     * @param  lYear 农历年的年份数
     * @return Cn string
     */
    toGanZhiYear:function(lYear) {
        var ganKey = (lYear - 3) % 10;
        var zhiKey = (lYear - 3) % 12;
        if(ganKey == 0) ganKey = 10;//如果余数为0则为最后一个天干
        if(zhiKey == 0) zhiKey = 12;//如果余数为0则为最后一个地支
        return calendar.Gan[ganKey-1] + calendar.Zhi[zhiKey-1];
        
    },
 
    /**
     * 公历月、日判断所属星座
     * @param  cMonth [description]
     * @param  cDay [description]
     * @return Cn string
     */
    toAstro:function(cMonth,cDay) {
        var s   = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
        var arr = [20,19,21,21,21,22,23,23,23,23,22,22];
        return s.substr(cMonth*2 - (cDay < arr[cMonth-1] ? 2 : 0),2) + "\u5ea7";//座
    },
 
 
    /**
      * 传入offset偏移量返回干支
      * @param offset 相对甲子的偏移量
      * @return Cn string
      */
    toGanZhi:function(offset) {
        return calendar.Gan[offset%10] + calendar.Zhi[offset%12];
    },
    
    
    /**
      * 传入公历(!)y年获得该年第n个节气的公历日期
      * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起 
      * @return day Number
      * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
      */
    getTerm:function(y,n) {
        if(y<1900 || y>2100) {return -1;}
        if(n<1 || n>24) {return -1;}
        var _table = calendar.sTermInfo[y-1900];
        var _info = [
            parseInt('0x'+_table.substr(0,5)).toString() ,
            parseInt('0x'+_table.substr(5,5)).toString(),
            parseInt('0x'+_table.substr(10,5)).toString(),
            parseInt('0x'+_table.substr(15,5)).toString(),
            parseInt('0x'+_table.substr(20,5)).toString(),
            parseInt('0x'+_table.substr(25,5)).toString()
        ];
        var _calday = [
            _info[0].substr(0,1),
            _info[0].substr(1,2),
            _info[0].substr(3,1),
            _info[0].substr(4,2),
            
            _info[1].substr(0,1),
            _info[1].substr(1,2),
            _info[1].substr(3,1),
            _info[1].substr(4,2),
            
            _info[2].substr(0,1),
            _info[2].substr(1,2),
            _info[2].substr(3,1),
            _info[2].substr(4,2),
            
            _info[3].substr(0,1),
            _info[3].substr(1,2),
            _info[3].substr(3,1),
            _info[3].substr(4,2),
            
            _info[4].substr(0,1),
            _info[4].substr(1,2),
            _info[4].substr(3,1),
            _info[4].substr(4,2),
            
            _info[5].substr(0,1),
            _info[5].substr(1,2),
            _info[5].substr(3,1),
            _info[5].substr(4,2),
        ];
        return parseInt(_calday[n-1]);
    },
    
    
    /**
      * 传入农历数字月份返回汉语通俗表示法
      * @param lunar month
      * @return Cn string
      * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
      */
    toChinaMonth:function(m) { // 月 => \u6708
        if(m>12 || m<1) {return -1} //若参数错误 返回-1
        var s = calendar.nStr3[m-1];
        s+= "\u6708";//加上月字
        return s;
    },
    
    
    /**
      * 传入农历日期数字返回汉字表示法
      * @param lunar day
      * @return Cn string
      * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
      */
    toChinaDay:function(d){ //日 => \u65e5
        var s;
        switch (d) {
            case 10:
            s = '\u521d\u5341'; break;
        case 20:
            s = '\u4e8c\u5341'; break;
            break;
        case 30:
            s = '\u4e09\u5341'; break;
            break;
        default :
            s = calendar.nStr2[Math.floor(d/10)];
            s += calendar.nStr1[d%10];
        }
        return(s);
    },
    
    
    /**
      * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
      * @param y year
      * @return Cn string
      * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
      */
    getAnimal: function(y) {
        return calendar.Animals[(y - 4) % 12]
    },
    
    
    /**
      * 传入公历年月日获得详细的公历、农历object信息 <=>JSON
      * @param y  solar year
      * @param m solar month
      * @param d  solar day
      * @return JSON object
      * @eg:console.log(calendar.solar2lunar(1987,11,01));
      */
    solar2lunar:function (y,m,d) { //参数区间1900.1.31~2100.12.31
        if(y<1900 || y>2100) {return -1;}//年份限定、上限
        if(y==1900&&m==1&&d<31) {return -1;}//下限
        if(!y) { //未传参  获得当天
            var objDate = new Date();
        }else {
            var objDate = new Date(y,parseInt(m)-1,d)
        }
        var i, leap=0, temp=0;
        //修正ymd参数
        var y = objDate.getFullYear(),m = objDate.getMonth()+1,d = objDate.getDate();
        var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;
        for(i=1900; i<2101 && offset>0; i++) { temp=calendar.lYearDays(i); offset-=temp; }
        if(offset<0) { offset+=temp; i--; }
        
        //是否今天
        var isTodayObj = new Date(),isToday=false;
        if(isTodayObj.getFullYear()==y && isTodayObj.getMonth()+1==m && isTodayObj.getDate()==d) {
            isToday = true;
        }
        //星期几
        var nWeek = objDate.getDay(),cWeek = calendar.nStr1[nWeek];
        if(nWeek==0) {nWeek =7;}//数字表示周几顺应天朝周一开始的惯例
        //农历年
        var year = i;
        
        var leap = calendar.leapMonth(i); //闰哪个月
        var isLeap = false;
        
        //效验闰月
        for(i=1; i<13 && offset>0; i++) {
            //闰月
            if(leap>0 && i==(leap+1) && isLeap==false){ 
                --i;
                isLeap = true; temp = calendar.leapDays(year); //计算农历闰月天数
            }
            else{
                temp = calendar.monthDays(year, i);//计算农历普通月天数
            }
            //解除闰月
            if(isLeap==true && i==(leap+1)) { isLeap = false; }
            offset -= temp;
        }
        
        if(offset==0 && leap>0 && i==leap+1)
        if(isLeap){
            isLeap = false;
        }else{ 
            isLeap = true; --i;
        }
        if(offset<0){ offset += temp; --i; }
        //农历月
        var month   = i;
        //农历日
        var day     = offset + 1;
        
        //天干地支处理
        var sm      =   m-1;
        var gzY     =   calendar.toGanZhiYear(year);
        
        //月柱 1900年1月小寒以前为 丙子月(60进制12)
        var firstNode   = calendar.getTerm(year,(m*2-1));//返回当月「节」为几日开始
        var secondNode  = calendar.getTerm(year,(m*2));//返回当月「节」为几日开始
        
        //依据12节气修正干支月
        var gzM     =   calendar.toGanZhi((y-1900)*12+m+11);
        if(d>=firstNode) {
            gzM     =   calendar.toGanZhi((y-1900)*12+m+12);
        }
        
        //传入的日期的节气与否
        var isTerm = false;
        var Term   = null;
        if(firstNode==d) {
            isTerm  = true;
            Term    = calendar.solarTerm[m*2-2];
        }
        if(secondNode==d) {
            isTerm  = true;
            Term    = calendar.solarTerm[m*2-1];
        }
        //日柱 当月一日与 1900/1/1 相差天数
        var dayCyclical = Date.UTC(y,sm,1,0,0,0,0)/86400000+25567+10;
        var gzD = calendar.toGanZhi(dayCyclical+d-1);
        //该日期所属的星座
        var astro = calendar.toAstro(m,d);
        
        //公历节日
        var solarFestival =calendar.solarFestival(m,d);

        //农历节日
        var lunarFestival =calendar.lunarFestival(year,month,day);

        //节假日补休
        var solarFestivalBX =calendar.solarFestivalBX(y,m,d);
        return {'lYear':year,'lMonth':month,'lDay':day,'Animal':calendar.getAnimal(year),'IMonthCn':(isLeap?"\u95f0":'')+calendar.toChinaMonth(month),'IDayCn':calendar.toChinaDay(day),'cYear':y,'cMonth':m,'cDay':d,'gzYear':gzY,'gzMonth':gzM,'gzDay':gzD,'isToday':isToday,'isLeap':isLeap,'nWeek':nWeek,'ncWeek':"\u661f\u671f"+cWeek,'isTerm':isTerm,'Term':Term,'astro':astro,'solarFestival':solarFestival,'lunarFestival':lunarFestival,'solarFestivalBX':solarFestivalBX};
    },
        
        
    /**
      * 传入公历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
      * @param y  lunar year
      * @param m lunar month
      * @param d  lunar day
      * @param isLeapMonth  lunar month is leap or not.
      * @return JSON object
      * @eg:console.log(calendar.lunar2solar(1987,9,10));
      */
    lunar2solar:function(y,m,d,isLeapMonth) {   //参数区间1900.1.31~2100.12.1
        var isLeapMonth = !!isLeapMonth;
        var leapOffset  = 0;
        var leapMonth   = calendar.leapMonth(y);
        var leapDay     = calendar.leapDays(y);
        if(isLeapMonth&&(leapMonth!=m)) {return -1;}//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
        if(y==2100&&m==12&&d>1 || y==1900&&m==1&&d<31) {return -1;}//超出了最大极限值       
        var day  = calendar.monthDays(y,m);
        var _day = day; 
       //bugFix 2016-9-25 
       //if month is leap, _day use leapDays method 
       if(isLeapMonth) { 
          _day = calendar.leapDays(y,m); 
       } 
       if(y < 1900 || y > 2100 || d > _day) {return -1;}//参数合法性效验
        
        //计算农历的时间差
        var offset = 0;
        for(var i=1900;i<y;i++) {
            offset+=calendar.lYearDays(i);
        }
        var leap = 0,isAdd= false;
        for(var i=1;i<m;i++) {
            leap = calendar.leapMonth(y);
            if(!isAdd) {//处理闰月
                if(leap<=i && leap>0) {
                    offset+=calendar.leapDays(y);isAdd = true;
                }
            }
            offset+=calendar.monthDays(y,i);
        }
        //转换闰月农历 需补充该年闰月的前一个月的时差
        if(isLeapMonth) {offset+=day;}
        //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
        var stmap   =   Date.UTC(1900,1,30,0,0,0);
        var calObj  =   new Date((offset+d-31)*86400000+stmap);
        var cY      =   calObj.getUTCFullYear();
        var cM      =   calObj.getUTCMonth()+1;
        var cD      =   calObj.getUTCDate();
        
        return calendar.solar2lunar(cY,cM,cD);
    }

}
var app = getApp();
const conf = {
  data: {
    // hasEmptyGrid 变量控制是否渲染空格子，若当月第一天是星期天，就不应该渲染空格子
    hasEmptyGrid: false ,
    monthArr:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'] //月份
  },

  // 控制scroll-view高度
  getSystemInfo() {
    try {
      const res = wx.getSystemInfoSync();
      this.setData({
       // scrollViewHeight:  406
        //scrollViewHeight: res.windowHeight * res.pixelRatio || 667
        leftjian:'<',
        rightjian:'>',
      });
    } catch (e) {
     // console.log(e);
    }
  },
  // 获取当月共多少天
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  // 获取当月第一天星期几
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  // 计算当月1号前空了几个格子
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  // 绘制当月天数占的格子
  calculateDays(year, month) {
    let days = [];
    const thisMonthDays = this.getThisMonthDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      var lunar=calendar.solar2lunar(year,month,i);
      var IDayCn=lunar.IDayCn;//农历天
      var Term=lunar.Term;//节气
      var isToday=lunar.isToday;//是否是当天
      var Festival=lunar.lunarFestival || lunar.solarFestival;//节假日
      var gzYear=lunar.gzYear;//天干地支
      var Animal=lunar.Animal;//农历年份
      var IMonthCn=lunar.IMonthCn;//农历月份

      var solarFestivalBX=lunar.solarFestivalBX;//节假日补休

      days.push({cDay:i,cMonth:month,IDayCn:Festival || Term||IDayCn,isToday:isToday,gzYear:gzYear,Animal:Animal,IMonthCn:IMonthCn,IDayCnY:IDayCn,solarFestivalBX:solarFestivalBX,isFestival:(Festival)?true:false});
    }
    console.log(days)
    this.setData({
      days
    });
  },
  // 初始化数据
  onLoad(options) {
    var that=this;
    //console.log(calendar.solar2lunar(),calendar.solar2lunar('1987','11','01'));
    
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;

    const now_year=cur_year,
          now_month=cur_month,
          now_day=date.getDate();
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.getSystemInfo();
    var lunar=calendar.solar2lunar(now_year,now_month,now_day);
    var gzYear=lunar.gzYear;//天干地支
    var Animal=lunar.Animal;//农历年份
    var IMonthCn=lunar.IMonthCn;//农历月份
    var IDayCn=lunar.IDayCn;//农历天
    this.setData({
      cur_year,
      cur_month,
      weeks_ch,
      now_year,
      now_month,
      now_day,
      cur_day:now_day,
      gzYear:gzYear,
      Animal:Animal,
      IMonthCn:IMonthCn,
      IDayCn:IDayCn,
      selected:now_day
    })

    //获取坐标 用于获取天气信息
    this.getLocation();

    //获取壁纸
    this.getwallpager();
    
    app.getUserInfo(function(openid,userInfo){
      
      var nickName=userInfo.nickName;
      
      //console.log(openid,nickName)
    })
    console.log(that.data.days)
  },
  // 切换控制年月
  handleCalendar(e) {
    var that=this;
    //console.log(e.currentTarget)
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = parseInt(cur_year) - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);
      var lunar=calendar.solar2lunar(newYear,newMonth,that.data.cur_day); 
      var gzYear=lunar.gzYear;//天干地支
      var Animal=lunar.Animal;//农历年份
      var IMonthCn=lunar.IMonthCn;//农历月份
      var IDayCn=lunar.IDayCn;//农历天
      this.setData({
        cur_year: newYear,
        cur_month: newMonth,
        gzYear,
        Animal,
        IMonthCn,
        IDayCn
      })

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = parseInt(cur_year) + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      var lunar=calendar.solar2lunar(newYear,newMonth,that.data.cur_day); 
      var gzYear=lunar.gzYear;//天干地支
      var Animal=lunar.Animal;//农历年份
      var IMonthCn=lunar.IMonthCn;//农历月份
      var IDayCn=lunar.IDayCn;//农历天
      this.setData({
        cur_year: newYear,
        cur_month: newMonth,
        gzYear,
        Animal,
        IMonthCn,
        IDayCn
      })
    }
  },
  //选择年份
  bindYearChange: function(e){
    const cur_year = e.detail.value;
    const cur_month = this.data.cur_month;
    this.setData({
      cur_year: e.detail.value
    })
    this.calculateDays(cur_year, cur_month);
    this.calculateEmptyGrids(cur_year, cur_month);
  },
  //选择月份
  bindMonthChange: function(e){
    const cur_year = this.data.cur_year;
    const cur_month = parseInt( e.detail.value)+1;
    this.setData({
      cur_month: cur_month
    })
    this.calculateDays(cur_year, cur_month);
    this.calculateEmptyGrids(cur_year, cur_month);
  },
  //返回今天
  handleBacktoday: function(e){
    var that=this;  
    var lunar=calendar.solar2lunar(that.data.now_year,that.data.now_month,that.data.now_day); 
    var gzYear=lunar.gzYear;//天干地支
    var Animal=lunar.Animal;//农历年份
    var IMonthCn=lunar.IMonthCn;//农历月份
    var IDayCn=lunar.IDayCn;//农历天
    this.setData({
      cur_year:that.data.now_year,
      cur_month: that.data.now_month,
      cur_day:that.data.now_day,
      selected:that.data.now_day,
      gzYear,
      Animal,
      IMonthCn,
      IDayCn
    })
    this.calculateDays(that.data.now_year, that.data.now_month);
    this.calculateEmptyGrids(that.data.now_year, that.data.now_month);
    
    
    
  },
  //选择天
  bindSelectDay:function(e){
    var that=this;
    var index=e.currentTarget.dataset.idx;
    var selectedDay=that.data.days[index];
    that.setData({
      cur_day:selectedDay.cDay,
      gzYear:selectedDay.gzYear,
      Animal:selectedDay.Animal,
      IMonthCn:selectedDay.IMonthCn,
      IDayCn:selectedDay.IDayCnY,
      selected:selectedDay.cDay
    })
  },
  //关闭天气
  handleCloseweather:function(e){
    var that=this;
    this.setData({
      weather_hide:"hide"
    })
  },

  //替换天气图标
  repeatIcon:function(iconLink){
    var that=this;
    //iconLink='http://app1.showapi.com/weather/icon/day/00.png';
    var iconlist=iconLink.split("/");
    var icon_index=iconlist[iconlist.length-1].split(".")[0];
    return '../../images/icon/'+icon_index+'.png'
  },

  //获取天气
  getWeather:function(longitude,latitude){
    var that=this;
    var weekday_arr=['一','二','三','四','五','六','日'];
    //通过经纬度请求数据
        wx.request({
          //这个网站有免费API赶紧收藏
          url: 'https://route.showapi.com/9-5',
          data: {
            showapi_appid: '52597',
            showapi_sign: '16a57bdfe48a450a9e1113d8c62d3247',
            //
            from: '5',
            lng: longitude,
            lat: latitude,
            //获取一周情况 0是不获取
            needMoreDay: '1',
            needIndex: '1'
          },
          success: function (res) {
           console.log("sdfsd",res)
            //console.log(res.data.showapi_res_body.now.api)
           // console.log(that.repeatIcon());
            that.setData({
              city:res.data.showapi_res_body.cityInfo.c5,//城市
              //改变加载状态
              loadingHidden: true,

              currentTemperature: res.data.showapi_res_body.now.temperature,//实时天气
              nightAirTemperature: res.data.showapi_res_body.f1.night_air_temperature,//晚上天气温度(摄氏度)
              dayAirTemperature: res.data.showapi_res_body.f1.day_air_temperature,//白天天气温度(摄氏度)
              weather: res.data.showapi_res_body.now.weather,//天气
              weather_pic:that.repeatIcon(res.data.showapi_res_body.now.weather_pic),//天气小图标
              aqi: res.data.showapi_res_body.now.aqi,//空气指数，越小越好
              quality: res.data.showapi_res_body.now.aqiDetail.quality,//空气质量指数类别，有“优、良、轻度污染、中度污染、重度污染、严重污染”6类
              windPower: res.data.showapi_res_body.now.wind_power,//风力
              windDirection: res.data.showapi_res_body.now.wind_direction,//风向
              //拼接数组
              list: [
                {
                  'day_weather_pic': that.repeatIcon(res.data.showapi_res_body.f2.day_weather_pic),
                  'weekday': weekday_arr[res.data.showapi_res_body.f2.weekday-1],
                  'day_air_temperature': res.data.showapi_res_body.f2.day_air_temperature,
                  'night_air_temperature': res.data.showapi_res_body.f2.night_air_temperature,
                  'day_weather': res.data.showapi_res_body.f2.day_weather
                },
                {
                  'day_weather_pic': that.repeatIcon(res.data.showapi_res_body.f3.day_weather_pic),
                  'weekday': weekday_arr[res.data.showapi_res_body.f3.weekday-1],
                  'day_air_temperature': res.data.showapi_res_body.f3.day_air_temperature,
                  'night_air_temperature': res.data.showapi_res_body.f3.night_air_temperature,
                  'day_weather': res.data.showapi_res_body.f3.day_weather
                },
                {
                  'day_weather_pic': that.repeatIcon(res.data.showapi_res_body.f4.day_weather_pic),
                  'weekday': weekday_arr[res.data.showapi_res_body.f4.weekday-1],
                  'day_air_temperature': res.data.showapi_res_body.f4.day_air_temperature,
                  'night_air_temperature': res.data.showapi_res_body.f4.night_air_temperature,
                  'day_weather': res.data.showapi_res_body.f4.day_weather
                }

              ]
            })
          }
        })
  },
  //获取坐标
  getLocation:function(){
    var that=this;
    wx.getLocation({
      success: function (res) {
        that.getWeather(res.longitude,res.latitude)  
      }
    })
  },
   onShow:function(){
    // 页面显示
    var that=this;
    that.getwallpager()
  },
  //获取壁纸列表
  getwallpager:function(){
    var that=this;
    wx.request({
      url: 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/getlist.php',
      data:{
        paixu:'Lhot'
        },
      success: function (res) {
        if(typeof(res.data)=='string'){

          res.data=res.data.replace(/(^\s*)|(\s*$)/g, "");
          res.data=JSON.parse(res.data);
        } 

        if(res.data.success){
           that.loadpiclist(res.data.items);
        }

      },
      fail:function(res){
        console.log("res",res)
      }
    })
  },
  loadpiclist:function(items){
    var that=this;
    //var items=res.data.data.items;
    var lastLength=items.length>=2?2:items.length;
    items=items.slice(0,lastLength);
    
    that.setData({
      wallpagerlist:items
    });

  },
  //获取壁纸的信息
  binkDetailpic:function(e){
    var that=this;
    var key=e.currentTarget.dataset.key;
    wx.navigateTo({
      url: '../wallpaperdetail/index?sort=hot&key='+key
    })

  },

  go_morelink:function(){
    wx.switchTab({
      url: '../wallpaper/index'
    })
  },
  onShareAppMessage() {
    return {
      title: '日历壁纸',
      desc: '日历壁纸',
      path: 'pages/index/index'
    }
  }
};

Page(conf);
