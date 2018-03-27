/**
 * 页面通用js
 */
;
$(function() {

    var main = {
        render: function() {
            this.showList()
        },
        showList: function() {
            var $btn = $('#btn_add');
            var $overlay = $('#overlay');

            var isHidden = true;

            $btn.on('click', function() {
                if (isHidden) {
                    $overlay.show();
                } else {
                    $overlay.hide()
                }

                isHidden = !isHidden;
            })
        }
    }

    main.render();
})