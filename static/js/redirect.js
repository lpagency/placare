$(document).ready(function()
{
	var url = "http://www.placare.com/";
	var hyper = window.location.href;
	var path_mujer = "listado_productos?tag=Categoria2_Calzado_Mujer,-Categoria2_Calzado_Hombre";
	var path_hombre = "listado_productos_hombre?tag=Categoria2_Calzado_Hombre,-Categoria2_Calzado_Mujer";
	var full_path = "";

	if(hyper.indexOf("mujeres") > -1)
	{
		full_path = url + path_mujer;
	}

	if(hyper.indexOf("hombres") > -1)
	{
		full_path = url + path_hombre;
	}

	if(hyper.indexOf("mujer") > -1)
	{
		var split = hyper.split("-");
		split = split[0].split("/");
		split = split[split.length-1].toString();
		switch (split) {
		    case "sandalias":
		        full_path = url + path_mujer + ",Categoria3_Sandalias";
		        break;
		    case "mocasines":
		        full_path = url + path_mujer + ",Categoria3_Mocasines";
		        break;
		    case "ballerinas":
		        full_path = url + path_mujer + ",Categoria3_Ballerinas";
		        break;
		    case "zapatos":
		        full_path = url + path_mujer + ",Categoria3_Zapatos";
		        break;
		    case "botines":
		        full_path = url + path_mujer + ",Categoria3_Botines";
		        break;
		    case "mules":
		        full_path = url + path_mujer + ",Categoria3_Mules";
		        break;
		    case  "plataformas":
		        full_path = url + path_mujer + ",Categoria3_Plataformas";
		        break;
		    case "playeras":
		    	full_path = url + path_mujer + ",Categoria3_Playeras";
		}
	}

	if(hyper.indexOf("hombre") > -1)
	{
		var split = hyper.split("-");
		split = split[0].split("/");
		split = split[split.length-1].toString();

		switch (split) {
		    case "sandalias":
		        full_path = url + path_hombre + ",Categoria3_Sandalias";
		        break;
		    case "zapatos":
		        full_path = url + path_hombre + ",Categoria3_Zapatos";
		        break;
		    case "botines":
		        full_path = url + path_hombre + ",Categoria3_Botines";
		        break;
		    case "formales":
		        full_path = url + path_hombre + ",Categoria3_Formales";
		}
	}

	setTimeout(function()
	{
		window.location.replace(full_path);
	},1000);
});