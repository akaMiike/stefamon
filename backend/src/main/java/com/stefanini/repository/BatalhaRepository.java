package com.stefanini.repository;

import com.stefanini.dao.GenericDAO;
import com.stefanini.dto.paginacao.Page;
import com.stefanini.entity.Batalha;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class BatalhaRepository extends GenericDAO<Batalha, Long> {

    public Page<Batalha> buscarTodasBatalhasPorJogador(Long idJogador, Integer pagina, Integer tamanhoPagina){
        List<Batalha> batalhas = createQuery("SELECT b FROM Batalha b WHERE jogador.id = :idJogador OR oponente.id = :idOponente")
                .setParameter("idJogador", idJogador)
                .setParameter("idOponente", idJogador)
                .setFirstResult(pagina * tamanhoPagina)
                .setMaxResults(tamanhoPagina)
                .getResultList();

        long count = getEntityManager()
                .createQuery("SELECT COUNT(b) FROM Batalha b WHERE jogador.id = :idJogador OR oponente.id = :idOponente", Long.class)
                .setParameter("idJogador", idJogador)
                .setParameter("idOponente", idJogador)
                .getSingleResult();

        return new Page<>(batalhas, count);
    }
}
