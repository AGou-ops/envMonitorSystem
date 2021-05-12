(function(){
    var arrLang = {
        "en": {
            "Dashboard": "Dashboard",
            "ems": "EMS",
            "typhoon": "Typhoon",
            "rain": "Rain & Cloud",
            "basic": "Basic",

        },
        "zh": {
            "Dashboard": "面板",
            "ems": "环境信息监测系统",
            "typhoon": "台风",
            "rain": "雨水和云图",
            "basic": "基础",
        }
    };

    $(document).ready(function() {
        // The default language is English
        var lang = "en";
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