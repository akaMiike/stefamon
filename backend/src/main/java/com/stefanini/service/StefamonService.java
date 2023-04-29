package com.stefanini.service;

import com.stefanini.dto.paginacao.PageDTO;
import com.stefanini.dto.stefamon.StefamonDTO;
import com.stefanini.entity.Stefamon;
import com.stefanini.exceptions.stefamon.StefamonNaoEncontradoException;
import com.stefanini.parser.StefamonParser;
import com.stefanini.repository.StefamonRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@ApplicationScoped
public class StefamonService {

    @Inject
    StefamonRepository repository;

    public List<StefamonDTO> listarTodos(){
        return repository.listAll().stream()
                .map(StefamonParser::EntityToDto)
                .collect(Collectors.toList());

    }

    public PageDTO<StefamonDTO> listarTodosPaginado(int numPagina, int tamanhoPagina, String ordem, String coluna){
        List<StefamonDTO> elementos = repository.buscarTodosPaginadoEOrdenado(numPagina, tamanhoPagina, ordem, coluna).stream()
                .map(StefamonParser::EntityToDto)
                .collect(Collectors.toList());

        int totalPaginas = (int) Math.ceil( (double) repository.buscarQuantidadeStefamons() / tamanhoPagina);

        return new PageDTO<>(elementos,totalPaginas);
    }


    public StefamonDTO buscarPorId(Long id) {
        var stefamon =  repository.findById(id);
        if(Objects.isNull(stefamon)) {
            throw new StefamonNaoEncontradoException("Stefamon de id " + id + " não foi encontrado.");
        }
        return StefamonParser.EntityToDto(stefamon);
    }

 }
