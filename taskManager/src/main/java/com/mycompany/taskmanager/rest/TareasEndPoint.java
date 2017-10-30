package com.mycompany.taskmanager.rest;


import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.OptimisticLockException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import com.mycompany.taskmanager.model.Tarea;
import com.mycompany.taskmanager.dao.TareasDao;
import javax.inject.Inject;

/**
 *
 */
@Stateless
@Path("/tareas")
@Produces("application/json")
@Consumes("application/json")
public class TareasEndPoint {

    @Inject
    TareasDao tareasService;

    @POST
    public Response create(Tarea entity) {
        tareasService.create(entity);

        return Response.created(UriBuilder.fromResource(TareasEndPoint.class)
                        .path(String.valueOf(entity.getId())).build()).build();
    }

    @DELETE
    @Path("/{id:[0-9][0-9]*}")
    public Response deleteById(@PathParam("id") Long id) {
        Tarea entity = tareasService.findById(id);
        if (entity == null) {
            return Response.status(Status.NOT_FOUND).build();
        }
        tareasService.deleteById(id);
        return Response.noContent().build();
    }

    @GET
    @Path("/{id:[0-9][0-9]*}")
    public Response findById(@PathParam("id") Long id) {

        Tarea entity = tareasService.findById(id);
        if (entity == null) {
            return Response.status(Status.NOT_FOUND).build();
        }
        return Response.ok(entity).build();
    }

    @GET
    public List<Tarea> listAll(@QueryParam("start") Integer startPosition,
            @QueryParam("max") Integer maxResult) {
        
        final List<Tarea> results = tareasService.listAll(startPosition, maxResult);
        return results;
    }

    @PUT
    @Path("/{id:[0-9][0-9]*}")
    public Response update(@PathParam("id") Long id, Tarea entity) {
        if (entity == null) {
            return Response.status(Status.BAD_REQUEST).build();
        }
        if (id == null) {
            return Response.status(Status.BAD_REQUEST).build();
        }
        if (!id.equals(entity.getId())) {
            return Response.status(Status.CONFLICT).entity(entity).build();
        }
        if (tareasService.findById(id) == null) {
            return Response.status(Status.NOT_FOUND).build();
        }
        try {
            entity = tareasService.update(entity);
        } catch (OptimisticLockException e) {
            return Response.status(Response.Status.CONFLICT)
                    .entity(e.getEntity()).build();
        }

        return Response.ok(entity).build();
    }
}
