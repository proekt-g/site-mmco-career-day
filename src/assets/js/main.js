// document.onreadystatechange = function () {
//     if (document.readyState === "interactive") {

//     }
// }
window.addEventListener("load", function () {
    // variables
    // /variables
    // ----------------------------------------------
    // universal function
    function scrollEmulation() {
        let documentWidth = parseInt(document.documentElement.clientWidth)
        let windowsWidth = parseInt(window.innerWidth)
        let scrollbarWidth = windowsWidth - documentWidth
        $("body").css({ "padding-right": `${scrollbarWidth}px` })
        $("body").toggleClass("block")
    }
    function ajaxRequest(ajaxForm, url) {
        try {
            history.replaceState(null, null, "#")
        } catch (z) {
            console.log(z)
        }
        $.ajax({
            url: url,
            type: "POST",
            dataType: "html",
            data: $("#" + ajaxForm).serialize(), // Сеарилизуем объект
            success: function (response) {
                //Данные отправлены успешно
                let result = $.parseJSON(response)
                console.log(result)
            },
            error: function (response) {
                // Данные не отправлены
                alert("Ошибка. Данные не отправлены.")
            },
        })
    }
    function arcctg(x, y) {
        if (x > 0 && y > 0) return Math.PI / 2 - Math.atan(x / y)
        if (x < 0 && y > 0) return Math.PI / 2 - Math.atan(x / y)
        if (x < 0 && y < 0) return Math.PI + Math.atan(y / x)
        if (x > 0 && y < 0) return 3 * Math.PI / 2 + Math.abs(Math.atan(x / y))
        // return Math.PI / 2 - Math.atan(x / y)?
    }
    //  /universal function
    // ----------------------------------------------
    // event
    // Форма Регистрации
    $("#registration-form").on("submit", (e) => {
        e.preventDefault()
        ajaxRequest("registration-form", "test.php")
    })
    // /Форма Регистрации
    // Форма Вход
    $("#sign-in-form").on("submit", (e) => {
        e.preventDefault()
        ajaxRequest("sign-in-form", "test.php")
    })
    // /Форма Вход
    // Форма Сброса пароля
    $("#reset-password-form").on("submit", (e) => {
        e.preventDefault()
        ajaxRequest("reset-password-form", "test.php")
    })
    // /Форма Сброса пароля
    // Форма Нового пароля
    $("#new-password-form").on("submit", (e) => {
        e.preventDefault()
        ajaxRequest("new-password-form", "test.php")
    })
    // /Форма Нового пароля

    $('.modal__close').on('click', () => {
        scrollEmulation()
        $('.modal').toggleClass('modal--open')
    })
    $('.modal__info-link[data-type-button="sign-in"]').on('click', function (e) {
        e.preventDefault()
        modalActive.bind(this)();
    })
    $('.modal__info-link[data-type-button="reset-password"]').on('click', function (e) {
        e.preventDefault()
        modalActive.bind(this)();
        $('.modal .modal__switch').fadeOut(0)
        $('.modal .modal__quick').fadeOut(0)
        $('.modal .modal__text--quick').fadeOut(0)
    })

    $('.button').on('click', modalActive)
    $('.modal__switch-label').on('click', modalActive)
    $('.modal__switch-label').on('click', function () {
        $('.modal__switch-label--active').removeClass('modal__switch-label--active')
        $(this).addClass('modal__switch-label--active')
    })
    $(window).width() <= 1150 && $('.menu').on('click', function () {
        scrollEmulation()
        $(this).toggleClass('menu--open')
    })

    document.addEventListener('mousemove', (e) => {
        let { x, y } = e
        x -= (document.querySelector('.eye').getBoundingClientRect().x + 45)
        y -= (document.querySelector('.eye').getBoundingClientRect().y + 45)
        document.querySelector('.eye__wrapper--one .eye').style.transform = `rotate(${57.2958 * arcctg(x, y)}deg)`
        document.querySelector('.eye__wrapper--two .eye').style.transform = `rotate(${57.2958 * arcctg(x - 200, y + 34)}deg)`
    })

    // /event
    // ----------------------------------------------
    // unique function
    function modalActive() {
        !$('.modal').hasClass('modal--open') && scrollEmulation()
        $('.modal').addClass('modal--open')
        $('.modal__switch-label--active').removeClass('modal__switch-label--active')
        $('.modal .form').fadeOut(0);
        $('.modal .modal__switch').fadeIn(300)
        $('.modal .modal__quick').fadeIn(300)
        $('.modal .modal__text--quick').fadeIn(300)
        switch ($(this).data('type-button')) {
            case 'register':
                $(`.modal__switch-label[data-type-button="register"]`).addClass('modal__switch-label--active')
                $('.modal .registration').fadeIn(300);
                break;
            case 'sign-in':
                $(`.modal__switch-label[data-type-button="sign-in"]`).addClass('modal__switch-label--active')
                $('.modal .sign-in').fadeIn(300);
                break;
            case 'reset-password':
                $('.modal .reset-password').fadeIn(300);
                break;
        }
    }





    // Функция вызова формы ввода нового пароля
    function callNewPassword() {
        modalActive() //Можно отключить если не нужно автооткрытие плашки
        $('.modal .modal__switch').fadeOut(0)
        $('.modal .modal__quick').fadeOut(0)
        $('.modal .modal__text--quick').fadeOut(0)
        $('.modal .new-password').fadeIn(300);
    }
    // /Функция вызова формы ввода нового пароля
    // Функция вызова благодарности
    function callThanks() {
        modalActive() //Можно отключить если не нужно автооткрытие плашки
        $('.modal .modal__switch').fadeOut(0)
        $('.modal .modal__quick').fadeOut(0)
        $('.modal .modal__text--quick').fadeOut(0)
        $('.modal .thanks').fadeIn(300);
    }
    // /Функция вызова благодарности

    // /unique function
    // ----------------------------------------------
    // Page load
    $(window).width() <= 700 && $('.company__text').appendTo('.company .container')
    switch (new URL(window.location.href).hash) {
        case '#reg':
            modalActive()
            $(`.modal__switch-label[data-type-button="register"]`).addClass('modal__switch-label--active')
            $('.modal .registration').fadeIn(300);
            break;
        case '#auth':
            modalActive()
            $(`.modal__switch-label[data-type-button="sign-in"]`).addClass('modal__switch-label--active')
            $('.modal .sign-in').fadeIn(300);
            break;
        case '#rst':
            modalActive()
            $('.modal .modal__switch').fadeOut(0)
            $('.modal .modal__quick').fadeOut(0)
            $('.modal .modal__text--quick').fadeOut(0)
            $('.modal .reset-password').fadeIn(300);
            break;
        case '#new':
            modalActive()
            $('.modal .modal__switch').fadeOut(0)
            $('.modal .modal__quick').fadeOut(0)
            $('.modal .modal__text--quick').fadeOut(0)
            $('.modal .new-password').fadeIn(300);
            break;
        case '#thnk':
            modalActive()
            $('.modal .modal__switch').fadeOut(0)
            $('.modal .modal__quick').fadeOut(0)
            $('.modal .modal__text--quick').fadeOut(0)
            $('.modal .thanks').fadeIn(300);
            break;
    }



    // /Page load
});
