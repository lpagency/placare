var tags = window.url_tags;

var modifyURL = function()
{
    history.replaceState(
        '', document.title, document.location.pathname + '?tag=' + tags.join(',')
    );
}

var drawFiltersBread = function()
{
    var html = [];
    for (var t in tags)
    {
        html.push(
            "<div class='filter-crumb'>" +
            $("#" + tags[t]).attr("label") +
            "</div>");
    }

    $(".filters-breadcrumb").html(html.join(""));
}

var toggleTag = function(tag, should_add)
{
    var index = tags.indexOf(tag);
    if (index === -1)
        tags.push(tag);
    else
        tags.splice(index, 1);
}

var getURLFilters = function()
{
    var groups = {};

    // get tags groups
    for (var t in tags)
    {
        var group_name = tags[t].split("_")[0];
        if (groups[group_name] === undefined)
            groups[group_name] = [];

        groups[group_name].push(tags[t]);
    }

    // generate url string
    var generated = [];
    for (var g in groups)
    {
        generated.push("+" + groups[g].join(",+"));
    }

    return "(" + generated.join("),(") + ")";
}

var reloadEcommerce = function()
{
    window.config.tag = getURLFilters();

    $('.products').html("");
    $('.products').ecommerce("destroy");
    $('.products').ecommerce(config);

    modifyURL();
}

var loadTags = function(t)
{
    if (t === null || t === "")
        t = [];
    else
        t = t.split(",");

    for (var x in t)
    {
        tags.push(t[x]);
        $("#" + t[x]).attr("checked", "checked");
    }
}

var loadTagsFromURL = function()
{
    var url = new URL(document.location.href);
    loadTags(url.searchParams.get("tag"));

    drawFiltersBread();
}

var clearWhiteTags = function()
{
    while (tags.indexOf("") !== -1)
    {
        tags.splice(tags.indexOf(""), 1);
    }
}

$(document).on("ready", function()
{
    var random_seed = 'random('+Math.random()+')';
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

    // load tags from url before init the checkbox filter events
    clearWhiteTags();  // clear bad formatted tags
    loadTagsFromURL();  // load current tags from URL

    // init config for ecommerce
    var total_products = 0;
    window.config = {
        'app_public': app_public,
        'base_url': base_url,
        'products_per_page' : 12,
        'tag': tags,
        'ignore_stock': false,
        'infinite_scroll': false,
        'column' : random_seed,
        'checkout_url': checkout_url,
        'operator' :'or',
        'onLoad': function(products)
        {
            // fix products titles
            $(".up-ex").each(function()
            {
                $(this).html($(this).html().replace("_"," "));
            });

            // show - hidden reload button
            if(products.length == 0)
                $(".link-recargar").removeClass("hidden");
            else
                $(".link-recargar").addClass("hidden");

            // new arrival tag
            $(".letrero-nuevo").each(function()
            {
                var tags = $(this).attr("nuevo");
                if(tags.search("nuevo") !== -1)
                    $(this).removeClass("hidden");
            });

            // total products
            total_products += products.length;
            var h = " - " + total_products + " Items";
            $(".tag-header2").html(h);

            // check discount
            $(".descuento-lis").each(function()
            {
                var main = $(this).attr("main-price");
                var promotion = $(this).attr("promotion-price");

                if(promotion != 0)
                {
                    // calculate percentage
                    var resta = Math.trunc((main - promotion)*100/main);
                    $(this).removeClass("hidden");
                    $(this).html("("+resta+"%)");
                }
            });

            // show sale price
            $(".oferta").each(function()
            {
                if($(this).attr("promotion-price") != 0)
                    $(this).removeClass("hidden");
            });

            // show dashed price
            $(".original-tachado").each(function()
            {
                if($(this).attr("promotion-price") != 0)
                {
                    $(this).removeClass("hidden");
                }
            });

            // hide original price
            $(".original").each(function()
            {
                if($(this).attr("promotion-price") != 0)
                {
                    $(this).addClass("hidden");
                }
            });

            // show sale tag
            $(".letrero-sale").each(function()
            {
                if($(this).attr("promotion-price") != 0)
                {
                    $(this).removeClass("hidden");
                }
            });
        }
    };

    reloadEcommerce();  // load ecommerce for first time

    $(document).on("change", ".checkbox-filter", function()
    {
        var tag = $(this).attr("id");
        toggleTag(tag, $(this).is(":checked"));

        // other tasks
        total_products = 0;
        clearWhiteTags();
        drawFiltersBread();
        reloadEcommerce();
    });

    // logic for sort by
    $(document).on("click", ".sort-by", function(e)
    {
        e.preventDefault();

        var field = $(this).attr("field");
        var dir = $(this).attr("dir");

        if (field === "random")
            field = random_seed;  // random seed created from the beggining

        if (dir === "toggle" && window.config.direction === "asc")
            dir = "desc";
        else if (dir === "toggle" && window.config.direction === "desc")
            dir = "asc";

        window.config.column = field;
        window.config.direction = dir;

        reloadEcommerce();
    });

    // clear tags button
    $(document).on("click", ".limpiar", function(e)
    {
        e.preventDefault();

        // clear tags
        tags = [];
        total_products = 0;
        $(".checkbox-filter").removeAttr("checked");

        drawFiltersBread();
        reloadEcommerce();
    })
});
