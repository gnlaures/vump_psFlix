if ($('.c-responsiveGrid').length) {
    console.log('entrou');
    function removeGridClass(el) {
        for (var i = 1; i <= 12; i++) {
            el.removeClass('--col' + i);
        }
        el.removeClass('--colNaN');
    }
    $(window).on('load resize', function() {
        $('.c-responsiveGrid').each(function( index ) {
            var propsGrid = {
                maxwBreaks: $(this).attr('data-maxw-breaks').split(', ').map(Number),
                maxwCols: $(this).attr('data-maxw-cols').split(', ').map(Number),
                initCols: parseInt($(this).attr('data-cols-init')),
                windowW: $(window).width(),
            };
            var qtfBreaks = propsGrid.maxwBreaks.length;
            if (propsGrid.maxwBreaks.length === propsGrid.maxwCols.length) {
                for (var i = 0; i <= qtfBreaks; i++) {
                    if (propsGrid.maxwBreaks[i] >= propsGrid.windowW) {
                        removeGridClass($(this));
                        $(this).addClass('--col' + propsGrid.maxwCols[i]);
                    }
                    if (propsGrid.windowW > propsGrid.maxwBreaks[0]) {
                        removeGridClass($(this));
                        $(this).addClass('--col' + propsGrid.initCols);
                    }
                }
            } else {
                console.log('Ta faltando media querie ou colunas, verifique seu componente');
            }
        });
    });
}