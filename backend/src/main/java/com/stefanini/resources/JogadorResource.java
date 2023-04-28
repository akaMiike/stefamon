package com.stefanini.resources;

import com.stefanini.dto.jogador.JogadorCriacaoDTO;
import com.stefanini.dto.jogador.JogadorLoginDTO;
import com.stefanini.entity.Jogador;
import com.stefanini.service.AuthService;
import com.stefanini.service.JogadorService;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/jogador")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class JogadorResource {

    @Inject
    JogadorService jogadorService;

    @Inject
    AuthService authService;

    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id){
        return Response.status(Response.Status.OK).entity(jogadorService.buscarPorId(id)).build();
    }

    @GET
    @Path("/todos")
    public Response listarTodos(){
        return Response.status(Response.Status.OK).entity(jogadorService.listarTodos()).build();
    }

    @POST
    public Response salvar(@Valid JogadorCriacaoDTO jogador) {
        jogadorService.salvar(jogador);
        return Response.status(Response.Status.CREATED).build();
    }

    @POST
    public Response atualizar(@Valid JogadorCriacaoDTO jogador) {
        jogadorService.atualizar(jogador);
        return Response.status(Response.Status.OK).build();
    }

    @POST
    @Path("/{id}")
    public Response deletar(@PathParam("id") Long id) {
        jogadorService.deletar(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @POST
    @Path("/login")
    public Response login(@Valid JogadorLoginDTO jogadorLoginDTO){
        authService.autenticar(jogadorLoginDTO.getNickname(), jogadorLoginDTO.getPassword());
        return Response.status(Response.Status.NO_CONTENT).build();
    }

}
