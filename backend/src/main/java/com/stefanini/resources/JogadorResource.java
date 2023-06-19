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

@Path("/jogador")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class JogadorResource {

    @Inject
    JogadorService jogadorService;

    @Inject
    AuthService authService;

    @GET
    public Response buscarTodosPaginado(
            @DefaultValue("0") @QueryParam("pagina") Integer pagina,
            @DefaultValue("5") @QueryParam("tamanhoPagina") Integer tamanhoPagina
    ){
        return Response.status(Response.Status.OK)
                .entity(jogadorService.listarTodos(pagina, tamanhoPagina)).build();
    }

    @GET
    @Path("/{id:\\d+}")
    public Response buscarPorId(@PathParam("id") Long id){
        return Response.status(Response.Status.OK).entity(jogadorService.buscarPorId(id)).build();
    }

    @GET
    @Path("/{nome: [a-zA-Z][a-zA-Z0-9]*}")
    public Response buscarPorNome(@PathParam("nome") String nome){
            return Response.status(Response.Status.OK)
                    .entity(jogadorService.buscarPorNickname(nome))
                    .build();
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

    @DELETE
    @Path("/{id}/vender-stefamon/{idStefamon}")
    public Response venderStefamon(@PathParam("id") Long id, @PathParam("idStefamon") Long idStefamon){
        JogadorRetornoDTO jogadorAtualizado = jogadorService.venderStefamon(idStefamon, id);
        return Response.status(Response.Status.OK).entity(jogadorAtualizado).build();
    }

}
