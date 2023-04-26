package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {

    @Autowired
    private BillettRepository rep;

    // Sortering av etternavn

    @PostMapping("/lagre")
    public void lagreBillett(Billett innBillett){
        List<Billett> alleBilletter = hentAlle(); // Hente inn alle billetter som er i serveren
        slettAlle(); // Sletter dem
        List<Billett> nyBillettListe = new ArrayList<>(); // Lager en ny liste som man kan sortere dem (legger tilbake i)
        boolean lagtTil = false;
        if (alleBilletter.size() < 1) { // Hvis det ikke finnes noe billetter i serveren
            nyBillettListe.add(innBillett); // Legger inn den første billetten
            lagtTil = true; // Oppdatere variabel
        }
        for (Billett b : alleBilletter) { // Itiere gjennom alle billetter fra serveren
            if (b.getEtternavn().compareTo(innBillett.getEtternavn()) < 0 || lagtTil) { // Sammenligner strenger
                // Dette er for bokstavene som kommer etter det som finnes på serveren (alfabetisk)
                nyBillettListe.add(b); // Legger tilbake i samme rekkefølgen. Ingen forandring med den som ligger i serveren
            } else { // For de etternavnene som har alfabeter lengre frem enn den som er på serveren
                nyBillettListe.add(innBillett); // Sortere dem da alfabetisk. Push den som kom først inn først i stack
                nyBillettListe.add(b);
                lagtTil = true; // Oppdatere variabel
            }
        }
        if (!lagtTil) { // For bokstavene som kommer etter de som finnes på serveren (alfabetisk)
            nyBillettListe.add(innBillett);
        }
        rep.leggTilBilletter(nyBillettListe); // legger til den nye billettliste - ferdig sortert
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlle(){
        return rep.hentAlleBilletter();
    }

    @GetMapping("/hentBestilling")
    public Billett hentBestilling(int id){
        return rep.hentBestilling(id);
    }

    @PostMapping("/endreBestilling")
    public void endreBestilling(Billett billett){
        rep.endreBestilling(billett);
    }

    @GetMapping("/slettEnBestilling")
    public void slettEnKunde(int id){
        rep.slettEnBestilling(id);
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){
        rep.slettAlleBilletter();
    }
}