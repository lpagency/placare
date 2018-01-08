$(document).ready(function()
{
    window.z = 0;
    var hyper = Utils.getUrlParameter('tag');
    if(hyper == undefined)
    {
        hyper = "";
    }
    else
    {
        hyper = Utils.getUrlParameter('tag').split(',');
    }

    $(".limpiar").addClass("hidden");

    window.listaTag = [];

    var base_url = $.environmentVar(
        'https://apibodegas.ondev.today/',
        'https://apibodegas.ondev.today/',
        'https://apibodegas.loadingplay.com/');
    var checkout_url = $.environmentVar(
        'https://lpcheckout.ondev.today',
        'https://lpcheckout.ondev.today',
        'https://pay.loadingplay.com');
    var app_public = $.environmentVar(53,53,53);
    var site_name = $.environmentVar('placare', 'placare', 'placare');

    window.config = {
        'app_public': app_public,
        'base_url': base_url,
        'products_per_page' : 12,
        'tag': '',
        'column': 'random',
        'ignore_stock': false,
        'infinite_scroll': false,
        // 'maxProducts': 100,
        'checkout_url': checkout_url,
        'operator' :'or',
        'onLoad': function(products)
        {

            if(products.length == 0)
            {
                $(".link-recargar").removeClass("hidden");
            }
            else
            {
                $(".link-recargar").addClass("hidden");
            }

            $(".letrero-nuevo").each(function()
            {
                var tags = $(this).attr("nuevo");
                if(tags.search("nuevo") != -1)
                {
                    $(this).removeClass("hidden");
                }
            });

            window.z = products.length + z;
            var h =" - "+z.toString()+" Items";

            $(".descuento-lis").each(function()
            {
                var main = $(this).attr("main-price");
                var promotion = $(this).attr("promotion-price");

                if(promotion != 0)
                {
                    var resta = Math.trunc((main - promotion)*100/main);
                    $(this).removeClass("hidden");
                    $(this).html("("+resta+"%)");
                }

            });

            $(".oferta").each(function()
            {
                if($(this).attr("promotion-price") != 0)
                {
                    $(this).removeClass("hidden");
                }
            });

            $(".original-tachado").each(function()
            {
                if($(this).attr("promotion-price") != 0)
                {
                    $(this).removeClass("hidden");
                }
            });

            $(".original").each(function()
            {
                if($(this).attr("promotion-price") != 0)
                {
                    $(this).addClass("hidden");
                }
            });

            $(".letrero-sale").each(function()
            {
                if($(this).attr("promotion-price") != 0)
                {
                    $(this).removeClass("hidden");
                }
            });

            $(".tag-header2").html(h);
        }
    };

    //<-------------ORDENAR MAYOR, MENOR Y POR NOMBRE------------->

    $(document).on("click", ".mayor", function(ev)
    {
        ev.preventDefault();
        config.column = "main_price";
        config.direction = "desc";

        $('.products').html("");
        $('.products').ecommerce("destroy");

        $('.products').ecommerce(config);

        return false;

    });


    $(document).on("click", ".menor", function(ev)
    {
        ev.preventDefault();
        config.column = "main_price";
        config.direction = "asc";

        $('.products').html("");
        $('.products').ecommerce("destroy");
        $('.products').ecommerce(config);

        return false;

    });

    $(document).on("click", ".nombre", function(ev)
    {
        ev.preventDefault();
        config.column = "name";
        config.direction = "asc";

        $('.products').html("");
        $('.products').ecommerce("destroy");
        $('.products').ecommerce(config);

        return false;

    });

    //<-------------END ORDENAR MAYOR, MENOR Y POR ORDEN------------->
    try
    {
        listaTag = Utils.getUrlParameter('tag').split(',');
        window.onload = TagURL(listaTag);
    }
    catch (ex)
    {
        listaTag = [];
        window.onload = TagURL(listaTag);
    }
    config.tag = listaTag.join(',');
    // $('.products').ecommerce(config);
    $('.products').ecommerce(config);

    $(".limpiar").click(function()
    {
        limpiar(config, hyper);
    });

    $(document).on("click", ".variables1", function(ev)
    {

        ev.preventDefault();
        var variable = $(this).attr("tag");
        $(this).removeClass("activo");
        $(".c-"+variable).removeClass("hidden");

        $(".c-variable_2").addClass('hidden');
        $(".c-variable_3").addClass('hidden');
        $(".c-variable_4").addClass('hidden');

        $(".vari").css("margin-bottom", "5%");

    });

    $(document).on("click", ".variables2", function(ev)
    {

        ev.preventDefault();
        var variable = $(this).attr("tag");
        $(this).removeClass("activo");
        $(".c-"+variable).removeClass("hidden");

        $(".c-variable_1").addClass('hidden');
        $(".c-variable_3").addClass('hidden');
        $(".c-variable_4").addClass('hidden');

        $(".vari").css("margin-bottom", "5%");

    });

    $(document).on("click", ".variables3", function(ev)
    {

        ev.preventDefault();
        var variable = $(this).attr("tag");
        $(this).removeClass("activo");
        $(".c-"+variable).removeClass("hidden");

        $(".c-variable_2").addClass('hidden');
        $(".c-variable_1").addClass('hidden');
        $(".c-variable_4").addClass('hidden');

        $(".vari").css("margin-bottom", "5%");

    });

    $(document).on("click", ".variables4", function(ev)
    {

        ev.preventDefault();
        var variable = $(this).attr("tag");
        $(this).removeClass("activo");
        $(".c-"+variable).removeClass("hidden");

        $(".c-variable_2").addClass('hidden');
        $(".c-variable_1").addClass('hidden');
        $(".c-variable_3").addClass('hidden');

        $(".vari").css("margin-bottom", "5%");

    });


    $("input:radio[name=vehicle]").change(function()
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        var element = '<div class="fil-ul" id="categoria2">'+va+'</div>';

        window.z = 0;

        var block =
                '<li class="fil-ul" id="categoria"><ul class="fil-ul '+nombre+'"><li class="ca li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></ul></li>';

        var a = 
                '<ul class="fil-ul '+nombre+'"><li class="ca li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></ul>';

        var classNombre = "."+nombre;
        var textoRuta = $(".texto-ruta").html();

        if($('#categoria').length > 0)
        {
            $("#categoria").html(a);
            $("#categoria2").html(va);
        }
        else
        {
            $(".filtrosRec").html($(".filtrosRec").html() + block);
            $(".texto-ruta").html(textoRuta + " / " +element);
        }

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        var textoRuta = $(".texto-ruta").html();
        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        for(i in window.listaTag)
        {
            if(window.listaTag[i].indexOf("Categoria3_") != -1)
            {
                window.listaTag.splice(i,1);
            }
        }

        window.listaTag.push(nombre);

        window.config.tag = window.listaTag.toString();

        history.pushState('', 'Placare', 'listado_productos?tag='+window.config.tag);

        $('.products').ecommerce('destroy');
        $('.products').ecommerce(window.config);

    });

    $("input:radio[name=color]").change(function()
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        var element = '<div class="fil-ul" id="color2">'+va+'</div>';

        window.z = 0;

        var block =
                '<li class="fil-ul" id="color"><ul class="fil-ul '+nombre+'"><li class="li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></ul></div>';

        var a = 
                '<ul class="fil-ul '+nombre+'"><li class="ca li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></li>';

        var classNombre = "."+nombre;
        var textoRuta = $(".texto-ruta").html();

        if($('#color').length > 0)
        {
            $("#color").html(a);
            $("#color2").html(va);
        }
        else
        {
            $(".filtrosRec").html($(".filtrosRec").html() + block);
            $(".texto-ruta").html(textoRuta + " / " +element);
        }

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        var textoRuta = $(".texto-ruta").html();
        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        for(i in window.listaTag)
        {
            if(window.listaTag[i].indexOf("Color_") != -1)
            {
                window.listaTag.splice(i,1);
            }
        }

        window.listaTag.push(nombre);

        window.config.tag = window.listaTag.toString();

        history.pushState('', 'Placare', 'listado_productos?tag='+window.config.tag);

        $('.products').ecommerce('destroy');
        $('.products').ecommerce(window.config);

    });

    $("input:radio[name=material]").change(function()
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        var element = '<div class="fil-ul" id="material2">'+va+'</div>';

        window.z = 0;

        var block =
                '<li class="fil-ul" id="material"><ul class="fil-ul '+nombre+'"><li class="li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></ul></li>';

        var a = 
                '<ul class="fil-ul '+nombre+'"><li class="ca li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></li>';

        var classNombre = "."+nombre;
        var textoRuta = $(".texto-ruta").html();

        if($('#material').length > 0)
        {
            $("#material").html(a);
            $("#material2").html(va);
        }
        else
        {
            $(".filtrosRec").html($(".filtrosRec").html() + block);
            $(".texto-ruta").html(textoRuta + " / " +element);
        }

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        var textoRuta = $(".texto-ruta").html();
        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        for(i in window.listaTag)
        {
            if(window.listaTag[i].indexOf("Mat_Capellada_") != -1)
            {
                window.listaTag.splice(i,1);
            }
        }

        window.listaTag.push(nombre);

        window.config.tag = window.listaTag.toString();

        history.pushState('', 'Placare', 'listado_productos?tag='+window.config.tag);

        $('.products').ecommerce('destroy');
        $('.products').ecommerce(window.config);

    });

    $("input:radio[name=marca]").change(function()
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");
        var element = '<div class="fil-ul" id="marca2">'+va+'</div>';

        window.z = 0;

        var block =
                '<li class="fil-ul" id="marca"><ul class="fil-ul '+nombre+'"><li class="li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></ul></li>';

        var a = 
                '<ul class="fil-ul '+nombre+'"><li class="ca li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></li>';

        var classNombre = "."+nombre;
        var textoRuta = $(".texto-ruta").html();

        if($('#marca').length > 0)
        {
            $("#marca").html(a);
            $("#marca2").html(va);
        }
        else
        {
            $(".filtrosRec").html($(".filtrosRec").html() + block);
            $(".texto-ruta").html(textoRuta + " / " +element);
        }

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        var textoRuta = $(".texto-ruta").html();
        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        for(i in window.listaTag)
        {
            if(window.listaTag[i].indexOf("Marca_") != -1)
            {
                window.listaTag.splice(i,1);
            }
        }

        window.listaTag.push(nombre);

        window.config.tag = window.listaTag.toString();

        history.pushState('', 'Placare', 'listado_productos?tag='+window.config.tag);

        $('.products').ecommerce('destroy');
        $('.products').ecommerce(window.config);

    });

    $("input:radio[name=ocasion]").change(function()
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        var element = '<div class="fil-ul" id="ocasion2">'+va+'</div>';

        window.z = 0;

        var block =
                '<li class="fil-ul" id="ocasion"><ul class="fil-ul '+nombre+'"><li class="li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></ul></li>';

        var a = 
                '<ul class="fil-ul '+nombre+'"><li class="ca li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></li>';

        var classNombre = "."+nombre;
        var textoRuta = $(".texto-ruta").html();

        if($('#ocasion').length > 0)
        {
            $("#ocasion").html(a);
            $("#ocasion2").html(va);
        }
        else
        {
            $(".filtrosRec").html($(".filtrosRec").html() + block);
            $(".texto-ruta").html(textoRuta + " / " +element);
        }

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        var textoRuta = $(".texto-ruta").html();
        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        for(i in window.listaTag)
        {
            if(window.listaTag[i].indexOf("Categoria4_") != -1)
            {
                window.listaTag.splice(i,1);
            }
        }

        window.listaTag.push(nombre);
        window.config.tag = window.listaTag.toString();

        history.pushState('', 'Placare', 'listado_productos?tag='+window.config.tag);

        $('.products').ecommerce('destroy');
        $('.products').ecommerce(window.config);

    });

    $("input:radio[name=cierre]").change(function()
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        var element = '<div class="fil-ul" id="cierre2">'+va+'</div>';

        window.z = 0;

        var block =
                '<li class="fil-ul" id="cierre"><ul class="fil-ul '+nombre+'"><li class="li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></ul></li>';

        var a = 
                '<ul class="fil-ul '+nombre+'"><li class="ca li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></li>';

        var classNombre = "."+nombre;
        var textoRuta = $(".texto-ruta").html();

        if($('#cierre').length > 0)
        {
            $("#cierre").html(a);
            $("#cierre2").html(va);
        }
        else
        {
            $(".filtrosRec").html($(".filtrosRec").html() + block);
            $(".texto-ruta").html(textoRuta + " / " +element);

        }

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        var textoRuta = $(".texto-ruta").html();
        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        for(i in window.listaTag)
        {
            if(window.listaTag[i].indexOf("Cierre_") != -1)
            {
                window.listaTag.splice(i,1);
            }
        }

        window.listaTag.push(nombre);

        window.config.tag = window.listaTag.toString();

        history.pushState('', 'Placare', 'listado_productos?tag='+window.config.tag);

        $('.products').ecommerce('destroy');
        $('.products').ecommerce(window.config);

    });

    $("input:radio[name=suela]").change(function()
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        var element = '<div class="fil-ul" id="suela2">'+va+'</div>';

        window.z = 0;

        var block =
                '<li class="fil-ul" id="suela"><ul class="fil-ul '+nombre+'"><li class="li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></ul></li>';


        var a = 
                '<ul class="fil-ul '+nombre+'"><li class="ca li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></li>';

        var classNombre = "."+nombre;
        var textoRuta = $(".texto-ruta").html();

        if($('#suela').length > 0)
        {
            $("#suela").html(a);
            $("#suela2").html(va);
        }
        else
        {
            $(".filtrosRec").html($(".filtrosRec").html() + block);
            $(".texto-ruta").html(textoRuta + " / " +element);
        }

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        var textoRuta = $(".texto-ruta").html();
        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        for(i in window.listaTag)
        {
            if(window.listaTag[i].indexOf("Mat_Suela_") != -1)
            {
                window.listaTag.splice(i,1);
            }
        }

        window.listaTag.push(nombre);

        window.config.tag = window.listaTag.toString();

        history.pushState('', 'Placare', 'listado_productos?tag='+window.config.tag);

        $('.products').ecommerce('destroy');
        $('.products').ecommerce(window.config);

    });

    $("input:radio[name=forro]").change(function()
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        var element = '<div class="fil-ul" id="forro2">'+va+'</div>';

        window.z = 0;

        var block =
                '<li class="fil-ul" id="forro"><ul class="fil-ul '+nombre+'"><li class="li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></ul></li>';

        var a = 
                '<ul class="fil-ul '+nombre+'"><li class="ca li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></li>';

        var classNombre = "."+nombre;
        var textoRuta = $(".texto-ruta").html();

        if($('#forro').length > 0)
        {
            $("#forro").html(a);
            $("#forro2").html(va);
        }
        else
        {
            $(".filtrosRec").html($(".filtrosRec").html() + block);
            $(".texto-ruta").html(textoRuta + " / " +element);
        }

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        var textoRuta = $(".texto-ruta").html();
        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        for(i in window.listaTag)
        {
            if(window.listaTag[i].indexOf("Mat_Forro_") != -1)
            {
                window.listaTag.splice(i,1);
            }
        }

        window.listaTag.push(nombre);

        window.config.tag = window.listaTag.toString();

        history.pushState('', 'Placare', 'listado_productos?tag='+window.config.tag);

        $('.products').ecommerce('destroy');
        $('.products').ecommerce(window.config);

    });

    $("input:radio[name=checkbox]").change(function()
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        var element = '<div class="fil-ul" id="checkbox2">'+va+'</div>';

        window.z = 0;

        var block =
                '<li class="fil-ul" id="checkbox"><ul class="fil-ul '+nombre+'"><li class="li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></ul></li>';

        var a = 
                '<ul class="fil-ul '+nombre+'"><li class="ca li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></li>';

        var classNombre = "."+nombre;
        var textoRuta = $(".texto-ruta").html();

        if($('#checkbox').length > 0)
        {
            $("#checkbox").html(a);
            $("#checkbox2").html(va);
        }
        else
        {
            $(".filtrosRec").html($(".filtrosRec").html() + block);
            $(".texto-ruta").html(textoRuta + " / " +element);
        }

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        var textoRuta = $(".texto-ruta").html();
        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        for(i in window.listaTag)
        {
            if(window.listaTag[i].indexOf("Talla_") != -1)
            {
                window.listaTag.splice(i,1);
            }
        }

        window.listaTag.push(nombre);

        window.config.tag = window.listaTag.toString();

        history.pushState('', 'Placare', 'listado_productos?tag='+window.config.tag);

        $('.products').ecommerce('destroy');
        $('.products').ecommerce(window.config);

    });

    $("input:radio[name=checkbox2]").change(function()
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        var element = '<div class="fil-ul" id="checkbox22">'+va+'</div>';

        window.z = 0;

        var block =
                '<li class="fil-ul" id="checkbox2"><ul class="fil-ul '+nombre+'"><li class="li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></ul></li>';

        var a = 
                '<ul class="fil-ul '+nombre+'"><li class="ca li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></li>';

        var classNombre = "."+nombre;
        var textoRuta = $(".texto-ruta").html();

        if($('#checkbox2').length > 0)
        {
            $("#checkbox2").html(a);
            $("#checkbox22").html(va);
        }
        else
        {
            $(".filtrosRec").html($(".filtrosRec").html() + block);
            $(".texto-ruta").html(textoRuta + " / " +element);
        }

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        var textoRuta = $(".texto-ruta").html();
        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        for(i in window.listaTag)
        {
            if(window.listaTag[i].indexOf("Platform_") != -1)
            {
                window.listaTag.splice(i,1);
            }
        }

        window.listaTag.push(nombre);

        window.config.tag = window.listaTag.toString();

        history.pushState('', 'Placare', 'listado_productos?tag='+window.config.tag);

        $('.products').ecommerce('destroy');
        $('.products').ecommerce(window.config);

    });

    $("input:radio[name=checkbox3]").change(function()
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        var element = '<div class="fil-ul" id="checkbox32">'+va+'</div>';

        window.z = 0;

        var block =
                '<li class="fil-ul" id="checkbox3"><ul class="fil-ul '+nombre+'"><li class="li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></ul></li>';

        var a = 
                '<ul class="fil-ul '+nombre+'"><li class="ca li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></li>';

        var classNombre = "."+nombre;
        var textoRuta = $(".texto-ruta").html();

        if($('#checkbox3').length > 0)
        {
            $("#checkbox3").html(a);
            $("#checkbox32").html(va);
        }
        else
        {
            $(".filtrosRec").html($(".filtrosRec").html() + block);
            $(".texto-ruta").html(textoRuta + " / " +element);
        }

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        var textoRuta = $(".texto-ruta").html();
        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        for(i in window.listaTag)
        {
            if(window.listaTag[i].indexOf("Forma_Taco_") != -1)
            {
                window.listaTag.splice(i,1);
            }
        }

        window.listaTag.push(nombre);

        window.config.tag = window.listaTag.toString();

        history.pushState('', 'Placare', 'listado_productos?tag='+window.config.tag);

        $('.products').ecommerce('destroy');
        $('.products').ecommerce(window.config);

    });

    $("input:radio[name=checkbox4]").change(function()
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        var element = '<div class="fil-ul" id="checkbox42">'+va+'</div>';

        window.z = 0;

        var block =
                '<li class="fil-ul" id="checkbox4"><ul class="fil-ul '+nombre+'"><li class="li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></ul></li>';

        var a = 
                '<ul class="fil-ul '+nombre+'"><li class="ca li-fil"><div class="ordenar-precio '+nombre+'"> '
                +va+' <i class="fa fa-times" aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></li>';

        var classNombre = "."+nombre;
        var textoRuta = $(".texto-ruta").html();

        if($('#checkbox4').length > 0)
        {
            $("#checkbox4").html(a);
            $("#checkbox42").html(va);
        }
        else
        {
            $(".filtrosRec").html($(".filtrosRec").html() + block);
            $(".texto-ruta").html(textoRuta + " / " +element);
        }

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        var textoRuta = $(".texto-ruta").html();
        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        for(i in window.listaTag)
        {
            if(window.listaTag[i].indexOf("Taco_") != -1)
            {
                window.listaTag.splice(i,1);
            }
        }

        window.listaTag.push(nombre);

        window.config.tag = window.listaTag.toString();

        history.pushState('', 'Placare', 'listado_productos?tag='+window.config.tag);

        $('.products').ecommerce('destroy');
        $('.products').ecommerce(window.config);

    });


});




