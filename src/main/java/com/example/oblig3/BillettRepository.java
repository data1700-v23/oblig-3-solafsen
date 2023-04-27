package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    public void leggTilBilletter(List<Billett> billetter) {
        for (Billett b : billetter) {
            String sql = "INSERT INTO Billett (film,antall,fornavn,etternavn,telefonnr,epost) VALUES(?,?,?,?,?,?)";
            db.update(sql, b.getFilm(), b.getAntall(),
                    b.getFornavn(), b.getEtternavn(),
                    b.getTelefonnr(), b.getEpost());
        }
    }

    public List<Billett> hentAlleBilletter() {
        String sql = "SELECT * FROM Billett";
        List<Billett> allebilletter = db.query(sql, new BeanPropertyRowMapper(Billett.class));
        return allebilletter;
    }

    public Billett hentBestilling(int id) {
        Object[] param = new Object[1];
        param[0] = id;
        String sql = "SELECT * FROM Billett WHERE id=?";
        Billett enBestilling = db.queryForObject(sql, param, BeanPropertyRowMapper.newInstance(Billett.class));
        return enBestilling;
    }

    public void endreBestilling(Billett billett){
        String sql = "UPDATE Billett SET " +
                        "film=?, antall=?, fornavn=?, " +
                        "etternavn=?, telefonnr=?, epost=? where id=?";
        db.update(sql, billett.getFilm(), billett.getAntall(),
                billett.getFornavn(), billett.getEtternavn(),
                billett.getTelefonnr(), billett.getEpost(), billett.getId());
    }

    public void slettEnBestilling(int id) {
        System.out.println(id);
        String sql = "DELETE FROM Billett WHERE id=?";
        db.update(sql,id);
    }

    public void slettAlleBilletter() {
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}
