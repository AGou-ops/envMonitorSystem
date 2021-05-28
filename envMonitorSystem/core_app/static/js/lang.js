(function(){
    var arrLang = {
        "en": {
            "Dashboard": "Cimate",
            "ems": "EMS",
            "typhoon": "Typhoon",
            "rain": "Weather & Rain",

        },
        "zh": {
            "Dashboard": "气温气压湿度风向",
            "ems": "环境信息监测系统",
            "typhoon": "台风路径查询",
            "rain": "天气预报及雨水预测",
        }
    };

    $(document).ready(function() {
        // The default language is English
        var lang = "zh";
        $(".lang").each(function(index, element) {
            $(this).text(arrLang[lang][$(this).attr("key")]);
        });
    });

    // get/set the selected language
    $(".translate").click(function() {
        var lang = $(this).attr("id");

        $(".lang").each(function(index, element) {
            $(this).text(arrLang[lang][$(this).attr("key")]);
        });
    });
}());