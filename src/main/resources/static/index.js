
let filmvalg, antall, fornavn, etternavn, telefonnr, epost; // Variabler

// Legger til verdier for variablene

function leggTilFilm(svar) { filmvalg = svar; }
function leggTilBillett(svar) { antall = parseInt(svar); }
function leggTilFornavn(svar) { fornavn = svar.trim(); } // Fjerner hvit mellomrom
function leggTilEtternavn(svar) { etternavn = svar.trim(); }
function leggTilTelefonnr(svar) { telefonnr = parseInt(svar); }
function leggTilEpost(svar) { epost = svar.trim(); }

// Funksjon for å sjekke om feltene er tomme eller ikke.
// Skriv ut feilmeldinger hvis de er tomme.

function kjopBillett() {

    let feil = 0;

    if (filmvalg === undefined || filmvalg === "") { // Feilmelding for filmvalg
        $("#feilmelding-filmvalg").html("Må velge en film");
        feil++;
    } else {
        $("#feilmelding-filmvalg").html("");
    }

    if (antall === undefined || antall.isNaN) { // Feilmelding for antall billetter
        $("#feilmelding-filmvalg").html("Må skrive noe inn i antall");
        feil++;
    } else {
        $("#feilmelding-antall").html("");
    }

    if (fornavn === undefined) { // Feilmelding for fornavn
        $("#feilmelding-filmvalg").html("Må skrive noe inn i fornavnet");
        feil++;
    } else {
        $("#feilmelding-fornavn").html("");
    }

    if (etternavn === undefined) { // Feilmelding for etternavn
        $("#feilmelding-filmvalg").html("Må skrive noe inn i etternavnet");
        feil++;
    } else {
        $("#feilmelding-etternavn").html("");
    }

    if (telefonnr === undefined || telefonnr.isNaN) { // Feilmelding for telefonnummer
        if (isNaN(telefonnr)){
            $("#feilmelding-telefonnr").html("Vennligst skriv inn tall");
        } else {
            $("#feilmelding-telefonnr").html("Må skrive noe inn i telefonnr");
        }
        feil++;
    } else {
        $("#feilmelding-telefonnr").html("");
    }

    if (epost === undefined) { // Feilmelding for epost
        $("#feilmelding-filmvalg").html("Må skrive noe inn i e-post");
        feil++;
    } else {
        $("#feilmelding-epost").html("");
    }

    // Hvis det eksistere en feil, så returnerer det hva som er feil og registerer ikke bestillingen.

    if (feil > 0) { return; }

    // Lagrer billett-objektet i server (databasen) og henter dem tilbake for å printe ut.

    const billett = {
        film: filmvalg,
        antall: antall,
        fornavn: fornavn,
        etternavn: etternavn,
        telefonnr: telefonnr,
        epost: epost
    }

    $.post("/lagre", billett, function () {
        hentAlle();
    })

    // Blanker ut input-feltene

    $("#inp_filmvalg").val("");
    $("#inp_antall").val("");
    $("#inp_fornavn").val("");
    $("#inp_etternavn").val("");
    $("#inp_telefonnr").val("");
    $("#inp_epost").val("");

    // Tømme verdier for variablene etter at den ble registrert

    filmvalg = undefined;
    antall = undefined;
    fornavn = undefined;
    etternavn = undefined;
    telefonnr = undefined;
    epost = undefined;

}

// Kjør og formattere på nytt (laster opp tabellen f.eks. ved sletting av enkelte bestillingen)

$(function(){
    hentAlle()
});

// Henter ut billettene

function hentAlle() {
    $.get("/hentAlle", function(data) {
        formaterData(data);
    });
}

// Skriver ut alle billetter (en kunde per rad)

function formaterData(billetter) {

    let billettTabell = "<br><table class='table table-striped'>";
    let teller = 0;

    for (let i in billetter) {

        if(teller === 0) {     // for at forste raden i tabellen skal skrive ut kun en gang.
            billettTabell += "<tr>" +
                "<th>Film</th><th>Antall</th><th>Navn</th><th>Telefonnr</th><th>Epost</th><th></th>" +
                "</tr>";
        }

        billettTabell += "<tr>" +
                            "<td>"+billetter[i].film+"</td>" +
                            "<td>"+billetter[i].antall+"</td>" +
                            "<td>"+billetter[i].fornavn+" "+billetter[i].etternavn+"</td>" +
                            "<td>"+billetter[i].telefonnr+"</td>" +
                            "<td>"+billetter[i].epost+"</td>" +
                            "<td><a class='btn btn-primary my-2' href='endreBestilling.html?id="+billetter[i].id+"'> Endre </a> &emsp;" + 
                            "<button class='btn btn-danger my-2' onclick='slettEnBestilling("+billetter[i].id+")'> Slett </button></td>" +
                         "</tr>";
         teller++;
    }
    billettTabell += "</table>";
    $("#VisBilletter").html(billettTabell);
}

function slettEnBestilling(id) {  // Slette en bestilling
    const url = "/slettEnBestilling?id="+id;
    $.get(url, function() {
       window.location.href = "/";
    });
}

function slettBilletter() {   // Tømme array
    $.get("/slettAlle", function() {
        window.location.href = "/";
    });
}