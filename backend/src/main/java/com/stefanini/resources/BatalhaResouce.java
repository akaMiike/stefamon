package com.stefanini.resources;

import com.stefanini.dto.batalha.BatalhaCriacaoDTO;
import com.stefanini.dto.logRodada.LogRodadaCreationDTO;
import com.stefanini.service.BatalhaService;
import com.stefanini.service.LogRodadaService;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/batalha")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class BatalhaResouce {

    @Inject
    BatalhaService batalhaService;

    @Inject
    LogRodadaService logRodadaService;

    @GET
    @Path("/{id}")
    public Response buscarTodasBatalhasPorJogador(@PathParam("id") Long id){
        return Response.ok().entity(batalhaService.buscarBatalhasPorJogador(id)).build();
    }

    @POST
    public Response salvarBatalha(@Valid BatalhaCriacaoDTO batalha){
        batalhaService.salvar(batalha);
        return Response.status(Response.Status.CREATED).build();
    }

    @POST
    @Path("/{id}/logs")
    public Response criarLogsBatalha(
            @PathParam("id") Long id,
            @Valid @NotEmpty(message="Log da batalha não pode ser vazio.") List<LogRodadaCreationDTO> logsBatalha
    ){
        batalhaService.criarLogsBatalha(logsBatalha, id);
        return Response.status(Response.Status.CREATED).build();
    }

    @GET
    @Path("/{id}/logs")
    public Response obterLogsBatalha(
            @PathParam("id") Long id
    ){
        return Response.ok().entity(logRodadaService.buscarLogsPorBatalha(id)).build();
    }

}
