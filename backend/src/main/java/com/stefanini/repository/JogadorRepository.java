package com.stefanini.repository;

import com.stefanini.dao.GenericDAO;
import com.stefanini.entity.Jogador;

import javax.enterprise.context.ApplicationScoped;
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
}
