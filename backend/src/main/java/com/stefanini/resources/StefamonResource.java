package com.stefanini.resources;

import com.stefanini.service.StefamonService;

import javax.inject.Inject;
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
            @DefaultValue("1") @QueryParam("pagina") Integer pagina,
            @DefaultValue("10") @QueryParam("tamanhoPagina") Integer tamanhoPagina
    ) {
        return Response.status(Response.Status.OK)
                .entity(service.listarTodosPaginado(pagina,tamanhoPagina))
                .build();
    }

    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        return Response.status(Response.Status.OK).entity(service.buscarPorId(id)).build();
    }
}
