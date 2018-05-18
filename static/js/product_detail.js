/* global $ */
$(document).ready(function()
{
    // functions
    // productos relacionados
    var related = function(tag)
    {
        var config = {
            'app_public': app_public,
            'base_url': base_url,
            'maxProducts': 8,
            'templateOrigin': '#product_template',
            'tag': tag,
            'ignore_stock': false
        };

        $('.product-related').ecommerce('product_box', config);
    };

    //cambia imagenes pequeñas en detalle de producto
    $(document).on("click", '.little', function(){
        $("#img_detail").attr("src", $(this).attr('src'));
    });

    // hide mobile stuffs
    $(".mobile2").css("display", "none");

    $(document).on("click", ".bars", function()
    {
        $(".mobile2").toggle("slow");
    });

    // product little images click event
    $(document).on("click", ".main-1", function()
    {
        $(".img_prod_little").css("border", "none");
        $(this).children().css("border", "solid 1px orange");

    });

    // load product detail
    var variants_loaded = false;
    var options = {
        'app_public': app_public,
        'base_url': base_url,
        'checkout_url': checkout_url,
        'product_id': product_id,  // must be setted in window scope
        'site_name': site_name,
        'variants': {
            'product_sku': '',
            'container': '.variants-container',
            'variant_template': '<div class="col-md-12 ">{{ values }}</div>',
            'value_template': '\
                    <div \
                        class="col-md-4 col-sm-4 col-xs-4 size-item \
                            tallas variant-value btn-disabled" variant="{{ variant_name }}"\
                        value="{{ value }}" in_stock={{ in_stock }}>\
                        <span class="size-buttons-size-strike-show"></span>\
                            <div class="num-tal">{{ value }}</div>\
                    </div>',
            'active_class': 'active'
        },
        onLoad: function(product)
        {
            // remove underscore on product names
            $(".up-ex").each(function()
            {
                var titulo = $(this).html().replace("_", " ");
                $(this).html(titulo);
            });
            var titulo = $(".up-ex-detalle").html().replace("_", " ");
            $(".up-ex-detalle").html(titulo);

            // check if variants were triggered, should be trigger just once
            if (variants_loaded)
            {
                return;
            }

            // add some settings
            options.variants.product_sku = product.sku;

            // load variants
            $('.product-detail').ecommerce('load_variants', options);

            // event triggered when a combination was selected
            $('.variants-container').on(
                'combination:selected',
                function(e, d, in_stock)
                {
                    if (in_stock)
                    {
                        $('.add-to-cart').attr('product-combination', d);
                        $('.add-to-cart').removeAttr('disabled');

                    } else {
                        $('.add-to-cart').removeAttr('product-combination');
                        $('.add-to-cart').attr('disabled', true);
                    }
                });

            variants_loaded = true; // execute this onces
            options.onLoad = $.noop;

            // inicialización del codigo de las im
            var res = [];

            for (i in product.tags)
            {
                if (product.tags[i].name.search("mat") != -1)
                {
                    res.push(product.tags[i].name);
                }
            }

            // load related products
            related(res.toString());
            related_random("Poliuretano");
            related2(res.toString());

            // init click for main image
            var mainImage = $("#mainImage");
            $(".img-container img").click(function()
            {
                var src = $(this).attr("src");
                $(".img_prod_detail").attr("src", src);
            });

            mainImage.on("click", function()
            {
                $(this).css("transform", "scale(1.1)");
            });


            var main = $(".descuento-detalle").attr("main-price");
            var promotion = $(".descuento-detalle").attr("promotion-price");

            var promo = Utils.money(promotion);
            var original = Utils.money(main);

            if (promotion > 0)
            {
                var resta = Math.trunc((main - promotion) * 100 / main);
                $(".descuento-detalle").removeClass("hidden");
                $(".descuento-detalle").html("(" + resta + "% OFF)");
                $('.show-on-promotion').removeClass('show-on-promotion');
                $(".precio-oferta").html(promo);
                $(".car").attr("product-price", promotion);
                $(".car-2").attr("product-price", promotion);
            } else {
                $(".descuento-detalle").addClass("hidden");
                $(".hide-on-promotion").removeClass("hidden");
                $(".original-de").addClass("hidden");

                $(".precio-oferta").html(original);
                $(".oferta-de").css("color", "#696e79");
            }

            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 30,
            });

            // seo tools
            $("title").html(product.bullet_2);
            $("meta[name=description]").attr("content", product.bullet_3);
        }
    };

    // load product detail
    $('.product-detail').ecommerce('product_detail', options);
    $('.product-detail').on(
        'variants_stock_loaded',
        function(e, d)
        {
            for (var p in d)
            {
                if (d[p] !== 0)
                {
                    var l = p.split("-");
                    var last = l[l.length - 1];

                    $("[value=" + last + "]").removeClass("btn-disabled");
                    $("[value=" + last + "]").children("span").remove();
                }
            }
        });

    // productos relacionados
    var related = function(tag)
    {
        var config = {
            'app_public': app_public,
            'base_url': base_url,
            'maxProducts': 6,
            'templateOrigin': '#product_template_home',
            'tag': tag,
            'ignore_stock': true
        };
        $('.product-related').ecommerce('product_box', config);
    };

    var related_random = function(tag)
    {
        var config = {
            'app_public': app_public,
            'base_url': base_url,
            'maxProducts': 6,
            'templateOrigin': '#product_template_home',
            'tag': tag,
            'ignore_stock': true
        };
        $('.product-random').ecommerce('product_box', config);
    };

    var related2 = function(tag)
    {
        var config = {
            'app_public': app_public,
            'base_url': base_url,
            'maxProducts': 6,
            'templateOrigin': '#product_template_home2',
            'tag': tag,
            'ignore_stock': true
        };
        $('.product-related2').ecommerce('product_box', config);
    };

    $('#formid').on('keyup keypress', function(e)
    {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13)
        {
            e.preventDefault();
            return false;
        }
    });
});
