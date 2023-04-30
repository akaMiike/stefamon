package com.stefanini.resources;

import com.stefanini.dto.paginacao.PageDTO;
import com.stefanini.dto.stefamon.StefamonDTO;
import com.stefanini.service.StefamonService;

import javax.inject.Inject;
import javax.validation.constraints.Pattern;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/stefamon")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class StefamonResource {

    @Inject
    StefamonService service;

    @GET
    @Path("/todos")
    public Response listarTodos(
            @DefaultValue("0") @QueryParam("pagina") Integer pagina,
            @DefaultValue("10") @QueryParam("tamanhoPagina") Integer tamanhoPagina,
            @DefaultValue("DESC") @Pattern(regexp = "^(ASC|DESC)$", message= "Valor de ordenação deve ser 'ASC' ou 'DESC'")
            @QueryParam("ordem") String ordem,
            @DefaultValue("vida") @Pattern(regexp = "^(vida|ataque|defesa|inteligencia|poder|velocidade)$", message = "Coluna de ordenação deve corresponder a algum atributo do stefamon.")
            @QueryParam("coluna") String coluna
    ) {
        return Response.status(Response.Status.OK)
                .entity(service.listarTodosPaginado(pagina,tamanhoPagina,ordem,coluna))
                .build();
    }

    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        return Response.status(Response.Status.OK).entity(service.buscarPorId(id)).build();
    }
}
