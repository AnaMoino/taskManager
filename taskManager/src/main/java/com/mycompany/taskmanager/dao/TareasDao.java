package com.mycompany.taskmanager.dao;

import com.mycompany.taskmanager.model.Tarea;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

/**
 * DAO for Post
 */
@Stateless
public class TareasDao {

    @PersistenceContext(unitName = "demo-persistence-unit")
    private EntityManager em;

    public void create(Tarea entity) {
        em.persist(entity);
    }

    public void deleteById(Long id) {
        Tarea entity = em.find(Tarea.class, id);
        if (entity != null) {
            em.remove(entity);
        }
    }

    public Tarea findById(Long id) {
        return em.find(Tarea.class, id);
    }

    public Tarea update(Tarea entity) {
        return em.merge(entity);
    }

    public List<Tarea> listAll(Integer startPosition, Integer maxResult, String text) {
        TypedQuery<Tarea> findQuery;
        if (text != null) {
            findQuery = em.createQuery("SELECT DISTINCT p FROM Tarea p WHERE (p.nombre LIKE :text OR p.descripcion LIKE :text) ORDER BY p.id", Tarea.class).
                    setParameter("text", "%" + text + "%");
        } else {
            findQuery = em.createQuery("SELECT DISTINCT p FROM Tarea p ORDER BY p.id", Tarea.class);
        }

        if (startPosition != null) {
            findQuery.setFirstResult(startPosition);
        }
        if (maxResult != null) {
            findQuery.setMaxResults(maxResult);
        }
        return findQuery.getResultList();
    }

    public List<Tarea> getTareasByText(String text, Integer startPosition, Integer maxResult) {
        TypedQuery<Tarea> findQuery = em.createQuery(
                "SELECT DISTINCT p FROM Tarea p where p.nombre LIKE :text or p.descripcion LIKE :text ORDER BY p.id", Tarea.class)
                .setParameter("text", "%" + text + "%");
        System.out.println("Encontrado: " + findQuery + " - " + findQuery.getParameterValue("text"));

        if (startPosition != null) {
            findQuery.setFirstResult(startPosition);
        }
        if (maxResult != null) {
            findQuery.setMaxResults(maxResult);
        }
        return findQuery.getResultList();
    }
}
