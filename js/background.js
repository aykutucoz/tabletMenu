function kategoriSayi(devam){
    if(devam)
    {
        if (localStorage.kategoriSayi) {
            localStorage.kategoriSayi = Number(localStorage.kategoriSayi) + 1;
        } else {
            localStorage.kategoriSayi = 1;
        } 
    }
    return localStorage.kategoriSayi ? localStorage.kategoriSayi : 0;
}

function kategoriYukle(){
    $('#kategori').empty().append("<option value='-1'>Seçiniz</option>");
 
    for(var i=1;i<=kategoriSayi(false);i++)
    {
            var kategori = JSON.parse(localStorage.getItem("kategori" + i));
            if(kategori)
            $('#kategori').append("<option value='"+"kategori" + i +"'>"+kategori.kategoriIsim+"</option>"); 
       
        
    }
}

function kategoriDuzenle()
{   
    var kategori = JSON.parse(localStorage.getItem($("#kategoriId").val()));

    var kategoriIsim = $("#kategoriAdi").val();
    var kategoriResim = $("#kategoriResim").val().replace("C:\\fakepath\\","file:///storage/emulated/0/img/");
    
    if(kategori.kategoriIsim != kategoriIsim)
    {
        kategori.kategoriIsim = kategoriIsim;
    }
    if(kategori.kategoriResim != kategoriResim && kategoriResim.length > 0)
    {
        kategori.kategoriResim = kategoriResim;
    }

    localStorage.setItem( $("#kategoriId").val(),JSON.stringify(kategori));
    $("#kategoriId").val("-1");
    $("#kategoriAdi").val("");
    $("#kategoriResim").val("");

    kategoriYukle();
    kategoriListele();    
}

function _kategoriDuzenle(value){
    
    var kategori = JSON.parse(localStorage.getItem(value));
    $("#kategoriAdi").val(kategori.kategoriIsim);

    $("#kategoriId").val(value);
}

function kategoriEkle()
{  

    
    var kategoriIsim = $("#kategoriAdi").val();
    var kategoriResim ="file://localhost/persistent/files/Kofte.png";// $("#kategoriResim").val().replace("C:\\fakepath\\","file:///storage/emulated/0/img/");

    var kategori = {
                    kategoriIsim:kategoriIsim,
                    kategoriResim:kategoriResim
    };

    localStorage.setItem("kategori" + kategoriSayi(true),JSON.stringify(kategori));   

    var listeSay = parseInt(kategoriSayi(false));

    alert(kategoriResim);
    $('#kategoriListe').append("<tr id='kategori"+listeSay+"'>"+
            "<td class='kategoriAdiCell' id='kategoriAdiCell"+ listeSay +"'>"+ kategori.kategoriIsim +"</td>"+
            "<td><a href='#' class='btn btn-default _btnKategoriDuzenle islem' data-kategoriId='"+listeSay+"'><i class='fa fa-pencil'></i></a>"+
            "<a href='#' class='btn btn-default _btnKategoriSil islem' data-kategoriId='"+listeSay+"'><i class='fa fa-trash'></i></a></td>"+
            "</tr>");

    $("#kategoriAdi").val("");
    $("#kategoriResim").val("");
    kategoriYukle();     
}

function kategoriSil(value)
{   
    localStorage.removeItem(value);
    kategoriListele();
}

function kategoriGoster()
{
    for(var i = 1;i <= kategoriSayi(false); i++)
    {
        var kategori = JSON.parse(localStorage.getItem("kategori" + i));
        if(kategori)
        $('#urunPanel').append("<div class='panel panel-default' id='kategoriSecim"+i+"' data-id='"+"kategori"+i+"'>"+
                                "<div class='panel-heading'><img src='"+kategori.kategoriResim +"'/>"+
                                "<h4 class='panel-title'>"+
                                "<div class='bas'></div><a class='menuActive' href='#'>" + kategori.kategoriIsim + "</a></h4>"+
                                "</div></div>");
    }
}

function urunGoster()
{
        var kategori = JSON.parse(sessionStorage.getItem("seciliKategori"));

        $('#urunPanel').empty();
        for(var i = 1;i <= urunSayi(false); i++)
        {           
            var urun = JSON.parse(localStorage.getItem("urun" + i));
            if(urun && urun.kategori == kategori)
            {
                $('#urunPanel').append("<div class='panel panel-default col-xs-4' id='urunSecim"+i+"' data-id='"+"urun"+i+"'>"+
                                "<div class='panel-heading' style='background: url("+ urun.urunResim +");'><h4 class='panel-title'>"+
                                "<div class='bas'></div><a class='menuActive'>" + urun.urunIsim  + "</a></h4></div>"+
                                "<div class='panel-footer'> "+urun.urunFiyat +"</div>"+
                                "</div>");
            }
                    
        }
}

function urunumGoster(){
    var urunum = JSON.parse(sessionStorage.getItem("seciliUrun"));

        $('#urunumPanel').empty();
          
        var urun = JSON.parse(localStorage.getItem(urunum));
        if(urun)
        {
            $('#urunumPanel').append("<div class='panel panel-default col-xs-12' id='urunSecim'>"+
                            "<div class='panel-heading' style='background: url("+ urun.urunResim +");'><h4 class='panel-title'>"+
                            "<div class='bas'></div><a class='menuActive'>" + urun.urunIsim  + "</a></h4>"+
                            "</div>"+
                            "<div class='panel-footer'><h4>"+ urun.urunAciklama +"</h4>"+
                            "<h3>"+ urun.urunFiyat +"</h3>"+
                            "</div></div>");
        }                    
}

function menuGoster(){

}

