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
        return createQuery("SELECT j FROM Jogador j WHERE j.nickname = :nickname")
                .setParameter("nickname", nickname)
                .getResultStream().findFirst();
    }

    public Page<Jogador> buscarJogadoresPaginado(Integer pagina, Integer tamanhoPagina){
        CriteriaBuilder builder = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<Jogador> query = builder.createQuery(Jogador.class);
        query.from(Jogador.class);

        int count = getEntityManager().createQuery(query).getResultList().size();
        List<Jogador> result = getEntityManager()
                .createQuery(query)
                .setFirstResult(pagina * tamanhoPagina)
                .setMaxResults(tamanhoPagina)
                .getResultList();

        return new Page<>(result, count);
    }
}