//<-------------------FUNCIONES-------------------->



//<--------FUNCION TOMA TAG DESDE LA URL----------->

function TagURL(listaTag)
{

    for (l in listaTag)
    {
        var a = listaTag[l].replace("+", "");
        var b = ".c-" + a;

        if (b != ".c-mujer" && b != ".c--hombre" && b != ".c--mujer" && b != ".c-hombre")
        {

            if($(b).hasClass("check") && $(b).hasClass("categ"))
            {
                var nombre = $(b).attr("value2");
                var va = $(b).attr("value");
                var block =
                        '<ul class="fil-ul '+nombre+'"><li class="li-fil"><div class="ordenar-precio '+nombre+'"> '
                        +va+' <i class="fa fa-times aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+','+"'"+va+"'"+')"></i></div></li></ul>';

                var classNombre = "." + nombre;
                var textoRuta = "Home";
                var fa = "fa-" + nombre;
                $(".h-"+nombre).css("text-decoration", "underline");

                $(b).attr("checked", true);
                $(".ch-"+nombre).removeClass("hidden");

                // $(".h-"+a).attr('onclick','uncheck("'+a+'","'+nombre+'");');

                if($(".ch-"+nombre).hasClass("c-variable_uno"))
                {
                    $(".c-variable_1").removeClass("hidden");
                    $(".c-variable_2").addClass("hidden");
                    $(".c-variable_3").addClass("hidden");
                    $(".c-variable_4").addClass("hidden");
                }
                if($(".ch-"+nombre).hasClass("c-variable_dos"))
                {
                    $(".c-variable_2").removeClass("hidden");
                    $(".c-variable_1").addClass("hidden");
                    $(".c-variable_3").addClass("hidden");
                    $(".c-variable_4").addClass("hidden");

                }
                if($(".ch-"+nombre).hasClass("c-variable_tres"))
                {
                    $(".c-variable_3").removeClass("hidden");
                    $(".c-variable_2").addClass("hidden");
                    $(".c-variable_1").addClass("hidden");
                    $(".c-variable_4").addClass("hidden");
                }

                if($(".ch-"+nombre).hasClass("c-variable_cuatro"))
                {
                    $(".c-variable_4").removeClass("hidden");
                    $(".c-variable_2").addClass("hidden");
                    $(".c-variable_1").addClass("hidden");
                    $(".c-variable_3").addClass("hidden");
                    $(".vari").css("height", "169px");
                }

                $(".texto-ruta").html(textoRuta +" / "+ va);

                $(".filtrosRec").html($(".filtrosRec").html() + block);
                $(".limpiar").removeClass("hidden");
                $(".vari").css("margin-bottom", "5%");
            }
            else
            {
                if ($(b).hasClass("categ"))
                {
                    if($(b).attr("value2") != undefined)
                    {
                        var nombre2 = $(b).attr("value2");
                        var nombre = $(b).attr("tag");
                        var block =
                                '<ul class="fil-ul '+nombre+'"><li class="li-fil"><div class="ordenar-precio '+nombre+'"> '
                                +nombre2+' <i class="fa fa-times aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+')"></i></div></li></ul>';

                        $(".texto-ruta").html(textoRuta +" / "+ nombre2);
                    }
                    else
                    {
                        var nombre = $(b).attr("tag");
                        var block =
                                '<ul class="fil-ul '+nombre+'"><li class="li-fil"><div class="ordenar-precio '+nombre+'"> '
                                +nombre+' <i class="fa fa-times aria-hidden="true" onclick="borrar('+"'"+nombre+"'"+')"></i></div></li></ul>';

                        $(".texto-ruta").html(textoRuta +" / "+ nombre);
                    }

                    var classNombre = "." + nombre;
                    var textoRuta = $(".texto-ruta").html();
                    var fa = "fa-" + nombre;
                    $(".h-"+nombre).css("text-decoration", "underline");

                     $(".h-"+nombre).attr('onclick','uncheck("'+nombre+'","'+nombre2+'");');

                    $(b).attr("checked", true);
                    $(".ch-"+nombre).removeClass("hidden");

                    $(".filtrosRec").html($(".filtrosRec").html() + block);
                    $(".limpiar").removeClass("hidden");
                }
            }
        }
    }
};

