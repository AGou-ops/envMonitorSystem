(function () {
    $('#zh-privacy').on('click', function () {
        layer.open({
            type: 1,
            area: ['600px', '360px'],
            shadeClose: true,
            content: '\<\div style="padding:20px; color:black;">中文隐私策略\<\/div>'
        });
    });


    $('#en-privacy').on('click', function () {
        layer.open({
            type: 1,
            area: ['600px', '360px'],
            shadeClose: true, //点击遮罩关闭
            content: '\<\div style="padding:20px;color:black;">English privacy\<\/div>'
        });
    });

    $('#loginBtn').on('click', function () {
        var index = layer.load(0, {shade: false, time: 1800});
    });

    $('#id_username').on('click', function () {
        layer.tips('在此填入你的用户名', '#id_username');
    });
    $('#id_password').on('click', function () {
        layer.tips('在此填入你的密码', '#id_password');
    });
    $('#id_email').on('click', function () {
        layer.tips('在此填入你的邮箱', '#id_email');
    });
    $('#id_password1').on('click', function () {
        layer.tips('在此填入你的密码', '#id_password1');
    });
    $('#id_password2').on('click', function () {
        layer.tips('再次输入密码以确认', '#id_password2');
    });
}());
