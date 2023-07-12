package com.stefanini.repository;

import com.stefanini.dao.GenericDAO;
import com.stefanini.entity.Batalha;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class BatalhaRepository extends GenericDAO<Batalha, Long> {

    public List<Batalha> buscarTodasBatalhasPorJogador(Long idJogador){
        return createQuery("SELECT b FROM Batalha b WHERE jogador.id = :idJogador OR oponente.id = :idOponente")
                .setParameter("idJogador", idJogador)
                .setParameter("idOponente", idJogador)
                .getResultList();
    }
}
