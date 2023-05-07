package com.stefanini.repository;


import com.stefanini.dao.GenericDAO;
import com.stefanini.dto.paginacao.Page;
import com.stefanini.entity.Stefamon;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@ApplicationScoped
public class StefamonRepository extends GenericDAO<Stefamon, Long> {

    public Page<Stefamon> buscarTodosPaginadoEOrdenado(int numPagina, int tamanhoPagina, String ordem, String coluna, String nome){
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<Stefamon> cq = cb.createQuery(Stefamon.class);
        Root<Stefamon> root = cq.from(Stefamon.class);

        if(coluna != null){
            if(ordem.equals("ASC"))
                cq.orderBy(cb.asc(root.get(coluna)));
            else
                cq.orderBy(cb.desc(root.get(coluna)));
        }

        if(nome != null){
            cq.where(cb.like(root.get("nome"), nome + "%"));
        }

        CriteriaQuery<Stefamon> select = cq.select(root);
        var query = getEntityManager().createQuery(select);

        int totalElementos = query.getResultList().size();
        List<Stefamon> resultados = query
                .setFirstResult((numPagina) * tamanhoPagina)
                .setMaxResults(tamanhoPagina)
                .getResultList();

        return new Page<>(resultados,totalElementos);
    }

    public Long buscarQuantidadeStefamons(){
        return getEntityManager()
                .createQuery("SELECT Count(s) FROM Stefamon s", Long.class)
                .getSingleResult();
    }
}
