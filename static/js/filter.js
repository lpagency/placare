$(document).ready(function(){

  $(document).on("click", ".botonMasFiltros", function(ev){
    $(".filtro-filtros").toggle(1000);
    $(".filtro-filtros").css("overflow", "visible");
  });

  $(document).on("click", ".botonMasCategorias", function(ev){
    $(".filtro-categorias").toggle(1000);
    $(".filtro-categorias").css("overflow", "visible");
  });

  $(document).on("click", ".botonMasMarca", function(ev){
    $(".filtro-marca").toggle(1000);
    $(".filtro-marca").css("overflow", "visible");
  });
  
$(document).on("click", ".botonMasTalla", function(ev){
    $(".filtro-talla").toggle(1000);
    $(".filtro-talla").css("overflow", "visible");
  });

$(document).on("click", ".botonMasColor", function(ev){
    $(".filtro-color").toggle(1000);
    $(".filtro-color").css("overflow", "visible");
  });

});