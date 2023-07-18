package com.stefanini.repository;

import com.stefanini.dao.GenericDAO;
import com.stefanini.dto.paginacao.Page;
import com.stefanini.entity.Jogador;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class JogadorRepository extends GenericDAO<Jogador, Long> {

    public Boolean existeJogadorPorNickname(String nickname){
        return getEntityManager()
                .createQuery("SELECT Count(j) > 0 FROM Jogador j WHERE j.nickname = :nickname", Boolean.class)
                .setParameter("nickname", nickname)
                .getSingleResult();
    }

    public Optional<Jogador> buscarJogadorPorNickName(String nickname){
        return createQuery("SELECT j FROM Jogador j LEFT JOIN FETCH j.stefamons s WHERE j.nickname = :nickname")
                .setParameter("nickname", nickname)
                .getResultStream().findFirst();
    }

    public Page<Jogador> buscarOponentesPaginado(Integer pagina, Integer tamanhoPagina){

        List<Jogador> result = createQuery("SELECT j FROM Jogador j JOIN FETCH j.stefamons s")
                .setFirstResult(pagina * tamanhoPagina)
                .setMaxResults(tamanhoPagina)
                .getResultList();

        long count = getEntityManager()
                .createQuery("SELECT COUNT(DISTINCT j) FROM Jogador j JOIN j.stefamons s", Long.class)
                .getSingleResult();

        return new Page<>(result, count);
    }


    public Page<Jogador> buscarRankingJogadoresPaginado(Integer pagina, Integer tamanhoPagina){
         List<Jogador> result = createQuery("SELECT j FROM Jogador j ORDER BY j.qtdVitorias DESC")
                .setFirstResult(pagina * tamanhoPagina)
                .setMaxResults(tamanhoPagina)
                .getResultList();

        long count = getEntityManager()
                .createQuery("SELECT COUNT(j) FROM Jogador j ORDER BY j.qtdVitorias DESC", Long.class)
                .getSingleResult();

        return new Page<>(result, count);
    }
}
