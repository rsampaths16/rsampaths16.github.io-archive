(function($) {
    $.chapter = function(context, options) {
        var settings = $.extend({}, $.chapter.defaults, options);
        var $context = $(context);
        var $title = $(settings.titleSelector, $context);
        var $content = $(settings.contentSelector, $context)

        var isViewportInbetweenChapter = function(vh, vt, ch, ct) {
            return (vt >= ct) && ((ct + ch) >= (vt + vh));
        }

        var operate = function() {
            var viewportHeight = $(window).height();
            var viewportTop = $(window).scrollTop();
            var chapterHeight = $context.outerHeight();
            var chapterTop = $context.offset().top;

            if (isViewportInbetweenChapter(viewportHeight, viewportTop, chapterHeight, chapterTop)) {
                var parentWidth = $title.parent().width();

                $title.addClass(settings.fixed).css({top: 0, width: parentWidth});
            } else {
                var newChapterTop = Math.min(chapterHeight - viewportHeight, Math.max(0, viewportTop - chapterTop));
                $title.css({width: ''});
                $title.removeClass(settings.fixed).css({top: newChapterTop});
            }
        }

        var init = function() {
            $(window).on("scroll", operate);
            $(window).on("resize", operate);
            operate(null);
        }

        init();
    }

    $.chapter.defaults = {
        titleSelector: '.chapter__title',
        contentSelector: '.chapter__content',

        fixed: 'chapter__title--fixed',
        activated: 'chapter--activated'
    }

    $.fn.chapter = function(options) {
        return this.each(function() {
            var settings = $.extend({}, $.chapter.defaults, options);

            if ($(this).data(settings.activated) === undefined) {
                var chapter = new $.chapter(this, options);
                $(this).data(settings.activated, true);
            }
        });
    };
})(jQuery);
