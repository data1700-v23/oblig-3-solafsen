$(function(){

    // hent bestilling me id fra url

    const id = window.location.search.substring(1);
    const url = "/hentBestilling?"+id;
    $.get(url,function(bestilling){
        $("#id").val(bestilling.id);
        $("#film-valg").val(bestilling.film);
        $("#billettInput").val(bestilling.antall);
        $("#fornavnInput").val(bestilling.fornavn);
        $("#etternavnInput").val(bestilling.etternavn);
        $("#telefonnrInput").val(bestilling.telefonnr);
        $("#epostInput").val(bestilling.epost);
    });
});

function endreBestilling() {
    const bestilling = {
        id : $("#id").val(),
        film : $("#film-valg").val(),
        antall : $("#billettInput").val(),
        fornavn : $("#fornavnInput").val(),
        etternavn : $("#etternavnInput").val(),
        telefonnr : $("#telefonnrInput").val(),
        epost : $("#epostInput").val()
    }
    $.post("/endreBestilling",bestilling,function(){
        window.location.href = 'index.html';
    });
}
