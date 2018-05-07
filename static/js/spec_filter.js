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
    var t;
    for (t in tags)
    {
        html.push(
            "<div class='filter-crumb'>" +
            $("input[tag=" + tags[t] + "]").attr("label") +
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
    var groups = {};
    var generated = [];
    var group_name, t, g;

    // get tags groups
    for (t in tags)
    {
        group_name = tags[t].split("_")[0];
        if (groups[group_name] === undefined)
            groups[group_name] = [];

        groups[group_name].push(tags[t]);
    }

    // generate url string
    for (g in groups)
    {
        generated.push("+" + groups[g].join(",+"));
    }

    return "(" + generated.join("),(") + ")";
}

$(document).on("change", ".checkbox-filter", function()
{
    var tag = $(this).attr("tag");
    toggleTag(tag, $(this).is(":checked"));

    console.log(getURLFilters());
});