//<------END FUNCION TOMA TAG DESDE LA URL--------->

//<---------------FUNCION LIMPIAR------------------>

function limpiar(config, hyper)
{

    window.z = 0;

    $(".filtrosRec").html("");
    $("input:radio").attr("checked", false);

    $(".limpiar").addClass("hidden");
    $(".texto-ruta").html("Home ");
    $(".fa-check-square").addClass("hidden");

    config.tag =hyper[0] +","+ hyper[1];

    listaTag = [];

    listaTag.push(config.tag);
    $('.products').ecommerce('destroy');
    $('.products').ecommerce(config);
    history.pushState('', 'Placare', 'listado_productos?tag='+config.tag);
};

//<-------------END FUNCION LIMPIAR---------------->

//<----------------FUNCION BORRAR------------------>

function borrar(nombre,value)
{

    window.z = 0;

    if(value == undefined)
    {
        $( "."+nombre ).remove();
        $(".ch-"+nombre).addClass("hidden");

        var textoRuta = $(".texto-ruta").html();
        var nombre2 = "+"+nombre;

        textoRuta = textoRuta.replace(" / "+nombre, "");
        $(".texto-ruta").html(textoRuta);

        for(x in window.listaTag)
        {
            if(window.listaTag[x] == nombre2)
            {
                window.listaTag.splice(x,1);
                window.config.tag =window.listaTag.toString();
            };
        };
        history.pushState('', 'Placare', 'listado_productos?tag='+window.config.tag);

        $('.products').ecommerce('destroy');
        $('.products').ecommerce(window.config);
    }
    else
    {
        $( "."+nombre ).remove();
        $(".ch-"+nombre).addClass("hidden");

        var textoRuta = $(".texto-ruta").html();

        textoRuta = textoRuta.replace(" / "+value, "");
        $(".texto-ruta").html(textoRuta);

        for(x in window.listaTag)
        {
            if(window.listaTag[x] == nombre)
            {
                window.listaTag.splice(x,1);
                window.config.tag =window.listaTag.toString();
            };
        };

        history.pushState('', 'Placare', 'listado_productos?tag='+window.config.tag);

        $('.products').ecommerce('destroy');
        $('.products').ecommerce(window.config);
    }
};
