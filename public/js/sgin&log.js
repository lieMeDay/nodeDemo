$(function () {
    $('.signIn').hide()
    // 显示注册
    $('.goIn').click(function () {
        $('.signUp').hide()
        $('.signIn').show()
    })
    // 显示登录
    $('.goUp').click(function () {
        $('.signIn').hide()
        $('.signUp').show()
    })
    // 登录提交
    $('.singUpbtn').click(function (){
        let u=$('#upUser')
        let p=$('#upPass')
        let v=emptyVal(u,p)
        $.ajax({
            url:'/api/user/login',
            type:'get',
            data:v,
            success:function(res){
                console.log(res)
                if(res.code!=200){
                    alert(res.message)
                }else{
                    // $('.showUser').show()
                    // $('.signUp').hide()
                    // $('.signIn').hide()
                    // $('.userMsg').html(res.data.userName+',您好,欢迎光临')
                    window.location.reload()
                }
            }
        })
    })
    // 注册提交
    $('.singInbtn').click(function (){
        let u=$('#inUser')
        let p=$('#inPass')
        let v=emptyVal(u,p)
        // console.log(v)
        $.ajax({
            url:'/api/user/register',
            type:'post',
            data:v,
            // dataType:'json',
            success:function(res){
                console.log(res)
                if(res.code!=200){
                    alert(res.message)
                }else{
                    // $('.showUser').show()
                    // $('.signUp').hide()
                    // $('.signIn').hide()
                    // $('.userMsg').html(res.data.userName+',您好,欢迎光临')
                    window.location.reload()
                }
            }
        })
    })
    // 退出登录
    $('.out').click(function(){
        $.ajax({
            url:'/api/user/logout',
            success:function(res){
                if(res.code==200){
                    window.location.reload()
                }
            }
        })
    })
})
function emptyVal(u, p) {
    if (u.val() == '') {
        u.val('')
        u.attr('placeholder', "请输入账号");
        u.addClass('change')
    } else if (p.val() == '') {
        p.val('')
        p.attr('placeholder', "请输入密码");
        p.addClass('change')
    } else {
        return obj = {
            userName: u.val(),
            passWord: p.val()
        }
    }
}
