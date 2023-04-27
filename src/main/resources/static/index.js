let film, antBilletter, fornavn, etternavn, telefonnr, epost;

function leggTilFilm(optionSvar) {film = optionSvar;}
function leggTilBillett(inputSvar) {antBilletter = parseInt(inputSvar);}
function leggTilFornavn(inputSvar) {fornavn = inputSvar.trim();}
function leggTilEtternavn(inputSvar) {etternavn = inputSvar.trim();}
function leggTilTelefonnr(inputSvar) {telefonnr = parseInt(inputSvar);}
function leggTilEpost(inputSvar) {epost = inputSvar.trim();}

function kjopBillett() {
    // Sjekker om feltene er tomme og skriver feilmelding om det er tilefellet:
    let feil = 0;
    if (film === undefined || film === "") {
        $("#film-feilmelding").html("Må velge en film");
        feil++;
    } else {
        $("#film-feilmelding").html("");
    }
    if (antBilletter === undefined || isNaN(antBilletter)) {
        $("#billett-feilmelding").html("Må skrive noe inn i antall");
        feil++;
    } else {
        $("#billett-feilmelding").html("");
    }
    if (fornavn === undefined) {
        $("#fornavn-feilmelding").html("Må skrive noe inn i fornavnet");
        feil++;
    } else {
        $("#fornavn-feilmelding").html("");
    }
    if (etternavn === undefined) {
        $("#etternavn-feilmelding").html("Må skrive noe inn i etternavn");
        feil++;
    } else {
        $("#etternavn-feilmelding").html("");
    }
    if (telefonnr === undefined || isNaN(telefonnr)) {
        if (isNaN(telefonnr)) {
            $("#telefonnr-feilmelding").html("Vennligst skriv inn tall");
        } else {
            $("#telefonnr-feilmelding").html("Må skrive noe inn i telefonnr");
        }
        feil++;
    } else {
        $("#telefonnr-feilmelding").html("");
    }
    if (epost === undefined) {
        $("#epost-feilmelding").html("Må skrive noe inn i epost");
        feil++;
    } else {
        $("#epost-feilmelding").html("");
    }

    // Hvis det er noe feil, så går stanser vi funsksjonen:
    if (feil > 0) {
        return;
    }

    // Lagrer billett-objektet i server og henter dem tilbake for å printe ut:
    const billett = {
        film : film,
        antall : antBilletter,
        fornavn : fornavn,
        etternavn : etternavn,
        telefonnr : telefonnr,
        epost : epost
    }
    $.post("/lagre", billett, function() {
        hentAlle();
    })

    // Blanker ut input-feltene:
    $("#film-valg").val("");
    $("#billettInput").val("");
    $("#fornavnInput").val("");
    $("#etternavnInput").val("");
    $("#telefonnrInput").val("");
    $("#epostInput").val("");

    // Gjør om variablene til undefined:
    film = undefined;
    antBilletter = undefined;
    fornavn = undefined;
    etternavn = undefined;
    telefonnr = undefined;
    epost = undefined;
}

$(function(){
    hentAlle();
});

// Henter ut billettene:
function hentAlle() {
    $.get("/hentAlle", function(data) {
        formaterData(data);
    });
}

// Printer ut billettene (NY):
function formaterData(billetter){
    let billettTabell = "<br><table class='table table-striped'>";
    var teller = 0;
    for (let i in billetter) {
        if (teller === 0) {
            billettTabell += "<tr>" +
                "<th>Film</th><th>Antall</th><th>Navn</th><th>Telefonnr</th><th>Epost</th><th></th>" +
                "</tr>";
        }
        billettTabell += "<tr>" +
                            "<td>"+billetter[i].film+"</td>"+
                            "<td>"+billetter[i].antall+"</td>"+
                            "<td>"+billetter[i].fornavn+" "+ billetter[i].etternavn+"</td>" +
                            "<td>"+billetter[i].telefonnr+"</td>" +
                            "<td>"+billetter[i].epost+"</td>" +
                            "<td><a class='btn btn-primary my-2' href='endreBestilling.html?id="+billetter[i].id+"'> Endre </a>&emsp;" +
                            "<button class='btn btn-danger my-2' onclick='slettEnBestilling("+billetter[i].id+")'> Slett </button></td>" +
                        "</tr>";
        teller++;
    }
    billettTabell += "</table>";
    $("#billettVisning").html(billettTabell);
}

function slettEnBestilling(id) {
    const url = "/slettEnBestilling?id="+id;
    $.get( url, function() {
        window.location.href = "/";
    });
}


function slettBilletter() {
    $.get("/slettAlle", function() {
        window.location.href = "/";
    });
}
