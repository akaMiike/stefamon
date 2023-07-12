package com.stefanini.resources;

import com.stefanini.dto.batalha.BatalhaCriacaoDTO;
import com.stefanini.service.BatalhaService;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/batalha")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class BatalhaResouce {

    @Inject
    BatalhaService batalhaService;

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

}
