$(document).ready(function () {
    const scrollSpeed = 1;
    const scrollIntervalTime = 10;

    let scrollInterval;

    function checkScrollButtons() {
        const container = $('.scroll-container');
        const leftButton = $('#scrollBtnLeft');
        const rightButton = $('#scrollBtnRight');

        const scrollLeft = container.scrollLeft();
        const scrollWidth = container[0].scrollWidth;
        const containerWidth = container.outerWidth();

        if (scrollLeft > 0) {
            leftButton.css({
                transform: 'translateX(0)',
                opacity: 1
            });
        } else {
            leftButton.css({
                transform: 'translateX(-10000px)',
                opacity: 0
            });
        }

        if (scrollLeft + containerWidth < scrollWidth - 1) {
            rightButton.css({
                transform: 'translateX(0)',
                opacity: 1
            });
        } else {
            rightButton.css({
                transform: 'translateX(-10000px)',
                opacity: 0
            });
        }
    }

    checkScrollButtons();

    $('#scrollBtnRight').click(function () {
        $('.scroll-container').animate({
            scrollLeft: '+=200px'
        }, 500, checkScrollButtons);
    });

    $('#scrollBtnLeft').click(function () {
        $('.scroll-container').animate({
            scrollLeft: '-=200px'
        }, 500, checkScrollButtons);
    });

    $('#scrollBtnRight').on('mouseenter', function () {
        scrollInterval = setInterval(function () {
            $('.scroll-container').scrollLeft($('.scroll-container').scrollLeft() + scrollSpeed);
            checkScrollButtons();
        }, scrollIntervalTime);
    });

    $('#scrollBtnRight').on('mouseleave', function () {
        clearInterval(scrollInterval);
    });

    $('#scrollBtnLeft').on('mouseenter', function () {
        scrollInterval = setInterval(function () {
            $('.scroll-container').scrollLeft($('.scroll-container').scrollLeft() - scrollSpeed);
            checkScrollButtons();
        }, scrollIntervalTime);
    });

    $('#scrollBtnLeft').on('mouseleave', function () {
        clearInterval(scrollInterval);
    });

    $('.scroll-container').on('scroll', function () {
        checkScrollButtons();
    });

    $(window).on('resize', function () {
        checkScrollButtons();
    });


    $('.scroll-container.menu').on('scroll', function () {
        var scrollLeft = $(this).scrollLeft();
        $('#scrollBtnLeft').css('left', scrollLeft);
    });

    $('object[type="image/svg+xml"]').each(function () {
        var $object = $(this);
        var svgUrl = $object.attr('data');

        $.get(svgUrl, function (data) {
            var $svg = $(data).find('svg');

            $.each($object[0].attributes, function () {
                if (this.name === 'data') return;
                $svg.attr(this.name, this.value)
            });

            $object.replaceWith($svg);
        });
    });

    $('.menu-toggle').click(function () {
        $('#sidebar').toggleClass('open-menu');
    });
});
