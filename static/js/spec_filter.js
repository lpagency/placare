$(document).ready(function()
{
    window.z = 0;

    window.default_tag = getClassDefaultTag();

    var random_seed = 'random('+Math.random()+')';

    $(".limpiar").addClass("hidden");

    window.listaTag = [];

    window.tagGroups = { // Groups of tags for 
        'Categoria3' : [], // Tipo calzado
        'Categoria4' : [],
        'Color' : [],  // Color calzado
        'Mat' : [], // Material calzado
        'Marca' : [], // Marca calzado
        'Talla' : [],
        'Taco' : [],
        'Alt_Taco' : [],
        'Alt_Plat' : [],
        'Otros' : []
    };

    window.url_tags = []; // list of tags that go in the url

    var base_url = $.environmentVar(
        'https://apibodegas.loadingplay.com/',
        'https://apibodegas.loadingplay.com/',
        'https://apibodegas.loadingplay.com/');
    var checkout_url = $.environmentVar(
        'http://localhost:8522/',
        'https://lpcheckout.ondev.today',
        'https://pay.loadingplay.com');
    var app_public = $.environmentVar(53,53,53);
    var site_name = $.environmentVar('placare', 'placare', 'placare');

    window.config = {
        'app_public': app_public,
        'base_url': base_url,
        'products_per_page' : 12,
        'tag': window.default_tag,
        'ignore_stock': false,
        'infinite_scroll': false,
        'column' : random_seed,
        // 'maxProducts': 100,
        'checkout_url': checkout_url,
        'operator' :'or',
        'onLoad': function(products)
        {

            //PARCHE ESTUPIDO!!!!!!!

            $(".up-ex").each(function()
            {
                var titulo = $(this).html().replace("_"," ");
                $(this).html(titulo);
            });

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

    $(document).ready(function()
    {
        var scroll = $(window).scrollTop();
        if(scroll > 744)
        {

            window.config.infinite_scroll = true;
            $(".more-products").remove();
            $(".products").ecommerce(config);
            setTimeout(function()
            {
                $("html").scrollTop(scroll);
            },3000);

         }
    });

    //<-------------ORDENAR MAYOR, MENOR, POR NOMBRE Y ORDEN ALEATORIO------------->

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

    $(document).on("click", ".aleatorio", function(ev)
    {
        ev.preventDefault();
        config.column = "random("+Math.random()+")";

        $('.products').html("");
        $('.products').ecommerce('destroy');
        $('.products').ecommerce(config);

        return false;
    });

    $(".limpiar").click(function()
    {
        limpiar();
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

    $("input:checkbox[name=vehicle]").change(function(ev,shouldLoad)
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        window.z = 0;

        updateBlockFilters('#categoria3', nombre, va); // update view of filter blocks

        updateTextRoute(va, "categoria2");

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        // New filter logic

        var groups = window.tagGroups.Categoria3;

        window.tagGroups.Categoria3 = updateGroupTag(groups, nombre);

        window.config.tag = prepareTags(tagGroups);

        var tags = window.url_tags;

        window.url_tags = updateURLTags(tags,nombre);

        var url = getCurrentUrl();
        
        history.pushState('', 'Placare', url+'?tag='+url_tags.join(','));

        if(shouldLoad!==false)
        {
            $('.products').html("");
            $('.products').ecommerce('destroy');
            $('.products').ecommerce(window.config)
        }
    });

    $("input:checkbox[name=color]").change(function(ev,shouldLoad){

        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        window.z = 0;

        updateBlockFilters('#color', nombre, va);

        updateTextRoute(va, "color2");

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        // New filter logic

        var groups = window.tagGroups.Color;

        window.tagGroups.Color = updateGroupTag(groups, nombre);

        window.config.tag = prepareTags(tagGroups);

        var tags = window.url_tags;

        window.url_tags = updateURLTags(tags,nombre);

        var url = getCurrentUrl();

        history.pushState('', 'Placare', url+'?tag='+url_tags.join(','));

        if(shouldLoad!==false)
        {
            $('.products').html("");
            $('.products').ecommerce('destroy');
            $('.products').ecommerce(window.config);
        }

    });

    $("input:checkbox[name=ocasion]").change(function(ev,shouldLoad){

        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        window.z = 0;

        updateBlockFilters('#categoria4', nombre, va);

        updateTextRoute(va, "categoria2");

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        // New filter logic

        var groups = window.tagGroups.Categoria4;

        window.tagGroups.Categoria4 = updateGroupTag(groups, nombre);

        window.config.tag = prepareTags(tagGroups);

        var tags = window.url_tags;

        window.url_tags = updateURLTags(tags,nombre);

        var url = getCurrentUrl();

        history.pushState('', 'Placare', url+'?tag='+url_tags.join(','));

        if(shouldLoad!==false)
        {
            $('.products').html("");
            $('.products').ecommerce('destroy');
            $('.products').ecommerce(window.config);
        }

    });

    $("input:checkbox[name=material]").change(function(ev,shouldLoad)
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        window.z = 0;

        updateBlockFilters('#mat', nombre, va);

        updateTextRoute(va, "mat2");

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        // New filter logic

        var groups = window.tagGroups.Mat;

        window.tagGroups.Mat = updateGroupTag(groups, nombre);

        window.config.tag = prepareTags(tagGroups);

        var tags = window.url_tags;

        window.url_tags = updateURLTags(tags,nombre);

        var url = getCurrentUrl();

        history.pushState('', 'Placare', url+'?tag='+url_tags.join(','));

        if(shouldLoad!==false)
        {
            $('.products').empty();
            $('.products').ecommerce('destroy');
            $('.products').ecommerce(window.config);
        }

    });

    $("input:checkbox[name=marca]").change(function(ev,shouldLoad)
    {
        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        window.z = 0;

        updateBlockFilters('#marca', nombre, va);

        updateTextRoute(va, "marca2");

        if($(".limpiar").hasClass("hidden"))
        {
            $(".limpiar").removeClass("hidden");
        }

        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        // New filter logic

        var groups = window.tagGroups.Marca;

        window.tagGroups.Marca = updateGroupTag(groups, nombre);

        window.config.tag = prepareTags(tagGroups);

        var tags = window.url_tags;

        window.url_tags = updateURLTags(tags,nombre);

        var url = getCurrentUrl();

        history.pushState('', 'Placare', url+'?tag='+url_tags.join(','));

        if(shouldLoad!==false)
        {
            $('.products').html("");
            $('.products').ecommerce('destroy');
            $('.products').ecommerce(window.config);
        }

    });


    $("input:checkbox[name=talla]").change(function(ev, shouldLoad)
    {

        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        window.z = 0;

        updateBlockFilters('#talla', nombre, va);

        updateTextRoute(va, "talla2");

        if($(".limpiar").hasClass("hidden"))
        {
           $(".limpiar").removeClass("hidden");
        }

        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        // New filter logic

        var groups = window.tagGroups.Talla;

        window.tagGroups.Talla = updateGroupTag(groups, nombre);

        window.config.tag = prepareTags(tagGroups);

        var tags = window.url_tags;

        window.url_tags = updateURLTags(tags,nombre);

        var url = getCurrentUrl();

        history.pushState('', 'Placare', url+'?tag='+url_tags.join(','));

        if(shouldLoad!==false)
        {
           $('.products').html("");
           $('.products').ecommerce('destroy');
           $('.products').ecommerce(window.config);
        }

    });

    $("input:checkbox[name=taco]").change(function(ev, shouldLoad)
    {

        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        window.z = 0;

        updateBlockFilters('#Forma_Taco', nombre, va);

        updateTextRoute(va, "taco2");

        if($(".limpiar").hasClass("hidden"))
        {
           $(".limpiar").removeClass("hidden");
        }

        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        // New filter logic

        var groups = window.tagGroups.Taco;

        window.tagGroups.Taco = updateGroupTag(groups, nombre);

        window.config.tag = prepareTags(tagGroups);

        var tags = window.url_tags;

        window.url_tags = updateURLTags(tags,nombre);

        var url = getCurrentUrl();

        history.pushState('', 'Placare', url+'?tag='+url_tags.join(','));

        if(shouldLoad!==false)
        {
           $('.products').html("");
           $('.products').ecommerce('destroy');
           $('.products').ecommerce(window.config);
        }

    });

    $("input:checkbox[name=alt_taco]").change(function(ev, shouldLoad)
    {

        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        window.z = 0;

        updateBlockFilters('#Taco', nombre, va);

        updateTextRoute(va, "alt_taco2");

        if($(".limpiar").hasClass("hidden"))
        {
           $(".limpiar").removeClass("hidden");
        }

        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        // New filter logic

        var groups = window.tagGroups.Alt_Taco;

        window.tagGroups.Alt_Taco = updateGroupTag(groups, nombre);

        window.config.tag = prepareTags(tagGroups);

        var tags = window.url_tags;

        window.url_tags = updateURLTags(tags,nombre);

        var url = getCurrentUrl();

        history.pushState('', 'Placare', url+'?tag='+url_tags.join(','));

        if(shouldLoad!==false)
        {
           $('.products').html("");
           $('.products').ecommerce('destroy');
           $('.products').ecommerce(window.config);
        }

    });


    $("input:checkbox[name=alt_plat]").change(function(ev, shouldLoad)
    {

        var $box = $(this);
        var nombre = $(this).attr("tag");
        var va = $(this).attr("value2");

        window.z = 0;

        updateBlockFilters('#Platform', nombre, va);

        updateTextRoute(va, "alt_plat2");

        if($(".limpiar").hasClass("hidden"))
        {
           $(".limpiar").removeClass("hidden");
        }

        localStorage.setItem("subcategoriaProd", $(".texto-ruta").html());

        // New filter logic

        var groups = window.tagGroups.Alt_Plat;

        window.tagGroups.Alt_Plat = updateGroupTag(groups, nombre);

        window.config.tag = prepareTags(tagGroups);

        var tags = window.url_tags;

        window.url_tags = updateURLTags(tags,nombre);

        var url = getCurrentUrl();

        history.pushState('', 'Placare', url+'?tag='+url_tags.join(','));

        if(shouldLoad!==false)
        {
           $('.products').html("");
           $('.products').ecommerce('destroy');
           $('.products').ecommerce(window.config);
        }

    });

    onLoadInit(); // Load products and filters
}); // End of $(document).ready()

//<-------------------FUNCIONES-------------------->

function onLoadInit(tagGroups, tag_url){
    //Append filters categories
    $('.filtrosRec').append('<li class="fil-ul" id="categoria3"></li>'+
        '<li class="fil-ul" id="categoria4"></li>'+
        '<li class="fil-ul" id="color"></li>'+
        '<li class="fil-ul" id="mat"></li>'+
        '<li class="fil-ul" id="marca"></li>'+
        '<li class="fil-ul" id="talla"></li>'+
        '<li class="fil-ul" id="Forma_Taco"></li>'+
        '<li class="fil-ul" id="Taco"></li>'+ // Altura de taco
        '<li class="fil-ul" id="Platform"></li>'); //Altura plataforma

    //Load default filter from friendly url

    var defaultFilter = getDefaultFilter();

    if(defaultFilter!=="")
        $("."+defaultFilter).trigger('change',[false]);

    // Load filters from tag parameter in url
    if(Utils.getUrlParameter('tag')!==undefined)
    {
        tag_list = Utils.getUrlParameter('tag').split(',');

        tag_list.forEach(function(i){
            var temp = i.replace(/[+-]/g,"");

            if($(window).width()<800) //on mobile
            {
                if(retrieveLocation().includes("mujer")||retrieveLocation().includes("listado_productos"))
                {
                    $('input.mobile-filter.female-filter[type=checkbox]').each(function(a, v){
                        if($(this).hasClass("c-"+temp))
                        {
                            $(this).trigger('change', [false]);
                            $(this).attr('checked',true);
                        }
                    });
                }
            }
            else // on desktop
            {
                $('input.desk-filter[type=checkbox]').each(function(a, v){
                    if($(this).hasClass("c-"+temp))
                    {
                        $(this).trigger('change', [false]);
                        $(this).attr('checked',true);
                    }
                });
            }

            //Test for special filters
            if(/Categoria4_/g.test(temp)||/Cierre_/g.test(temp))
            {
                window.tagGroups.Otros.push(temp);
            }
        });
    }

    if(window.tagGroups.Otros.length>0)
    {
        window.tagGroups.Otros.forEach(function(i)
        {
            window.config.tag+=","+i;
        });
    }

    $('.products').ecommerce('destroy');
    $('.products').ecommerce(window.config);
}


//<---------------FUNCION LIMPIAR------------------>

function limpiar()
{

    window.z = 0;

    $(".limpiar").addClass("hidden");
    $(".texto-ruta").html("Home ");
    $(".fa-check-square").addClass("hidden");

    $('input:checkbox').each(function(){
        $(this).attr('checked',false);
    });

    $('.filtrosRec').children().each(function()
    {
        $(this).empty();
    });

    var defaultTag = getDefaultFilter();

    if(defaultTag!=="")
        $("."+defaultTag).trigger('change',[false]);

    window.tagGroups = { 
        'Categoria3' : [], 
        'Color' : [], 
        'Mat' : [], 
        'Marca' : [],
        'Talla' : [],
        'Taco' : [],
        'Alt_Taco' : [],
        'Alt_Plat' : []
    };

    window.url_tags = [];

    window.config.tag = getClassDefaultTag();
    window.config.column = 'random('+Math.random()+')';

    var url = getCurrentUrl();

    history.pushState('', 'Placare', url+'?tag='); //Agregar url custom

    $('.products').ecommerce('destroy');
    $('.products').ecommerce(window.config);
};

//<-------------END FUNCION LIMPIAR---------------->

function prepareTags(tG){

    var tg = window.default_tag;

    jQuery.each(tG, function(i, val)
    {
        if(val.length>0)
        {
            tg+=",(";
            for(var t in val)
            {
                if(t==0)
                {
                    tg+=val[t];
                }
                else
                {
                    tg+=","+val[t];
                }
            }
            tg+=")";
        }
    });

    return tg;
}

function updateGroupTag(tagGroup, tagName)
{
    if(tagGroup.length>0)
    {
        if(tagGroup.includes("+"+tagName))
        {
            tagGroup.splice(tagGroup.indexOf("+"+tagName),1);
        }
        else
        {
            tagGroup.push("+"+tagName);
        }
    }
    else
    {
        tagGroup.push("+"+tagName);
    }
    return tagGroup;
}

function updateURLTags(tagURL, tag)
{
    if(tagURL.length>0)
    {
        if(tagURL.includes(tag))
        {
            tagURL.splice(tagURL.indexOf(tag),1);
        }
        else
        {
            tagURL.push(tag);
        }
    }else{
        tagURL.push(tag);
    }

    return tagURL;
}

function updateBlockFilters(category, tagName, value){
    var filterBlocks = $(category).find('ul');
    var toAdd = true;
    var auxValue = value;

    if(category==="#Taco"||category==="#Platform")
    {
        if(value%1!==0)
        {
            value = value.toString().replace(".","_");
        }
        else
        {
            value = value.toString()+"_0";
        }
    }

    var className = category.charAt(1).toUpperCase() + category.slice(2) + '_' + value;
    value = auxValue;

    //Special case of category name
    switch(className){
        // Vertical spec filters
        case "Categoria3_Slippers":
            className="Categoria3_Mules";
            break;
        case "Color_Café":
            className="Color_Cafe";
            break;
        case "Color_Metálico":
            className="Color_Metalico";
            break;
        case "Mat_Cuero":
            className="Mat_Capellada_Cuero";
            break;
        case "Mat_Eco Cuero":
            className="Mat_Capellada_Eco_Cuero";
            break;
        case "Marca_Eda Manzini":
            className="Marca_Eda_Manzini";
            break;
        case "Marca_Lola Canales":
            className="Marca_Lola_Canales";
            break;
        // Horizontal spec filter
        case "Forma_Taco_alto":
            className="Forma_Taco_Alto";
            break;
        case "Forma_Taco_bajo":
            className="Forma_Taco_Bajo";
            break;
        case "Forma_Taco_chino":
            className="Forma_Taco_Chino";
            break;


    }

    if(filterBlocks.length>0)
    {
        filterBlocks.each(function(i, val)
        {
            if($(this).hasClass(className))
            {
                $(this).remove();
                toAdd = false;
                return false;
            }
        });

        if(toAdd)
            $(category).append('<ul class="fil-ul '+tagName+'"><li class="ca li-fil"><div class="ordenar-precio '+tagName+'">'+value+'</div></li></ul>');
    }
    else
    {
        $(category).append('<ul class="fil-ul '+tagName+'"><li class="ca li-fil"><div class="ordenar-precio '+tagName+'">'+value+'</div></li></ul>');
    }

        
}

function retrieveLocation(){
    try
    {
        var loc = window.location.href.match(/(?!\/)([^\/]+)\/?$/g).toString();
        if(/(.*?).*(?=\?)/g.test(loc))
        {
            return loc.match(/(.*?)(?=\?)/g)[0];
        }
        else
        {
            return loc;
        }
    }
    catch(ex)
    {
    }
}

function getCurrentUrl(){

    var loc = retrieveLocation();

    var urlPart = "mujer"; //Default value

    var friendlyurls = ["ballerinas","botas","botines","casuales","mocasines","mules","oxford","plataformas","playeras","sandalias","urbanas","zapatillas","zapatos-de-vestir-fiesta","zapatos"];

    friendlyurls.forEach(function(i){
        if(loc.includes(i))
            urlPart = i + "-mujer";
    });

    if(loc.includes("listado_productos"))
        urlPart = "listado_productos";

    if(urlPart==="mules-mujer")
        urlPart = "mules-slippers-mujer";

    return urlPart;
}

function getDefaultFilter(){

    var loc = retrieveLocation();

    var defaultTag = "";

    var friendlyurls = ["ballerinas","botas","botines","casuales","mocasines","mules","oxford","plataformas","playeras","sandalias","urbanas","zapatillas","zapatos-de-vestir-fiesta"];

    friendlyurls.forEach(function(i){
        if(loc.includes(i))
        {
            defaultTag = "c-Categoria3_" + i.charAt(0).toUpperCase() + i.slice(1);
        }
    });

    return defaultTag;
}
function getClassDefaultTag()
{
    var loc = retrieveLocation();

    var defaultTag = "";

    var static_tag = "Categoria2_Calzado_Mujer,-Categoria2_Calzado_Hombre";

    var friendlyurls = ["ballerinas","botas","botines","casuales","mocasines","mules","oxford","plataformas","playeras","sandalias","urbanas","zapatillas","zapatos-de-vestir-fiesta"];

    friendlyurls.forEach(function(i){
        if(loc.includes(i)){
            if(i == "zapatos-de-vestir-fiesta")
            {
                defaultTag = ",Categoria3_Zapatos_de_Vestir_Fiesta";
            }
            else
            {
                defaultTag = ",Categoria3_"+ i.charAt(0).toUpperCase()+i.slice(1);
            }
        }
    });
    return static_tag+defaultTag;
}

function updateTextRoute(name, category){

    var element = '<div class="fil-ul" id="'+category+'">'+name+'</div>';

    var textoRuta = $(".texto-ruta").html();

    if($('#'+category).html()!==undefined)
    {
        $('#'+category).html(name);
    }
    else
    {
        $(".texto-ruta").html(textoRuta + " / " +element);
    }
}