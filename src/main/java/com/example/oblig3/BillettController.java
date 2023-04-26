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

    @PostMapping("/lagre")
    public void lagreBillett(Billett innBillett){
        List<Billett> alleBilletter = hentAlle();
        slettAlle();

        List<Billett> nyBillettListe = new ArrayList<>();
        boolean lagtTil = false;

        if(alleBilletter.size() < 1) {
            nyBillettListe.add(innBillett);
            lagtTil = true;
        }

        for(Billett b : alleBilletter) {
            if(b.getEtternavn().compareTo(innBillett.getEtternavn()) < 0 || lagtTil) {
                nyBillettListe.add(b);
            } else {
                nyBillettListe.add(innBillett);
                nyBillettListe.add(b);
                lagtTil = true;
            }
        }

        if(!lagtTil) {
            nyBillettListe.add(innBillett);
        }

        rep.leggTilBilletter(nyBillettListe);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlle() { return rep.hentAlleBilletter(); }

    @GetMapping("/hentBestilling")
    public Billett hentBestilling(int id) { return rep.hentBestilling(id); }

    @PostMapping("/endreBestilling")
    public void endreBestilling(Billett billett) { rep.endreBestilling(billett); }

    @GetMapping("/slettEnBestilling")
    public void slettEnBestilling(int id) { rep.slettEnBestilling(id); }

    @GetMapping("/slettAlle")
    public void slettAlle() { rep.slettAlleBilletter(); }
}
