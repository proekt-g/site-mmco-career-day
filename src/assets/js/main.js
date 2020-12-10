// document.onreadystatechange = function () {
//     if (document.readyState === "interactive") {

//     }
// }
window.addEventListener("load", function () {
    // variables
    let checkTestVerify = false;
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
                // let result = $.parseJSON(response)
                // console.log(result)
                ajaxForm === 'interview-form' &&
                    $.parseJSON(response) === 'true'
                    // true
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
            },
            error: function (response) {
                // Данные не отправлены
                // console.log($.parseJSON(response))

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
    $(".popap__test .popap__close").on("click", (e) => {
        e.preventDefault();
        // Запрос на сервер если закрыли тест



        // /Запрос на сервер если закрыли тест
        closePopap();
    })
    $(".modal-overlay").on("click", (e) => {
        if ($(e.target).hasClass("modal-overlay--active")) closePopap()
    })
    $('.popap__content-answer-input').on('input', function () {
        $(this).parent().toggleClass('popap__content-answer--active')
        $(this).parents('.popap__content-stage').find('.popap__content-button--next').addClass('popap__content-button--disable')
        $(this).parents('.popap__content-step').find('.popap__content-answer-input').each(function () {
            $(this).prop('checked') && $(this).parents('.popap__content-stage').find('.popap__content-button--next').removeClass('popap__content-button--disable')
        })
        // $(this).prop('checked') && $(this).parents('.popap__content-stage').find('.popap__content-button--next').removeClass('popap__content-button--disable')
        // $('.popap__content-answer-input').each((index, item) => {
        //     console.log(item)
        // })
    })
    $('.popap__content-stage--start .button').on('click', (e) => {
        e.preventDefault()
        $('.popap__content-stage--test').toggleClass('popap__content-stage--hidden')
        $('.popap__content-stage--start').toggleClass('popap__content-stage--hidden')
        $('.popap__content-step[data-number-question="1"]').toggleClass('popap__content-step--hidden')
        $('.popap__content-step[data-number-question="1"]').toggleClass('popap__content-step--current')
        timer(10)
    })
    $('.popap__content-button--next').on('click', (e) => {
        e.preventDefault()
        if ($('.popap__content-step--current').next().hasClass('popap__content-step')) {
            const currentStep = $('.popap__content-step--current');
            $('.popap__content-step--current').next().removeClass('popap__content-step--hidden')
            $('.popap__content-step--current').next().addClass('popap__content-step--current')
            currentStep.addClass('popap__content-step--hidden')
            currentStep.removeClass('popap__content-step--current')
            $(".popap__content-amount--current").text($('.popap__content-step--current').data('number-question'))
            $('.popap__content-button--next').addClass('popap__content-button--disable')
            $('.popap__content-button--back').removeClass('popap__content-button--disable')
            $(".popap__content-step--current").find('.popap__content-answer-input').each(function () {
                $(this).prop('checked') && $('.popap__content-button--next').removeClass('popap__content-button--disable')
            })
        } else {
            const arrCheckedAnswer = [];

            $('.popap__content-stage--test').find('.popap__content-answer-input').each(function () {
                $(this).prop('checked') && arrCheckedAnswer.push($(this).parent().data('answer'))
            })
            const a = {
                "701b389b848a2b1cfab867093101d8d5ac56addd": [1, 7, 13],
                '6af49c99148d13d7fa7ff05d627e561f7d53a194': [2, 5, 9, 10, 11]
            }
            for (const key in a) {
                key === sha1($('.popap__test').prop('id')) &&
                    JSON.stringify(a[key]) == JSON.stringify(arrCheckedAnswer) && (


                        ajaxRequest($('.popap__test').prop('id'), "test.php"), // Вот тут происходит отправка, если тест пройден успешно


                        checkTestVerify = true,
                        $('.popap__content-stage--test').addClass('popap__content-stage--hidden'),
                        $('.popap__content-stage--success').removeClass('popap__content-stage--hidden'),
                        $('.interview__block').remove(),
                        $('.interview__box--whait').removeClass('interview__box--hidden')
                    )

            }
            !checkTestVerify && (

                ajaxRequest($('.popap__test').prop('id'), "test.php"),

                $('.popap__content-stage--test').addClass('popap__content-stage--hidden'),
                $('.popap__content-stage--fail').removeClass('popap__content-stage--hidden'),
                $('.interview__block').remove(),
                $('.interview__box--block').removeClass('interview__box--hidden')
            )

        }

    })
    $('.popap__content-button--back').on('click', (e) => {
        e.preventDefault()
        const currentStep = $('.popap__content-step--current');
        $('.popap__content-step--current').prev().removeClass('popap__content-step--hidden')
        $('.popap__content-step--current').prev().addClass('popap__content-step--current')
        currentStep.addClass('popap__content-step--hidden')
        currentStep.removeClass('popap__content-step--current')
        $(".popap__content-amount--current").text($('.popap__content-step--current').data('number-question'))
        $('.popap__content-step--current').data('number-question') === 1 && $('.popap__content-button--back').addClass('popap__content-button--disable')
        $('.popap__content-button--next').removeClass('popap__content-button--disable')
    })
    $('body').on('click', (e) => {
        $(e.target).hasClass('vacancies__box-more') && (
            scrollEmulation(),
            $('.modal-overlay').toggleClass('modal-overlay--active'),
            $('.popap__info').toggleClass('popap--active')
        )
        const share = (($(e.target).hasClass('popap__close') && $(e.target)) || ($(e.target).parents('.popap__close').length && $($(e.target).parents('.popap__close')[0])) || null);
        share && (
            $('.modal-overlay').removeClass('modal-overlay--active'),
            $('.popap__info').removeClass('popap--active')
        )
    })
    // /event
    // ----------------------------------------------
    // unique function
    function timer(time) {
        const date = new Date()
        const timerInterval = setInterval(() => {
            const seconds = (new Date().getMinutes() * 60 + new Date().getSeconds()) - (date.getMinutes() * 60 + date.getSeconds());
            const remainder = (time - seconds) % 60;
            checkTestVerify && clearInterval(timerInterval)
            seconds === time + 1
                ? (
                    clearInterval(timerInterval),
                    $('.popap__content-stage--test').addClass('popap__content-stage--hidden'),
                    $('.popap__content-stage--fail').removeClass('popap__content-stage--hidden'),
                    $('.interview__block').remove(),
                    $('.interview__box--block').removeClass('interview__box--hidden')

                    // Отправка формы, если время истекло



                    // /Отправка формы, если время истекло
                )
                : (
                    $('.popap__content-timer').text(`${Math.trunc((time - seconds) / 60)}:${remainder < 10 ? '0' + remainder : remainder}`),
                    $('.popap__content-indicator').css('width', (parseFloat($('.popap__content-indicator').css('width')) + (650 / time)) + 'px')
                )

        }, 1000)
    }
    function modalActive() {
        if (!$(this).parents('.popap__test').length) {
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


    new Swiper('.webinars__slider .swiper-container', {
        spaceBetween: 20,
        slidesPerView: 'auto',
        grabCursor: true,
        navigation: {
            nextEl: '.webinars__slider .slider-arrow--right',
            prevEl: '.webinars__slider .slider-arrow--left',
        },
    });
    new Swiper('.team__slider .swiper-container', {
        spaceBetween: 20,
        slidesPerView: 'auto',
        grabCursor: true,
        navigation: {
            nextEl: '.team__slider .slider-arrow--right',
            prevEl: '.team__slider .slider-arrow--left',
        },
        breakpoints: {
            900: {
                spaceBetween: 80
            }
        },
        on: {
            slideChange: ({ slides, activeIndex }) => {
                $(window).width() > 1279 && (
                    slides.each((slide, index) => {
                        index < activeIndex
                            ? $(slide).addClass("swiper-slide-prev-prev")
                            : $(slide).removeClass("swiper-slide-prev-prev")
                    }),
                    slides.each((slide, index) => {
                        index > activeIndex + 2
                            ? $(slide).addClass("swiper-slide-next-next")
                            : $(slide).removeClass("swiper-slide-next-next")
                    })
                )
            },
            reachEnd: ({ $el }) => {
                $(window).width() > 1279 &&
                    $($el).parents('.team__slider').find('.swiper-slide-next-next').removeClass('swiper-slide-next-next')
            },
            fromEdge: ({ $el }) => {
                $(window).width() > 1279 &&
                    $($el).parents('.team__slider').find('.swiper-slide-next').addClass('swiper-slide-next-next')
            },
            init: ({ slides, activeIndex }) => {
                $(window).width() > 1279 &&
                    slides.each((slide, index) => {
                        index > activeIndex + 2
                            ? $(slide).addClass("swiper-slide-next-next")
                            : $(slide).removeClass("swiper-slide-next-next")
                    })
            }
        },
    });
    // /Page load
});
