package com.stefanini.resources;

import com.stefanini.dto.jogador.JogadorCriacaoDTO;
import com.stefanini.dto.jogador.JogadorLoginDTO;
import com.stefanini.dto.jogador.JogadorRetornoDTO;
import com.stefanini.dto.stefamon.StefamonDTO;
import com.stefanini.entity.Jogador;
import com.stefanini.service.AuthService;
import com.stefanini.service.JogadorService;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Objects;

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
    public Response buscarPorNome(@NotNull(message="Nome do usuário é obrigatório") @QueryParam("nome") String nome){
            return Response.status(Response.Status.OK).entity(jogadorService.buscarPorNickname(nome)).build();
    }

    @POST
    @Path("/registrar")
    public Response salvar(@Valid JogadorCriacaoDTO jogador) {
        jogadorService.salvar(jogador);
        return Response.status(Response.Status.CREATED).build();
    }

    @PUT
    @Path("/{id}")
    public Response atualizar(@PathParam("id") Long id, @Valid JogadorCriacaoDTO jogador) {
        jogadorService.atualizar(jogador, id);
        return Response.status(Response.Status.OK).build();
    }

    @DELETE
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

    @PUT
    @Path("/{id}/comprar-stefamon/{idStefamon}")
    public Response comprarStefamon(@PathParam("id") Long id, @PathParam("idStefamon") Long idStefamon){
        JogadorRetornoDTO jogadorAtualizado = jogadorService.comprarStefamon(idStefamon, id);
        return Response.status(Response.Status.OK).entity(jogadorAtualizado).build();
    }

}
