package com.stefanini.parser;

import com.stefanini.dto.stefamon.StefamonDTO;
import com.stefanini.entity.Stefamon;
import com.stefanini.service.StefamonService;

import javax.inject.Inject;

public class StefamonParser {

    public static Stefamon DtoToEntity(StefamonDTO dto) {
        return new Stefamon(
                dto.getId(),
                dto.getNome(),
                dto.getVida(),
                dto.getAtaque(),
                dto.getDefesa(),
                dto.getInteligencia(),
                dto.getPoder(),
                dto.getVelocidade(),
                dto.getUrlFoto()
        );
    }

    public static StefamonDTO EntityToDto(Stefamon stefamon){
        return new StefamonDTO(
                stefamon.getId(),
                stefamon.getNome(),
                stefamon.getVida(),
                stefamon.getAtaque(),
                stefamon.getDefesa(),
                stefamon.getInteligencia(),
                stefamon.getPoder(),
                stefamon.getVelocidade(),
                stefamon.getUrlFoto()
        );
    }
}
