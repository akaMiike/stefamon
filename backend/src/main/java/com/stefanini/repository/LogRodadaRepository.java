package com.stefanini.repository;

import com.stefanini.dao.GenericDAO;
import com.stefanini.entity.LogRodada;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class LogRodadaRepository extends GenericDAO<LogRodada, Long> {

    public List<LogRodada> buscarLogsPorBatalha(Long idBatalha){
        return createQuery("SELECT logs FROM LogRodada logs WHERE batalha.id = :idBatalha ORDER BY numRodada ASC")
                .setParameter("idBatalha", idBatalha)
                .getResultList();
    }
}
