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
    function ajaxRequest(ajaxForm, url, element) {
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
                // console.log($.parseJSON(response))
                ajaxForm === 'interview-form' &&
                    // $.parseJSON(response) === 'true'
                    true
                    // false
                    ? (
                        scrollEmulation(),
                        $('.modal-overlay').toggleClass('modal-overlay--active'),
                        $('.popap__test').toggleClass('popap--active')
                    )
                    : (
                        $(element).toggleClass('interview__block-label--close'),
                        $(element).find('.interview__block-label-text').text('Занято')
                    )
                // alert("Ошибка. Данные не отправлены.")
            },
        })
    }
    function closePopap() {
        $('.input-hidden').prop('checked', false);
        scrollEmulation()
        $(".modal-overlay").removeClass("modal-overlay--active")
        $(".popap").removeClass("popap--active")
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


    // Клик на время собеседования
    $("#interview-form").on("input", (e) => {
        e.preventDefault()
        ajaxRequest("interview-form", "test.php", $(e.target).parents('.interview__block-label')[0])
    })
    // /Клик на время собеседования

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
        if (document.querySelector('.eye')) {
            let { x, y } = e
            x -= (document.querySelector('.eye').getBoundingClientRect().x + 45)
            y -= (document.querySelector('.eye').getBoundingClientRect().y + 45)
            document.querySelector('.eye__wrapper--one .eye').style.transform = `rotate(${57.2958 * arcctg(x, y)}deg)`
            document.querySelector('.eye__wrapper--two .eye').style.transform = `rotate(${57.2958 * arcctg(x - 200, y + 34)}deg)`
        }

    })

    $(".share").on('click', function () {
        $(this).find('.information-share').toggleClass('information-share--active')
    })
    $(".filter-switch__text").on("click", function () {
        $(this).parent().toggleClass("filter-switch--active")
        $(this).next().slideToggle(400)
    })
    $('.avatars__more').on("click", function (e) {
        $(e.target).hasClass('avatars__more') && $(e.target) && $(e.target).toggleClass('avatars__more--active')
        const moreElement = (($(e.target).hasClass('avatars__more-element') && $(e.target)) || ($(e.target).parents('.avatars__more-element').length && $($(e.target).parents('.avatars__more-element')[0])) || null);
        moreElement && (
            moreElement.toggleClass('avatars__more-element--active'),
            moreElement.find('.avatars__more-text').slideToggle(400)
        )
    })
    $(".popap__close").on("click", closePopap)
    $(".modal-overlay").on("click", (e) => {
        if ($(e.target).hasClass("modal-overlay--active")) closePopap()
    })
    $('.popap__content-answer-input').on('input', function () {
        $(this).parent().toggleClass('popap__content-answer--active')
    })
    $('.popap__content-stage--start .button').on('click', (e) => {
        e.preventDefault()
        $('.popap__content-stage--hidden').toggleClass('popap__content-stage--hidden')
        $('.popap__content-stage--start').toggleClass('popap__content-stage--hidden')
        $('.popap__content-step[data-number-question="1"]').toggleClass('popap__content-step--hidden')
        timer(20)
    })
    // /event
    // ----------------------------------------------
    // unique function
    function timer(time) {
        const date = new Date()
        const timerInterval = setInterval(() => {
            const seconds = (new Date().getMinutes() * 60 + new Date().getSeconds()) - (date.getMinutes() * 60 + date.getSeconds());
            const remainder = (time - seconds) % 60;
            seconds === time + 1
                ? clearInterval(timerInterval)
                : (
                    $('.popap__content-timer').text(`${Math.trunc((time - seconds) / 60)}:${remainder < 10 ? '0' + remainder : remainder}`),
                    $('.popap__content-indicator').css('width', (parseFloat($('.popap__content-indicator').css('width')) + (650 / time)) + 'px')
                )

        }, 1000)
    }
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

    $(window).width() >= 900 && OverlayScrollbars(document.querySelectorAll(".filter-switch__modal"), {
        paddingAbsolute: true
    });


    new Swiper('.swiper-container', {
        spaceBetween: 20,
        slidesPerView: 'auto',
        grabCursor: true,
        navigation: {
            nextEl: '.slider-arrow--right',
            prevEl: '.slider-arrow--left',
        },
    });
    // /Page load
});
