package com.example.oblig3;

public class Billett {
    private int id;
    private String film;
    private int antall;
    private String fornavn;
    private String etternavn;
    private int telefonnr;
    private String epost;

    public Billett(String a, int b, String c, String d, int e, String f, int g) {
        film = a;
        antall = b;
        fornavn = c;
        etternavn = d;
        telefonnr = e;
        epost = f;
        id = g;
    }

    public Billett() { }

    // Get-metodene:
    public String getFilm() {return film;}
    public int getAntall() {return antall;}
    public String getFornavn() {return fornavn;}
    public String getEtternavn() {return etternavn;}
    public int getTelefonnr() {return telefonnr;}
    public String getEpost() {return epost;}
    public int getId() {return id;}

    // Set-metodene:
    public void setFilm(String a) {film = a;}
    public void setAntall(int b) {antall = b;}
    public void setFornavn(String c) {fornavn = c;}
    public void setEtternavn(String d) {etternavn = d;}
    public void setTelefonnr(int e) {telefonnr = e;}
    public void setEpost(String f) {epost = f;}
    public void setId(int g) {id = g;}

}
