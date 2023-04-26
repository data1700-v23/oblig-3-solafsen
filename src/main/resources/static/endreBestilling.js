
$(function(){

    // hent bestilling med bestillingsid fra url og vis den i skjemaet.

    const id = window.location.search.substring(1);
    const url = "/hentBestilling?"+id;
    $.get(url, function(bestilling){
        $("#id").val(bestilling.id); // hidden i html
        $("#inp_filmvalg").val(bestilling.film);
        $("#inp_antall").val(bestilling.antall);
        $("#inp_fornavn").val(bestilling.fornavn);
        $("#inp_etternavn").val(bestilling.etternavn);
        $("#inp_telefonnr").val(bestilling.telefonnr);
        $("#inp_epost").val(bestilling.epost);
    });
});

function endreBestiling() {

    const bestilling = {
        id : $("#id").val(),
        film : $("#inp_filmvalg").val(),
        antall : $("#inp_antall").val(),
        fornavn : $("#inp_fornavn").val(),
        etternavn : $("#inp_etternavn").val(),
        telefonnr : $("#inp_telefonnr").val(),
        epost : $("#inp_epost").val()
    }
    $.post("/endreBestilling", bestilling, function(){
        window.location.href = 'index.html';
    });
}