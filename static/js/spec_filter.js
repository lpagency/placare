var tags = [];

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

    // other tasks
    modifyURL();
    drawFiltersBread();
}

var getURLFilters = function()
{
    var groups =   {};

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

var loadTags = function(tags)
{
    var t = tags.split(",");
    for (var x in t)
    {
        toggleTag(t[x], true);
        $("#" + t[x]).attr("checked", "checked");
    }

    console.log(getURLFilters());
}

var loadTagsFromURL = function()
{
    var url = new URL(document.location.href);
    loadTags(url.searchParams.get("tag"));
}

$(document).on("ready", function()
{
    $(document).on("change", ".checkbox-filter", function()
    {
        var tag = $(this).attr("id");
        toggleTag(tag, $(this).is(":checked"));

        console.log(getURLFilters());
    });

    loadTagsFromURL();
});