function lowerCaseStr(string)
{
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function kategoriListele(){
    if(localStorage.length > 1)
    { 
        $('#kategoriListe').empty();
        for(var i = 1;i <= kategoriSayi(false); i++)
        {           
            var kategori = JSON.parse(localStorage.getItem("kategori" + i));
            if(kategori)
            $('#kategoriListe').append("<tr id='kategori"+i+"'>"+
            "<td class='kategoriAdiCell' id='kategoriAdiCell"+ i +"'>"+ kategori.kategoriIsim +"</td>"+
            "<td><a href='#' class='btn btn-default _btnKategoriDuzenle islem' data-kategoriId='"+"kategori"+i+"'><i class='fa fa-pencil'></i></a>"+
            "<a href='#' class='btn btn-default _btnKategoriSil islem' data-kategoriId='"+i+"'><i class='fa fa-trash'></i></a></td>"+
            "</tr>");
                   
        }
    }
    else{
        $('#kategoriListe').empty();
    }
}

function urunSayi(devam){
    if(devam)
    {
        if (localStorage.urunSayi) {
            localStorage.urunSayi = Number(localStorage.urunSayi) + 1;
        } else {
            localStorage.urunSayi = 1;
        } 
    }
    return localStorage.urunSayi ? localStorage.urunSayi : 0;
}

function urunEkle(){

    if($('select[name=kategoriSec]').val()!=-1)
    {
        var kategori = $("#kategori option:selected").val();
        var urunIsim = $("#urunAd").val();
        var urunAciklama = $("#urunAciklama").val();
        var urunResim = $("#urunResim").val().replace("C:\\fakepath\\","file:///storage/emulated/0/img/");
        var urunFiyat = $("#urunFiyat").val()+" ₺";
    
        var urun = {
            kategori : kategori,
            urunIsim : urunIsim,
            urunAciklama : urunAciklama,
            urunResim : urunResim,
            urunFiyat : urunFiyat    
        };
    
        localStorage.setItem("urun" + urunSayi(true),JSON.stringify(urun));
    
        var listeSay = parseInt(urunSayi(false));
    
        $('#urunListe').append("<tr id='urun"+listeSay+"'>"+
                "<td class='urunAdiCell' id='urunAdiCell"+ listeSay +"'>"+ urun.urunIsim +"</td>"+
                "<td class='urunAciklamaCell' id='urunAciklamaCell"+ listeSay +"'>"+ urun.urunAciklama +"</td>"+
                "<td class='urunFiyatCell' id='urunFiyatCell"+ listeSay +"'>"+ urun.urunFiyat +"</td>"+
                "<td><a href='#' class='btn btn-default _btnUrunDuzenle islem' data-urunId='"+listeSay+"'><i class='fa fa-pencil'></i></a>"+
                "<a href='#' class='btn btn-default _btnUrunSil islem' data-urunId='"+listeSay+"'><i class='fa fa-trash'></i></a></td>"+
                "</tr>");
        $("#urunAd").val("");
        $("#urunAciklama").val("");
        $("#urunResim").val("");
        $("#urunFiyat").val("");
    }    

}

function _urunDuzenle(value){
    
    var urun = JSON.parse(localStorage.getItem(value));
    $("#urunAd").val(urun.urunIsim);
    $("#urunAciklama").val(urun.urunAciklama);
    $("#urunFiyat").val(urun.urunFiyat);
    $("#urunId").val(value);
}

function urunDuzenle()
{   
    var urun = JSON.parse(localStorage.getItem($("#urunId").val()));

    var urunIsim = $("#urunAd").val();
    var urunAciklama = $("#urunAciklama").val();
    var urunFiyat = $("#urunFiyat").val();
    var urunResim = $("#urunResim").val().replace("C:\\fakepath\\","file:///storage/emulated/0/img/");
    
    if(urun.urunIsim != urunIsim)
    {
        urun.urunIsim = urunIsim;
    }
    if(urun.urunResim != urunResim && urunResim.length > 0)
    {
        urun.urunResim = urunResim;
    }
    if(urun.urunAciklama != urunAciklama)
    {
        urun.urunAciklama = urunAciklama;
    }
    if(urun.urunFiyat != urunFiyat)
    {
        urun.urunFiyat = urunFiyat +" ₺";
    }

    localStorage.setItem( $("#urunId").val(),JSON.stringify(urun));
    $("#urunId").val("-1");
    $("#urunAd").val("");
    $("#urunAciklama").val("");
    $("#urunFiyat").val("");
    $("#urunResim").val("");

    urunListele();
}

function urunSil(value){
    localStorage.removeItem(value);
    urunListele();
}

function urunListele(){

    var seciliKategori = $('select[name=kategoriSec]').val();

    $('#urunListe').empty();
    for(var i = 1;i <= urunSayi(false); i++)
    {           
        var urun = JSON.parse(localStorage.getItem("urun" + i));
        if(urun && urun.kategori == seciliKategori)
        {
            $('#urunListe').append("<tr id='urun"+i+"'>"+
            "<td class='urunAdiCell' id='urunAdiCell"+ i +"'>"+ urun.urunIsim +"</td>"+
            "<td class='urunAciklamaCell' id='urunAciklamaCell"+ i +"'>"+ urun.urunAciklama +"</td>"+
            "<td class='urunFiyatCell' id='urunFiyatCell"+ i +"'>"+ urun.urunFiyat +"</td>"+
            "<td><a href='#' class='btn btn-default _btnUrunDuzenle islem' data-urunId='"+i+"'><i class='fa fa-pencil'></i></a>"+
            "<a href='#' class='btn btn-default _btnUrunSil islem' data-urunId='"+i+"'><i class='fa fa-trash'></i></a></td>"+
            "</tr>");
        }
                
    }

}

