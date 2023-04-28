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
    public Response listarTodos() {
        return Response.status(Response.Status.OK).entity(service.listarTodos()).build();
    }

    @GET
    @Path("/{id}")
    public Response pegarPorId(@PathParam("id") Long id) {
        return Response.status(Response.Status.OK).entity(service.buscarPorId(id)).build();
    }

}
